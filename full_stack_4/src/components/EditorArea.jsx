//Text editing area component

import React from 'react';
import VirtualKeyboard from "./VirtualKeyboard";
import DeleteKeys from "./DeleteKeys";
import TextStyleControls from "./TextStyleControls";
import AdvancedEditOperations from "./AdvancedEditOperations";
import OpenFiles from './OpenFiles';


function EditorArea({ 
  text,
  currentUser,
  setNotes,
  notes,
  onKeyPress, 
  onDeleteAll, 
  onDeleteChar, 
  onDeleteWord,
  onSpacePress,
  onStyleChange,
  onSearchReplace,
  onUndo,
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
        <div className='notes-header'>
          <button className='add-note-button' onClick={onAddNote} title="add new note">+ Add Note</button>
          <OpenFiles
            currentUser={currentUser} 
            notes={notes}
            setNotes={setNotes} 
            showMessage={showMessage}
          />
        </div>
        <DeleteKeys onDeleteAll={onDeleteAll} onDeleteChar={onDeleteChar} onDeleteWord={onDeleteWord}/>
        <AdvancedEditOperations 
          text={text}
          onSearchReplace={onSearchReplace} 
          onUndo={onUndo} 
        />
        
      </div>
    </div>
  );
  
  
}

export default EditorArea;