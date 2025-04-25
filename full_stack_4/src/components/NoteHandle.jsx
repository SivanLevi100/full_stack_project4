//Note management component

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk,faRotateBackward } from '@fortawesome/free-solid-svg-icons';
function NoteHandle({onDeleteNote, onSaveNotes,note}) {


  return (
    <div className="note-handle">
      <button className="undo-button">
        <FontAwesomeIcon icon={faRotateBackward} />
      </button>
      <button
        className="save-note-button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent the click event from bubbling up to the note div
          onSaveNotes(note.id);
        }}
      >
        <FontAwesomeIcon icon={faFloppyDisk} />
      </button>
      <button
        className="delete-note-button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent the click event from bubbling up to the note div
          onDeleteNote(note.id);
        }}
      >
        X
      </button>
    </div>
  );
}
export default NoteHandle;