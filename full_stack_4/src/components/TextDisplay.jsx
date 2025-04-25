//Component for displaying notes

import React from 'react';

import NoteHandle from './NoteHandle';



function TextDisplay({ notes, selectedNoteId, onSelectNote,onDeleteNote,onSaveNotes,onUndo,showMessage }) {
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
            <NoteHandle onDeleteNote={onDeleteNote} onSaveNotes={onSaveNotes} note={note} onUndo={onUndo} />
            {note.id === selectedNoteId && note.text === ""
              ? "" : note.text || "Click to edit..."}          
              </div>
        ))}
      </div>
      
    </div>
  );
}


export default TextDisplay;



/*   ערכיה מכאן והלאה עובד. עריכה על הכל לא עובד
import React from 'react';


function TextDisplay({ notes, selectedNoteId, onSelectNote, onDeleteNote,onSaveNotes }) {
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
            <button
              className="delete-note-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the click event from bubbling up to the note div
                onDeleteNote(note.id);
              }}
            >
              X
            </button>
            <button
              className="save-note-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the click event from bubbling up to the note div
                onSaveNotes(note.id);
              }}
            >
              V
            </button>
            {note.id === selectedNoteId && note.text.length === 0
              ? "Click to edit..." : note.text.map((item, index) => (
                <span key={index} style={item.style}>
                  {item.char}
                </span>
              ))}       
              
          </div>
        ))}
      </div>
      
    </div>
  );
}


export default TextDisplay;
*/