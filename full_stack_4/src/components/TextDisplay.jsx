//Component for displaying notes

import React from 'react';

import NoteHandle from './NoteHandle';


function TextDisplay({ notes, selectedNoteId, onSelectNote,onDeleteNote,onSaveNotes,onUndo,showMessage,onSearchReplace }) {
  return (
    <div className="text-display">
      <div className="grid-container">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`note ${note.id === selectedNoteId ? "selected" : ""}`}
            onClick={() => {
              onSelectNote(note.id);
              }
            }
            style={note.style} // Apply style only to the selected note
          >
            <NoteHandle onDeleteNote={onDeleteNote} onSaveNotes={onSaveNotes} note={note} onUndo={onUndo} onSearchReplace={onSearchReplace} />
            {note.id === selectedNoteId && note.text === ""
              ? "" : note.text || "Click to edit..."}          
              </div>
        ))}
      </div>
      
    </div>
  );
}



export default TextDisplay;

