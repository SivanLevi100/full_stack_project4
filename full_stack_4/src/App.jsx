import { useState } from "react";
import TextDisplay from "./components/TextDisplay";
import EditorArea from "./components/EditorArea";

export default function App() {
  const [text, setText] = useState("");

  const handleKeyPress = (char) => {
    if (char === "Space") {
      setText((prev) => prev + " ");
    } else if (char === "Backspace") {
      setText((prev) => prev.slice(0, -1));
    } else {
      setText((prev) => prev + char);
    }
  };

  const HandleDeleteAll = () => {
    setText(""); // delete all text
  };

  const HandleDeleteChar = () => {
    setText((prev) => prev.slice(0, -1)); // delete last char
  };

  return (
    <div className="app-container">
      <TextDisplay text={text} />
      <EditorArea
        onKeyPress={handleKeyPress}
        onDeleteAll={HandleDeleteAll}
        onDeleteChar={HandleDeleteChar}
      />
    </div>
  );
}