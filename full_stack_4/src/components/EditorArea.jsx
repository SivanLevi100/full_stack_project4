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
      {/* add here more edit components */}
      <KeyboardSwitcher
        currentLayout={currentLayout}
        onSwitchLayout={handleSwitchLayout}
      />
      <div className="keyboard-container">
        <VirtualKeyboard 
        onKeyPress={onKeyPress} 
        layout={currentLayout}
        />
        <SpaceKey
        onSpacePress={onSpacePress}
        />
      </div>
      <DeleteKeys 
        onDeleteAll={onDeleteAll} 
        onDeleteChar={onDeleteChar} 
      />
    </div>
  );
}

export default EditorArea;


