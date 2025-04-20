
import React from 'react';


function TextDisplay({ notes, selectedNoteId, onSelectNote, onDeleteNote }) {
  return (
    <div className="text-display">
      <div className="grid-container">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`note ${note.id === selectedNoteId ? "selected" : ""}`}
            onClick={() => onSelectNote(note.id)} 
            style={note.style} // Apply style only to the selected note
          >
            <button
              className="delete-note-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the click event from bubbling up to the note div
                onDeleteNote(note.id);
              }}
            >
              X
            </button>
            {note.text || "Click to edit..."}
          </div>
        ))}
      </div>
      
    </div>
  );
}


export default TextDisplay;