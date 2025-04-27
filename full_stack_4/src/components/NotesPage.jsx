//Component for the main page - notes and keyboard

import TextDisplay from "./TextDisplay";
import EditorArea from "./EditorArea";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function NotesPage({currentUser, setCurrentUser,showMessage}) {
  const [editMode, setEditMode] = useState("all"); // "all" or "forward"
  const [defaultStyle, setDefaultStyle] = useState({ 
    fontFamily: "Arial",
    fontSize: "20px",
    color: "black",
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none",
  });


  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(
    notes.length > 0 ? notes[0].id : null
  );
  

  const saveNoteInFile = (noteID) => {
    console.log("Saving note with ID:", noteID);
    const note = notes.find((note) => note.id === noteID);
    console.log("Note found:", note);
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
      prevNotes.map((note) => {
        if (note.id === selectedNoteId) {
          const noteCopy = { ...note };
          const lastIndex = note.text.length - 1;
          const updatedText = [...note.text];
          updatedText[lastIndex] = {
            ...updatedText[lastIndex],
            content: updatedText[lastIndex].content + char,
          };
          return {
            ...note,
            text: updatedText,
            history: [...note.history.slice(-3), noteCopy],
          };
        }
        return note;
      })
    );
  };
  

  const handleSpacePress = () => {
    handleKeyPress(" ");
  };



  
  const HandleDeleteAll = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNoteId
          ? {
              ...note,
              text: [{ content: "", style: { ...note.style } }],
              history: [...note.history.slice(-3), { ...note }],
            }
          : note
      )
    );
  };
  


  
 
  
  const HandleDeleteChar = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === selectedNoteId) {
          const noteCopy = { ...note };
          const updatedText = [...note.text];
          const lastIndex = updatedText.length - 1;
          const lastSegment = updatedText[lastIndex];
  
          if (lastSegment.content.length > 0) {
            updatedText[lastIndex] = {
              ...lastSegment,
              content: lastSegment.content.slice(0, -1),
            };
          }
          return {
            ...note,
            text: updatedText,
            history: [...note.history.slice(-3), noteCopy],
          };
        }
        return note;
      })
    );
  };
  
  
  
  const handleDeleteWord = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === selectedNoteId) {
          const noteCopy = { ...note };
          const updatedText = [...note.text];
          const lastIndex = updatedText.length - 1;
          const lastSegment = updatedText[lastIndex];
  
          const trimmedContent = lastSegment.content.trimEnd();
          const lastSpaceIndex = trimmedContent.lastIndexOf(" ");
  
          updatedText[lastIndex] = {
            ...lastSegment,
            content:
              lastSpaceIndex === -1
                ? "" // if there is no space, delete the whole text
                : trimmedContent.slice(0, lastSpaceIndex + 1), // keep the space after the word
          };
  
          return {
            ...note,
            text: updatedText,
            history: [...note.history.slice(-3), noteCopy],
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
        text: [{
          content: "",
          style: { ...defaultStyle },
        }],
        style: { ...defaultStyle },
        history: [],
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
        "alert", //type of message
        "Do you want to save this note before deleting it?", //message
            () => {
              setTimeout(() => {
                const updatedNotes = notes.filter((note) => note.id !== id);
                setNotes(updatedNotes);
                if (selectedNoteId === id) {
                  setSelectedNoteId(null);
                }
              saveNoteInFile(id); 
             
   
            }, 0);
            }
          ,
          () => {
            const updatedNotes = notes.filter((note) => note.id !== id);
            setNotes(updatedNotes);
            if (selectedNoteId === id) {
              setSelectedNoteId(null);
            }
          },
          "Save",
          "Don't Save"
      );
    }
    else{
      const updatedNotes = notes.filter((note) => note.id !== id);
            setNotes(updatedNotes);
            if (selectedNoteId === id) {
              setSelectedNoteId(null);
      }
  }
  }
  




  const handleStyleChange = (property, value) => {
    if (editMode === "all") {
      setNotes((prevNotes) =>
        prevNotes.map((note) => {
          if (note.id === selectedNoteId) {
            return {
              ...note,
              text: note.text.map((segment) => {
                const updatedStyle = { ...segment.style };
                switch (property) {
                  case "bold":
                    updatedStyle.fontWeight = updatedStyle.fontWeight === "bold" ? "normal" : "bold";
                    break;
                  case "italic":
                    updatedStyle.fontStyle = updatedStyle.fontStyle === "italic" ? "normal" : "italic";
                    break;
                  case "underline":
                    updatedStyle.textDecoration = updatedStyle.textDecoration === "underline" ? "none" : "underline";
                    break;
                  default:
                    updatedStyle[property] = value;
                }
                return { ...segment, style: updatedStyle };
              }),
            };
          }
          return note;
        })
      );
    } 
    else if (editMode === "forward") {
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
  
        // Add a new empty block with the new style
        setNotes((prevNotes) =>
          prevNotes.map((note) => {
            if (note.id === selectedNoteId) {
              return {
                ...note,
                text: [
                  ...note.text,
                  { content: "", style: newStyle }  //new empty block with the new style
                ]
              };
            }
            return note;
          })
        );
  
        return newStyle;
      });
    }
  };
  
  
  function handleSearchReplace(searchText, replaceText) {
    if (!searchText || !replaceText) {
      alert("Please enter both search and replace text.")
      //showMessage("alert", "Please enter both search and replace text.", () => {});
      return;
    }
    
    let found = false;
    
    setNotes(prevNotes => 
      prevNotes.map(note => {
        if (note.id === selectedNoteId) {
          const noteCopy = { ...note };
          // Create a deep copy of the text array
          const updatedText = [...note.text];
          let textChanged = false;
          
          // Go through each text segment
          for (let i = 0; i < updatedText.length; i++) {
            const segment = updatedText[i];
            if (segment.content.includes(searchText)) {
              found = true;
              textChanged = true;
              // Replace all occurrences in this segment, maintaining the same style
              updatedText[i] = {
                ...segment,
                content: segment.content.split(searchText).join(replaceText)
              };
            }
          }
          
          if (textChanged) {
            return {
              ...note,
              text: updatedText,
              history: [...note.history.slice(-3), noteCopy]
            };
          }
        }
        return note;
      })
    );
    
    if (!found) {
      alert("No matches found for the search text.");
      //showMessage("alert", "No matches found for the search text.", () => {});
    } else {
      alert("Text replacement completed.");
      //showMessage("alert", "Text replacement completed.", () => {});
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
              history: note.history.slice(0, -1),  // Remove the last state from history
            };
          }
          return note;
        })
      );
  };


  return (
    <div className="notes-page">
      
      <div className="user-name">
        <FontAwesomeIcon icon={faUser} style={{ marginRight: "8px" }} />
        {currentUser.username}
      </div>

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
          notes={notes}
          setNotes={setNotes}
          currentUser={currentUser}
          onKeyPress={handleKeyPress}
          onDeleteAll={HandleDeleteAll}
          onDeleteChar={HandleDeleteChar}
          onDeleteWord={handleDeleteWord}
          onSpacePress={handleSpacePress}
          onStyleChange={handleStyleChange}
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


