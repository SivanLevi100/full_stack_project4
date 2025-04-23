//Note management component


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