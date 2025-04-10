function TextDisplay({ notes, selectedNoteId, onSelectNote, onDeleteNote, onAddNote }) {
  return (
    <div className="text-display">
      <button className="add-note-button" onClick={onAddNote}>
        + 
      </button>
      <div className="grid-container">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`note ${note.id === selectedNoteId ? "selected" : ""}`}
            onClick={() => onSelectNote(note.id)}
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