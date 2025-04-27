
//TextDisplay component
import React from 'react';  
import NoteHandle from './NoteHandle';   

function TextDisplay({ notes, selectedNoteId, onSelectNote, onDeleteNote, onSaveNotes, onUndo, showMessage, onSearchReplace }) {  

  const renderStyledText = (note) => {
    if (!note.text || !Array.isArray(note.text) || note.text.length === 0) {
      return (
        <span className="empty-note-placeholder">
          Click to edit...
        </span>
      );
    }
    
    return (
      <span className="note-text">
        {note.text.map((block, index) => (
          <span key={index} style={block.style}>
            {block.content}
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
            onClick={() => onSelectNote(note.id)}
          >
            <NoteHandle 
              showMessage={showMessage} 
              onDeleteNote={onDeleteNote} 
              onSaveNotes={onSaveNotes}
              note={note} 
              onUndo={onUndo} 
              onSearchReplace={onSearchReplace} 
            />
            {renderStyledText(note)}
          </div>
        ))}
      </div>
    </div>
  ); 
}
    
export default TextDisplay;
