//Text editing area component

import React from 'react';
import VirtualKeyboard from "./VirtualKeyboard";
import DeleteKeys from "./DeleteKeys";
import TextStyleControls from "./TextStyleControls";
import AdvancedEditOperations from "./AdvancedEditOperations";
import NoteHandle from './NoteHandle';


function EditorArea({ 
  text,
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
  onSaveNotes
}) {

  return (
    <div className="editor-wrapper">
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
        <NoteHandle 
          onAddNote={onAddNote} 
        />
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