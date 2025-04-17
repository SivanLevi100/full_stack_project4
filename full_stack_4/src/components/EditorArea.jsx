//Text edit area component
/*
import VirtualKeyboard from "./VirtualKeyboard";
import DeleteKeys from "./DeleteKeys";

function EditorArea({ onKeyPress, onDeleteAll, onDeleteChar }) {
  return (
    <div className="editor-area">
      
      <VirtualKeyboard onKeyPress={onKeyPress} />
      <DeleteKeys onDeleteAll={onDeleteAll} onDeleteChar={onDeleteChar} />
    </div>
  );
}

export default EditorArea;
*/

import React from 'react';
import VirtualKeyboard from "./VirtualKeyboard";
import DeleteKeys from "./DeleteKeys";
import TextStyleControls from "./TextStyleControls";
import AdvancedEditOperations from "./AdvancedEditOperations";

function EditorArea({ 
  text,
  onKeyPress, 
  onDeleteAll, 
  onDeleteChar, 
  onStyleChange,
  onSearchReplace,
  onUndo
}) {
  /*return (
    <div className="editor-area">
      <TextStyleControls onStyleChange={onStyleChange} />
      <AdvancedEditOperations 
        text={text}
        onSearchReplace={onSearchReplace} 
        onUndo={onUndo} 
      />
      <VirtualKeyboard onKeyPress={onKeyPress} />
      <DeleteKeys onDeleteAll={onDeleteAll} onDeleteChar={onDeleteChar} />
      
    </div>
  );*/
  /*return (
    <div className="editor-area">
      <div className="side-panel">
        <TextStyleControls onStyleChange={onStyleChange} />
        <AdvancedEditOperations 
          text={text}
          onSearchReplace={onSearchReplace} 
          onUndo={onUndo} 
        />
      </div>
      <div className="keyboard-panel">
        <VirtualKeyboard onKeyPress={onKeyPress} />
        
      </div>
      <DeleteKeys onDeleteAll={onDeleteAll} onDeleteChar={onDeleteChar} />
    </div>
  );*/
  return (
    <div className="editor-wrapper">
      <div className="side-panel">
        <TextStyleControls onStyleChange={onStyleChange} />
        <AdvancedEditOperations 
          text={text}
          onSearchReplace={onSearchReplace} 
          onUndo={onUndo} 
        />
      </div>
  
      <div className="main-panel">
        <VirtualKeyboard onKeyPress={onKeyPress} />
        <DeleteKeys onDeleteAll={onDeleteAll} onDeleteChar={onDeleteChar} />
      </div>
    </div>
  );
  
  
}

export default EditorArea;