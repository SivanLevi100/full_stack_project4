import VirtualKeyboard from "./VirtualKeyboard";
import DeleteKeys from "./DeleteKeys";
import KeyboardSwitcher from "./KeyboardSwitcher";
import { useState } from "react";


function EditorArea({ onKeyPress, onDeleteAll, onDeleteChar }) {
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
      <VirtualKeyboard 
        onKeyPress={onKeyPress} 
        layout={currentLayout}
      />
      <DeleteKeys 
        onDeleteAll={onDeleteAll} 
        onDeleteChar={onDeleteChar} 
      />
    </div>
  );
}

export default EditorArea;


