//Component for the main page - notes and keyboard

import { useState, useEffect } from "react";
import TextDisplay from "./TextDisplay";
import EditorArea from "./EditorArea";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function NotesPage({currentUser, setCurrentUser,showMessage}) {
  const [text, setText] = useState("");
  const [editMode, setEditMode] = useState("all"); // "all" or "forward"
  //const [cursorPosition, setCursorPosition] = useState(0);
  const [defaultStyle, setDefaultStyle] = useState({ 
    fontFamily: "Arial",
    fontSize: "20px",
    color: "black",
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none",
  });

  const [notes, setNotes] = useState(
    [{
        id: 1,
        text: "",
        history: [], // Initialize history for the new note
        style: {
          fontFamily: "Arial",
          fontSize: "20px",
          color: "black",
          fontWeight: "normal",
          fontStyle: "normal",
          textDecoration: "none",
        },
      },
    ]
  );
  
  
  const [selectedNoteId, setSelectedNoteId] = useState(
    notes.length > 0 ? notes[0].id : null
  );
  
  
  const saveNoteInFile = (noteID) => {
    const note = notes.find((note) => note.id === noteID);
    if (!note) {
      showMessage("alert", "Note not found.", () => {});
      return;
    }
  
    // Check if the note already exists in local storage
    const existingFileName = currentUser.files?.find((fileName) => {
      const storedFile = localStorage.getItem(`note_${currentUser.username}_${fileName}`);
      if (!storedFile) return false;
      try {
        const parsedFile = JSON.parse(storedFile);
        return parsedFile.id === noteID;
      } catch {
        return false;
      }
    });
  
    if (existingFileName) {
      // If the note already exists, update it
      const noteKey = `note_${currentUser.username}_${existingFileName}`;
      localStorage.setItem(noteKey, JSON.stringify(note));
      showMessage("alert", `Note updated in file "${existingFileName}"`, () => {});
      return;
    }
  
    // Else, get a new file name from the user
    showMessage("prompt", "Please enter a name for this file:", (fileName) => {
      if (!fileName) {
        showMessage("alert", "File name cannot be empty.", () => {});
        return;
      }
  
      const trimmedFileName = fileName.trim(); // Remove leading and trailing spaces
      const noteKey = `note_${currentUser.username}_${trimmedFileName}`;
  
      // Check if the file name already exists in local storage
      if (localStorage.getItem(noteKey)) {
        showMessage("alert", "A file with this name already exists.", () => {});
        return;
      }
  
      // Save the note as a file in the local storage
      localStorage.setItem(noteKey, JSON.stringify(note));
  
      const updatedUser = {
        ...currentUser,
        files: [...(currentUser.files || []), trimmedFileName],
      };
  
      localStorage.setItem(`user_${currentUser.username}`, JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      showMessage("alert", `Note saved as "${trimmedFileName}"`, () => {});
    });
  };





  const handleKeyPress = (char) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNoteId
          ? { ...note, text: note.text + char,
                history: [...note.history.slice(-3), { ...note }], // Keep the last 3 states in history
          }
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
        note.id === selectedNoteId ? { ...note, text: "", history: [...note.history.slice(-3), { ...note }], // Keep the last 3 states in history
  } : note
      )
    );
  };
   
  


  const HandleDeleteChar = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNoteId
          ? { ...note, text: note.text.slice(0, -1),
            history: [...note.history.slice(-3), { ...note }], // Keep the last 3 states in history

           }
          : note
      )
    );
  };
  

  const handleDeleteWord = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === selectedNoteId) {
          const trimmedText = note.text.trimEnd(); // prevents trimming the last space
          const lastSpaceIndex = trimmedText.lastIndexOf(" ");
  
          return {
            ...note,
            history: [...note.history.slice(-3), { ...note }], // Keep the last 3 states in history
            text:
              lastSpaceIndex === -1
                ? "" //if there is no space, delete the whole text
                : trimmedText.slice(0, lastSpaceIndex + 1), // keep the space after the word
          };
        }
        return note;
      })
    );
  };


  const handleAddNote = () => {
    if (notes.length < 6) {
      const newNote = {
        id: Date.now(),
        text: "",
        style: {
          fontFamily: "Arial",
          fontSize: "20px",
          color: "black",
          fontWeight: "normal",
          fontStyle: "normal",
          textDecoration: "none",
        },
        history: [], // Initialize history for the new note
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      setSelectedNoteId(newNote.id);
    }
  };

  const handleDeleteNote = (id) => {
    const noteToDelete = notes.find((note) => note.id === id);
    if (!noteToDelete) return;
  
    // try to find the saved text in local storage
    let savedText = null;
    if (currentUser?.files) {
      for (const fileName of currentUser.files) {
        const data = localStorage.getItem(`note_${currentUser.username}_${fileName}`);
        if (!data) continue;
          const parsed = JSON.parse(data);
          if (parsed.id === id) {
            savedText = parsed.text; //take the text from the file
            break;
          }
      }
    }
  
    const isChanged = savedText === null || savedText !== noteToDelete.text;
  
    if (isChanged) {
      showMessage(
        "prompt", //type of message
        "Do you want to save this note before deleting it? (yes/no)", //message
        (userResponse) => {
          if (userResponse === "yes") {
            saveNoteInFile(id); 
          }
          const updatedNotes = notes.filter((note) => note.id !== id);
          setNotes(updatedNotes);
          if (selectedNoteId === id) {
            setSelectedNoteId(null);
          }
        }
      );
    }
  }
  

  const handleStyleChange = (property, value) => {
    if (editMode === "all") {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === selectedNoteId
            ? {
                ...note,
                history: [...note.history.slice(-3), { ...note }], // Keep the last 3 states in history
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
    } else if (editMode === "forward") {
      setDefaultStyle((prevStyle) => {
        const newStyle = { ...prevStyle };
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
      });
    }
  };
  
  

  /*
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
  };*/
  

  function handleSearchReplace(searchText, replaceText) {
    let found = false; // משתנה שיבדוק אם מצאנו משהו
  
    setNotes(prevNotes => 
      prevNotes.map(note => {
        if (note.text.includes(searchText)) {
          found = true; // מצאנו, נסמן
          return {
            ...note,
            text: note.text.replaceAll(searchText, replaceText),
            history: [...note.history, note.text], // שמירת הגרסה הקודמת בהיסטוריה
          };
        }
        return note;
      })
    );
  
    if (!found) {
      alert("המילה לא נמצאה");
    }
  }
  
  

  const handleUndo = (selectedNote) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) => {
          if (note.id === selectedNote.id) {
            if (note.history.length === 0) {
              return note;
            }
    
            
            const lastState = note.history[note.history.length - 1];
            return {
              ...lastState,
              history: note.history.slice(0, -1),             // Remove the last state from history
            };
          }
          return note;
        })
      );
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
          onSaveNotes={saveNoteInFile}
          onUndo={handleUndo}
          showMessage={showMessage}
          onSearchReplace={handleSearchReplace}
        />
        <EditorArea
          text={text}
          notes={notes}
          setNotes={setNotes}
          currentUser={currentUser}
          onKeyPress={handleKeyPress}
          onDeleteAll={HandleDeleteAll}
          onDeleteChar={HandleDeleteChar}
          onDeleteWord={handleDeleteWord}
          onSpacePress={handleSpacePress}
          onStyleChange={handleStyleChange}
          //onSearchReplace={handleSearchReplace}
          onUndo={handleUndo}
          onAddNote={handleAddNote}
          editMode={editMode}
          setEditMode={setEditMode}
          showMessage={showMessage}

        />
      </div>
    </div>
  );
}

export default NotesPage;