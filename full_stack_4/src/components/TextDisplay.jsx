///Component for displaying notes  
import React from 'react';  
import NoteHandle from './NoteHandle';   

function TextDisplay({ notes, selectedNoteId, onSelectNote, onDeleteNote, onSaveNotes, onUndo, showMessage, onSearchReplace }) {  
  // Function to render text with individual character styling
  
  const renderStyledText = (note) => {
    if (!note.text || !Array.isArray(note.text) || note.text.length === 0) {
      return "Click to edit...";
    }
    
    return (
      <span className="note-text">
        {note.text.map((charObj, index) => (
          <span key={index} style={charObj.style}>
            {charObj.char}
          </span>
        ))}
      </span>
    );
  };
  
  
  return (
    <div className="text-display">
      <div className="grid-container">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`note ${note.id === selectedNoteId ? "selected" : ""}`}
            onClick={() => {
              onSelectNote(note.id);
            }}
          >
            <NoteHandle 
              showMessage={showMessage} 
              onDeleteNote={onDeleteNote} 
              onSaveNotes={onSaveNotes}
              note={note} 
              onUndo={onUndo} 
              onSearchReplace={onSearchReplace} 
            />
            
            {/* Render styled text */}
            {note.id === selectedNoteId && Array.isArray(note.text) && note.text.length === 0
              ? ""
              : renderStyledText(note)
            }
          </div>
        ))}
      </div>
    </div>
  ); 
}
    
export default TextDisplay;