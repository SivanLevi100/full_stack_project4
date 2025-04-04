import { useState } from "react";
import TextDisplay from "./components/TextDisplay";
import EditorArea from "./components/EditorArea";

export default function App() {
  const [text, setText] = useState("");

  const handleKeyPress = (char) => {
    setText(prev => prev + char);
  };

  return (
    <div className="p-4 grid gap-4 grid-rows-[auto_1fr_auto] h-screen">
      <TextDisplay text={text} />
      <EditorArea onKeyPress={handleKeyPress} />
    </div>
  );
}