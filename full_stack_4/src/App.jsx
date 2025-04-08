import { useState } from "react";
import TextDisplay from "./components/TextDisplay";
import EditorArea from "./components/EditorArea";

export default function App() {
  const [text, setText] = useState("");

  const handleKeyPress = (char) => {
    if (char === "Space") {
      setText(prev => prev + ' '); //add space
    } else if (char === "Backspace") {
      setText(prev => prev.slice(0, -1)); // delete last char
    } else {
      setText(prev => prev + char); // add char
    }
  };

  return (
    <div className="app-container">
      <TextDisplay text={text} />
      <EditorArea onKeyPress={handleKeyPress} />
    </div>
  );
} 