//Text edit area component
/*
import VirtualKeyboard from "./VirtualKeyboard";
import DeleteKeys from "./DeleteKeys";
import KeyboardSwitcher from "./KeyboardSwitcher";
import { useState } from "react";
import SpaceKey from "./SpaceKey";


function EditorArea({ onKeyPress, onSpacePress, onDeleteAll, onDeleteChar }) {
  const [currentLayout, setCurrentLayout] = useState("english");

  const handleSwitchLayout = (layout) => {
    setCurrentLayout(layout);
  };
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
import LanguageSwitcher from './LanguageSwitcher';


function EditorArea({ 
  text,
  onKeyPress, 
  onDeleteAll, 
  onDeleteChar, 
  onSpacePress,
  onStyleChange,
  onSearchReplace,
  onUndo,
  onAddNote
}) {

  return (
    <div className="editor-wrapper">
      <div className="side-panel">
        <TextStyleControls onStyleChange={onStyleChange} />
      </div>
  
      <div className="main-panel">
        <VirtualKeyboard onKeyPress={onKeyPress} onSpacePress={onSpacePress} />
      </div>
      <div className="side-panel">
        <DeleteKeys onDeleteAll={onDeleteAll} onDeleteChar={onDeleteChar} />
        <AdvancedEditOperations 
          text={text}
          onSearchReplace={onSearchReplace} 
          onUndo={onUndo} 
        />
        <button className="add-note-button" onClick={onAddNote}>
        + 
      </button>
      </div>
    </div>
  );
  
  
}

export default EditorArea;