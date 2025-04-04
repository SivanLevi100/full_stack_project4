import { useState } from "react";
import TextDisplay from "./components/TextDisplay";
import TextArea from "./components/EditorArea";
import VirtualKeyboard from "./components/VirtualKeyboard";

export default function TextEditorApp() {
  const [text, setText] = useState("");

  const handleKeyPress = (char) => {
    setText(prev => prev + char);
  };

  return (
    <div className="p-4 grid gap-4 grid-rows-[auto_1fr_auto] h-screen">
      <TextDisplay text={text} />
      <TextArea text={text} setText={setText} />
      <VirtualKeyboard onKeyPress={handleKeyPress} />
    </div>
  );
}