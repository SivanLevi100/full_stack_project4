import React, { useState } from "react";

const OpenFiles = ({ currentUser, setNotes, notes }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const handleOpenFile = (fileName) => {
    const noteKey = `note_${currentUser.username}_${fileName.trim()}`;
    const noteJSON = localStorage.getItem(noteKey);
    if (!noteJSON) {
      alert("Note content not found.");
      return;
    }

    try {
    console.log("noteJSON", noteJSON);
      const note = JSON.parse(noteJSON);
      const alreadyExists = notes.some((n) => n.id === note.id);
      if (alreadyExists) {
        alert("Note is already open.");
        return;
      }
      console.log("note", note);
      console.log("notes", notes);
      setNotes([...notes, note]);
      console.log("notes after", notes);
      setSelectedFile("");
      setShowDropdown(false);
    } catch {
      alert("Failed to parse note data.");
    }
  };

  return (
    <div className="open-files">
      { (
        <>
          {currentUser.files && currentUser.files.length > 0 ? (
            <select
              value={selectedFile}
              onChange={(e) => {
                const file = e.target.value;
                setSelectedFile(file);
                handleOpenFile(file);
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
