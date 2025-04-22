//Note management component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

function NoteHandle({onAddNote}) {

  const addNote = () => {
    onAddNote();
  };

  return (
    <div className="note-handle">
      <button className='note-buttons' onClick={addNote} title="add new note">+</button>
    </div>
  );
}
export default NoteHandle;