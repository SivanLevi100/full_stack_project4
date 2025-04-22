//Note management component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

function NoteHandle({ notes, onSaveNotes, onAddNote}) {
  const saveNotes = () => {
    onSaveNotes(notes);
    alert("Notes saved!");
  };

  const addNote = () => {
    onAddNote();
  };

  return (
    <div className="note-handle">
      <button className='note-buttons' onClick={saveNotes} title="save my notes"><FontAwesomeIcon icon={faFloppyDisk} /></button>
      <button className='note-buttons' onClick={addNote} title="add new note">+</button>
    </div>
  );
}
export default NoteHandle;