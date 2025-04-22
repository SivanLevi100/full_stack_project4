//Component for the main page - notes and keyboard

import { useState, useEffect } from "react";
import TextDisplay from "./TextDisplay";
import EditorArea from "./EditorArea";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function NotesPage({currentUser, setCurrentUser}) {
  const [text, setText] = useState("");
  const [textHistory, setTextHistory] = useState([]);
  const [notes, setNotes] = useState(() => {
    const savedNotes = currentUser.notes;
    return savedNotes
      ? savedNotes
      : [
          {
            id: 1,
            text: "",
            name:"Untitled",
            style: {
              fontFamily: "Arial",
              fontSize: "20px",
              color: "black",
              fontWeight: "normal",
              fontStyle: "normal",
              textDecoration: "none",
            },
          },
        ];
  });
  const [selectedNoteId, setSelectedNoteId] = useState(
    notes.length > 0 ? notes[0].id : null
  );
  // כאשר יש שינוי בטקסט, נשמור את המצב הקודם להיסטוריה
  useEffect(() => {
    if (
      text &&
      (textHistory.length === 0 || textHistory[textHistory.length - 1] !== text)
    ) {
      setTextHistory((prev) => [...prev, text]);
    }
  }, [text]);

  
  
  const saveNoteToLocalStorage = (noteID) => {
    const note = notes.find((note) => note.id === noteID);
    if (!note) {
      alert("Note not found.");
      return;
    }
  
    // check if the note already exists in local storage
    const existingFileName = currentUser.files?.find((fileName) => {
      const storedNote = localStorage.getItem(`note_${currentUser.username}_${fileName}`);
      if (!storedNote) return false;
      try {
        const parsedNote = JSON.parse(storedNote);
        return parsedNote.id === noteID;
      } catch {
        return false;
      }
    });
  
    if (existingFileName) {
      //if the note already exists, update it
      const noteKey = `note_${currentUser.username}_${existingFileName}`;
      localStorage.setItem(noteKey, JSON.stringify(note));
      alert(`Note updated in file "${existingFileName}"`);
      return;
    }
  
    // else, get a new file name from the user
    const FileName = prompt("Please enter a name for this file:");
    if (!FileName) {
      alert("File name cannot be empty.");
      return;
    }
  
    const noteKey = `note_${currentUser.username}_${FileName}`;
  
    // check if the file name already exists in local storage
    if (localStorage.getItem(noteKey)) {
      alert("A file with this name already exists.");
      return;
    }
  
    // save the note as a file in the local storage
    localStorage.setItem(noteKey, JSON.stringify(note));
  
    const updatedUser = {
      ...currentUser,
      files: [...(currentUser.files || []), FileName],
    };
  
    localStorage.setItem(`user_${currentUser.username}`, JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
  
    alert(`Note saved as "${FileName}"`);
  };
  
  

  const handleKeyPress = (char) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNoteId
          ? { ...note, text: note.text + char }
          : note
      )
    );
  };

  const handleSpacePress = () => {
    handleKeyPress(" ");
  };

  const HandleDeleteAll = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNoteId ? { ...note, text: "" } : note
      )
    );
  };

  const HandleDeleteChar = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNoteId
          ? { ...note, text: note.text.slice(0, -1) }
          : note
      )
    );
  };

  const handleAddNote = () => {
    if (notes.length < 6) {
      const newNote = {
        id: Date.now(),
        text: "",
        name: "Untitled",
        style: {
          fontFamily: "Arial",
          fontSize: "20px",
          color: "black",
          fontWeight: "normal",
          fontStyle: "normal",
          textDecoration: "none",
        },
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      setSelectedNoteId(newNote.id);
    }
  };

  const handleDeleteNote = (id) => {
    prompt("Do you want to save this note before deleting it? (yes/no)", "yes") === "yes" &&
      saveNoteToLocalStorage(id);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    if (selectedNoteId === id) {
      setSelectedNoteId(null); // Deselect the note if it's deleted
    }
  };
  

  
  const handleStyleChange = (property, value) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNoteId
          ? {
              ...note,
              style: (() => {
                const newStyle = { ...note.style };
                switch (property) {
                  case "bold":
                    newStyle.fontWeight = newStyle.fontWeight === "bold" ? "normal" : "bold";
                    break;
                  case "italic":
                    newStyle.fontStyle = newStyle.fontStyle === "italic" ? "normal" : "italic";
                    break;
                  case "underline":
                    newStyle.textDecoration = newStyle.textDecoration === "underline" ? "none" : "underline";
                    break;
                  default:
                    newStyle[property] = value;
                }
                return newStyle;
              })(),
            }
          : note
      )
    );
  };
  

  const handleSearchReplace = (searchText, replaceText) => {
    setText((prev) => prev.replace(new RegExp(searchText, "g"), replaceText));
  };

  const handleUndo = () => {
    if (textHistory.length > 0) {
      const newHistory = [...textHistory];
      const lastText = newHistory.pop();

      if (newHistory.length > 0) {
        setText(newHistory[newHistory.length - 1]);
      } else {
        setText("");
      }

      setTextHistory(newHistory);
    }
  };

  return (
    <div className="notes-page">
      <button className="logout-btn" onClick={() => setCurrentUser(null)}>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
      <div className="app-container">
        <TextDisplay
          notes={notes}
          selectedNoteId={selectedNoteId}
          onSelectNote={setSelectedNoteId}
          onDeleteNote={handleDeleteNote}
          onSaveNotes={saveNoteToLocalStorage}
        />
        <EditorArea
          text={text}
          onKeyPress={handleKeyPress}
          onDeleteAll={HandleDeleteAll}
          onDeleteChar={HandleDeleteChar}
          onSpacePress={handleSpacePress}
          onStyleChange={handleStyleChange}
          onSearchReplace={handleSearchReplace}
          onUndo={handleUndo}
          onAddNote={handleAddNote}
        />
      </div>
    </div>
  );
}
export default NotesPage;