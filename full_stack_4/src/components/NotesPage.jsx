//Component for the main page - notes and keyboard

import TextDisplay from "./TextDisplay";
import EditorArea from "./EditorArea";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import LZString from 'lz-string';

function NotesPage({currentUser, setCurrentUser,showMessage}) {
  const [text, setText] = useState("");
  const [editMode, setEditMode] = useState("all"); // "all" or "forward"
  const [defaultStyle, setDefaultStyle] = useState({ 
    fontFamily: "Arial",
    fontSize: "20px",
    color: "black",
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none",
  });


  /*
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
  */
  const [notes, setNotes] = useState([]);
  
  
  const [selectedNoteId, setSelectedNoteId] = useState(
    notes.length > 0 ? notes[0].id : null
  );
  
  /*
  const saveNoteInFile = (noteID) => {
    console.log("Saving note with ID:", noteID);
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
    console.log("1");
    showMessage("prompt", "Please enter a name for this file:", (fileName) => {
      console.log("2");
      if (!fileName) {
        console.log("3");
        showMessage("alert", "File name cannot be empty.", () => {});
        return;
      }
      console.log("4");
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
    console.log("5");
  };
  */


  
  const saveNoteInFile = (noteID) => {
    console.log("Saving note with ID:", noteID);
    const note = notes.find((note) => note.id === noteID);
    if (!note) {
      showMessage("alert", "Note not found.", () => {});
      return;
    }
  
    // דחיסת הנתונים - פונקציה חדשה שמחזירה גרסה דחוסה של הפתק
    const compressNote = (originalNote) => {
      // מיפוי סגנונות ייחודיים
      const uniqueStyles = [];
      const styleMap = new Map();
      
      // נבנה מבנה דחוס יותר של הטקסט
      const compressedText = originalNote.text.map(charObj => {
        // נמיר את הסגנון למחרוזת להשוואה מהירה
        const styleStr = JSON.stringify(charObj.style);
        
        // נוסיף סגנון חדש למאגר אם לא קיים
        if (!styleMap.has(styleStr)) {
          styleMap.set(styleStr, uniqueStyles.length);
          uniqueStyles.push(charObj.style);
        }
        
        // נחזיר אובייקט מצומצם עם התו ואינדקס הסגנון
        return {
          c: charObj.char,
          s: styleMap.get(styleStr)
        };
      });
      
      // נחזיר אובייקט דחוס
      return {
        id: originalNote.id,
        t: compressedText,
        s: uniqueStyles,
        // לא שומרים את ההיסטוריה בלוקל סטורג' כדי לחסוך מקום
      };
    };
    
    // נדחוס את הפתק
    const compressedNote = compressNote(note);
    
    // נמיר לJSON ונדחוס שוב באמצעות LZString
    const jsonData = JSON.stringify(compressedNote);
    const compressedData = LZString.compress(jsonData);
  
    // בדיקה אם הפתק כבר קיים בלוקל סטורג'
    const existingFileName = currentUser.files?.find((fileName) => {
      const storedData = localStorage.getItem(`note_${currentUser.username}_${fileName}`);
      if (!storedData) return false;
      try {
        const decompressedData = LZString.decompress(storedData);
        const parsedFile = JSON.parse(decompressedData);
        return parsedFile.id === noteID;
      } catch {
        return false;
      }
    });
  
    if (existingFileName) {
      // עדכון פתק קיים
      const noteKey = `note_${currentUser.username}_${existingFileName}`;
      localStorage.setItem(noteKey, compressedData);
      showMessage("alert", `Note updated in file "${existingFileName}"`, () => {});
      return;
    }
    
    // יצירת פתק חדש
    showMessage("prompt", "Please enter a name for this file:", (fileName) => {
      if (!fileName) {
        showMessage("alert", "File name cannot be empty.", () => {});
        return;
      }
      
      const trimmedFileName = fileName.trim();
      const noteKey = `note_${currentUser.username}_${trimmedFileName}`;
  
      // בדיקה אם קיים פתק בשם זה
      if (localStorage.getItem(noteKey)) {
        showMessage("alert", "A file with this name already exists.", () => {});
        return;
      }
  
      // שמירה בלוקל סטורג'
      localStorage.setItem(noteKey, compressedData);
  
      const updatedUser = {
        ...currentUser,
        files: [...(currentUser.files || []), trimmedFileName],
      };
  
      localStorage.setItem(`user_${currentUser.username}`, JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      showMessage("alert", `Note saved as "${trimmedFileName}"`, () => {});
    });
  };
  





  
  /*
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
  */

  
  const handleKeyPress = (char) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === selectedNoteId) {
          // Create a copy of the note for history
          const noteCopy = { ...note };
          
          // Add new character with the appropriate style
          const newCharObj = {
            char: char,
            style: editMode === "forward" ? { ...defaultStyle } : { ...note.style }
          };
          
          return {
            ...note,
            text: [...note.text, newCharObj],
            history: [...note.history.slice(-3), noteCopy]
          };
        }
        return note;
      })
    );
  };



  const handleSpacePress = () => {
    handleKeyPress(" ");
  };


/*
  const HandleDeleteAll = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNoteId ? { ...note, text: "", history: [...note.history.slice(-3), { ...note }], // Keep the last 3 states in history
  } : note
      )
    );
  };
  */
  const HandleDeleteAll = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === selectedNoteId) {
          const noteCopy = { ...note };
          return {
            ...note,
            text: [],
            history: [...note.history.slice(-3), noteCopy]
          };
        }
        return note;
      })
    );
  };
   
  


  /*
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
  */

  const HandleDeleteChar = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === selectedNoteId) {
          const noteCopy = { ...note };
          return {
            ...note,
            text: note.text.slice(0, -1),
            history: [...note.history.slice(-3), noteCopy]
          };
        }
        return note;
      })
    );
  };
  

  /*
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
  */
  const handleDeleteWord = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === selectedNoteId) {
          const noteCopy = { ...note };
          // Reconstruct full text to find the last word
          const fullText = note.text.map(c => c.char).join('');
          const trimmedText = fullText.trimEnd();
          const lastSpaceIndex = trimmedText.lastIndexOf(" ");
          
          return {
            ...note,
            text: lastSpaceIndex === -1 ? [] : note.text.slice(0, lastSpaceIndex + 1),
            history: [...note.history.slice(-3), noteCopy]
          };
        }
        return note;
      })
    );
  };

  /*
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
  */
  const handleAddNote = () => {
    if (notes.length < 6) {
      const newNote = {
        id: Date.now(),
        text: [],
        style: {
          fontFamily: "Arial",
          fontSize: "20px",
          color: "black",
          fontWeight: "normal",
          fontStyle: "normal",
          textDecoration: "none",
        },
        history: [],
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      setSelectedNoteId(newNote.id);
    }
  };


  /*
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
              saveNoteInFile(id); 
              const updatedNotes = notes.filter((note) => note.id !== id);
              setNotes(updatedNotes);
              if (selectedNoteId === id) {
                setSelectedNoteId(null);
              }
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
  */

  const handleDeleteNote = (id) => {
    const noteToDelete = notes.find((note) => note.id === id);
    if (!noteToDelete) return;
  
    // חיפוש הפתק השמור בלוקל סטורג'
    let savedFileName = null;
    let savedNote = null;
  
    if (currentUser?.files) {
      for (const fileName of currentUser.files) {
        const compressedData = localStorage.getItem(`note_${currentUser.username}_${fileName}`);
        if (!compressedData) continue;
        
        try {
          // נסה לפענח את הנתונים הדחוסים
          let parsedData;
          try {
            const jsonData = LZString.decompress(compressedData);
            parsedData = JSON.parse(jsonData);
          } catch {
            // אם הפענוח נכשל, נסה לפרסר ישירות (אולי זה פתק ישן)
            parsedData = JSON.parse(compressedData);
          }
          
          if (parsedData.id === id) {
            savedFileName = fileName;
            
            // בדוק אם זה במבנה הדחוס החדש
            if (parsedData.t && parsedData.s) {
              // המר את המבנה הדחוס למבנה המקורי לצורך השוואה
              const decompressedText = parsedData.t.map(item => ({
                char: item.c,
                style: {...parsedData.s[item.s]}
              }));
              
              savedNote = {
                text: decompressedText
              };
            } else {
              // זהו פתק בפורמט הישן
              savedNote = parsedData;
            }
            break;
          }
        } catch (error) {
          console.error("Error parsing note data:", error);
          continue;
        }
      }
    }
  
    // השוואת התוכן
    const isChanged = !savedNote || !areNotesEqual(noteToDelete, savedNote);
  
    if (isChanged) {
      showMessage(
        "alert",
        "Do you want to save this note before deleting it?",
        () => {
          setTimeout(() => {
            saveNoteInFile(id);
            const updatedNotes = notes.filter((note) => note.id !== id);
            setNotes(updatedNotes);
            if (selectedNoteId === id) {
              setSelectedNoteId(null);
            }
          }, 0);
        },
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
    } else {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      if (selectedNoteId === id) {
        setSelectedNoteId(null);
      }
    }
  };
  
  // פונקציית עזר להשוואת פתקים
  const areNotesEqual = (note1, note2) => {
    // אם מספר התווים שונה, הפתקים שונים
    if (note1.text.length !== note2.text.length) return false;
    
    // השוואת כל תו ותו
    for (let i = 0; i < note1.text.length; i++) {
      const char1 = note1.text[i];
      const char2 = note2.text[i];
      
      if (char1.char !== char2.char) return false;
      
      // השוואת סגנון בסיסי (אפשר להרחיב את ההשוואה לפי הצורך)
      if (char1.style.fontFamily !== char2.style.fontFamily ||
          char1.style.fontSize !== char2.style.fontSize ||
          char1.style.color !== char2.style.color ||
          char1.style.fontWeight !== char2.style.fontWeight ||
          char1.style.fontStyle !== char2.style.fontStyle ||
          char1.style.textDecoration !== char2.style.textDecoration) {
        return false;
      }
    }
    
    return true;
  };




  const handleStyleChange = (property, value) => {
    if (editMode === "all") {
      // When editing all, update each character's style
      setNotes((prevNotes) =>
        prevNotes.map((note) => {
          if (note.id === selectedNoteId) {
            const noteCopy = { ...note };
            return {
              ...note,
              text: note.text.map(charObj => {
                const newStyle = { ...charObj.style };
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
                return { ...charObj, style: newStyle };
              }),
              history: [...note.history.slice(-3), noteCopy]
            };
          }
          return note;
        })
      );
    } else if (editMode === "forward") {
      // When editing from now on, update the default style for new characters
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
  */
  
  

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
    if (searchText===null || replaceText=== null) {
      showMessage("alert", "Please enter both search and replace text.");
      return; 
    }
    let found = false;
    
    setNotes(prevNotes => 
      prevNotes.map(note => {
        // Reconstruct full text to search
        const fullText = note.text.map(c => c.char).join('');
        
        if (fullText.includes(searchText)) {
          found = true;
          
          // Create new text array with replacements
          let newText = [];
          let i = 0;
          
          while (i < fullText.length) {
            if (fullText.substring(i, i + searchText.length) === searchText) {
              // Found a match, add replacement characters with current style
              const currentStyle = i < note.text.length ? { ...note.text[i].style } : { ...note.style };
              
              for (let j = 0; j < replaceText.length; j++) {
                newText.push({
                  char: replaceText[j],
                  style: currentStyle
                });
              }
              i += searchText.length;
            } else {
              // No match, keep the original character
              newText.push(note.text[i]);
              i++;
            }
          }
          
          return {
            ...note,
            text: newText,
            history: [...note.history, note]
          };
        }
        return note;
      })
    );
    
    if (!found) {
      showMessage("alert", "No matches found for the search text.");
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