
/*
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

*/
import { useState, useEffect } from "react";
import TextDisplay from "./components/TextDisplay";
import EditorArea from "./components/EditorArea";

export default function App() {
  const [text, setText] = useState("");
  const [textHistory, setTextHistory] = useState([]);
  const [textStyle, setTextStyle] = useState({
    fontFamily: 'Arial',
    fontSize: '16px',
    color: 'black',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none'
  });

  // כאשר יש שינוי בטקסט, נשמור את המצב הקודם להיסטוריה
  useEffect(() => {
    // שמירה בהיסטוריה רק אם הטקסט אינו ריק ואינו זהה למצב האחרון בהיסטוריה
    if (text && (textHistory.length === 0 || textHistory[textHistory.length - 1] !== text)) {
      setTextHistory(prev => [...prev, text]);
    }
  }, [text]);

  const handleKeyPress = (char) => {
    if (char === "Space") {
      setText((prev) => prev + " ");
    } else if (char === "Backspace") {
      setText((prev) => prev.slice(0, -1));
    } else {
      setText((prev) => prev + char);
    }
  };

  const handleDeleteAll = () => {
    setText(""); // delete all text
  };

  const handleDeleteChar = () => {
    setText((prev) => prev.slice(0, -1)); // delete last char
  };

  const handleStyleChange = (property, value) => {
    setTextStyle(prev => {
      switch (property) {
        case 'bold':
          return { ...prev, fontWeight: prev.fontWeight === 'bold' ? 'normal' : 'bold' };
        case 'italic':
          return { ...prev, fontStyle: prev.fontStyle === 'italic' ? 'normal' : 'italic' };
        case 'underline':
          return { ...prev, textDecoration: prev.textDecoration === 'underline' ? 'none' : 'underline' };
        default:
          return { ...prev, [property]: value };
      }
    });
  };

  const handleSearchReplace = (searchText, replaceText) => {
    setText(prev => prev.replace(new RegExp(searchText, 'g'), replaceText));
  };

  const handleUndo = () => {
    if (textHistory.length > 0) {
      // חזרה למצב האחרון בהיסטוריה
      const newHistory = [...textHistory];
      const lastText = newHistory.pop();
      
      if (newHistory.length > 0) {
        setText(newHistory[newHistory.length - 1]);
      } else {
        setText("");
      }
      
      setTextHistory(newHistory);
    }
  };

  return (
    <div className="app-container">
      <TextDisplay text={text} textStyle={textStyle} />
      <EditorArea
        text={text}
        onKeyPress={handleKeyPress}
        onDeleteAll={handleDeleteAll}
        onDeleteChar={handleDeleteChar}
        onStyleChange={handleStyleChange}
        onSearchReplace={handleSearchReplace}
        onUndo={handleUndo}
      />
    </div>
  );
}