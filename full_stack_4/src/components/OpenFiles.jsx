/*
import React, { useState } from "react";

const OpenFiles = ({ currentUser, setNotes, notes,showMessage }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const handleOpenFile = (fileName) => {
    const noteKey = `note_${currentUser.username}_${fileName.trim()}`;
    const noteJSON = localStorage.getItem(noteKey);
    if (!noteJSON) {
      showMessage("alert","Note content not found.");
      return;
    }

    try {
    console.log("noteJSON", noteJSON);
      const note = JSON.parse(noteJSON);
      const alreadyExists = notes.some((n) => n.id === note.id);
      if (alreadyExists) {
        showMessage("alert","File is already open.");
        return;
      }
      console.log("note", note);
      console.log("notes", notes);
      setNotes([...notes, note]);
      console.log("notes after", notes);
      setSelectedFile("");
      setShowDropdown(false);
    } catch {
      showMessage("alert","Failed to parse note data.");
    }
  };

  return (
    <div className="open-files">
      { (
        <>
          {currentUser.files && currentUser.files.length > 0 ? (
            <select
            value=""
            onChange={(e) => {
              const file = e.target.value;
              if (file) { 
                setSelectedFile(file);
                handleOpenFile(file);
              }
            }}
            className="file-select"
          >
            <option value="">📂 Open File</option>
            {currentUser.files.map((fileName) => (
              <option key={fileName} value={fileName}>
                {fileName}
              </option>
            ))}
          </select>
          
          ) : (
            <p>No saved files.</p>
          )}
        </>
      )}
    </div>
  );
};

export default OpenFiles;
*/

import React, { useState } from "react";
import LZString from 'lz-string';

const OpenFiles = ({ currentUser, setNotes, notes, showMessage }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const handleOpenFile = (fileName) => {
    const noteKey = `note_${currentUser.username}_${fileName.trim()}`;
    const compressedData = localStorage.getItem(noteKey);
    
    if (!compressedData) {
      showMessage("alert", "Note content not found.");
      return;
    }

    try {
      // נסה לפענח את הנתונים הדחוסים
      const jsonData = LZString.decompress(compressedData);
      
      // אם הפענוח לא הצליח, נסה לפרסר ישירות (אולי זה פתק מהגרסה הישנה)
      const parsedData = jsonData ? JSON.parse(jsonData) : JSON.parse(compressedData);
      
      // בדוק אם זה מבנה דחוס (עם המאפיינים t ו-s)
      if (parsedData.t && parsedData.s) {
        // המר את המבנה הדחוס למבנה המקורי
        const decompressedText = parsedData.t.map(item => ({
          char: item.c,
          style: {...parsedData.s[item.s]}
        }));
        
        const note = {
          id: parsedData.id,
          text: decompressedText,
          style: parsedData.s[0] || {}, // סגנון ברירת מחדל
          history: [] // היסטוריה ריקה לפתק שנטען
        };
        
        const alreadyExists = notes.some((n) => n.id === note.id);
        if (alreadyExists) {
          showMessage("alert", "File is already open.");
          return;
        }
        
        console.log("note", note);
        console.log("notes", notes);
        setNotes([...notes, note]);
        console.log("notes after", notes);
        setSelectedFile("");
        setShowDropdown(false);
      } else {
        // זהו כנראה פתק בפורמט הישן
        const alreadyExists = notes.some((n) => n.id === parsedData.id);
        if (alreadyExists) {
          showMessage("alert", "File is already open.");
          return;
        }
        
        console.log("note (old format)", parsedData);
        console.log("notes", notes);
        setNotes([...notes, parsedData]);
        console.log("notes after", notes);
        setSelectedFile("");
        setShowDropdown(false);
      }
    } catch (error) {
      console.error("Error loading note:", error);
      showMessage("alert", "Failed to parse note data.");
    }
  };

  return (
    <div className="open-files">
      {(
        <>
          {currentUser.files && currentUser.files.length > 0 ? (
            <select
              value=""
              onChange={(e) => {
                const file = e.target.value;
                if (file) { 
                  setSelectedFile(file);
                  handleOpenFile(file);
                }
              }}
              className="file-select"
            >
              <option value="">📂 Open File</option>
              {currentUser.files.map((fileName) => (
                <option key={fileName} value={fileName}>
                  {fileName}
                </option>
              ))}
            </select>
          ) : (
            <p>No saved files.</p>
          )}
        </>
      )}
    </div>
  );
};

export default OpenFiles;