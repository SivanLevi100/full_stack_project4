//Text editing area component

import React from 'react';
import VirtualKeyboard from "./VirtualKeyboard";
import DeleteKeys from "./DeleteKeys";
import TextStyleControls from "./TextStyleControls";
import OpenFiles from './OpenFiles';


function EditorArea({ 
  currentUser,
  setNotes,
  notes,
  onKeyPress, 
  onDeleteAll, 
  onDeleteChar, 
  onDeleteWord,
  onSpacePress,
  onStyleChange,
  onAddNote,
  editMode,
  setEditMode,
  showMessage,
}) {
  

  return (
    <div className="editor-area">
      <div className="side-panel">
        <TextStyleControls
           onStyleChange={onStyleChange}
           editMode={editMode}
           setEditMode={setEditMode}
        />
      </div>
  
      <div className="main-panel">
        <VirtualKeyboard onKeyPress={onKeyPress} onSpacePress={onSpacePress} />
      </div>
      <div className="side-panel">
      <DeleteKeys onDeleteAll={onDeleteAll} onDeleteChar={onDeleteChar} onDeleteWord={onDeleteWord}/>

        <div className='notes-header'>
          <button className='add-note-button' onClick={onAddNote} title="add new note">+ Add Note</button>
          <OpenFiles
            currentUser={currentUser} 
            notes={notes}
            setNotes={setNotes} 
            showMessage={showMessage}
          />
        </div>
        
      </div>
    </div>
  );
  
  
}

export default EditorArea;
