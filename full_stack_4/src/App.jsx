import { useState, useEffect } from "react";
import TextDisplay from "./components/TextDisplay";
import EditorArea from "./components/EditorArea";

export default function App() {
  const [text, setText] = useState("");
  const [textHistory, setTextHistory] = useState([]);
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "",
      style: {
        fontFamily: "Arial",
        fontSize: "16px",
        color: "black",
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
      },
    },
  ]); // start with one note
  const [selectedNoteId, setSelectedNoteId] = useState(1);

  // כאשר יש שינוי בטקסט, נשמור את המצב הקודם להיסטוריה
  useEffect(() => {
    if (
      text &&
      (textHistory.length === 0 || textHistory[textHistory.length - 1] !== text)
    ) {
      setTextHistory((prev) => [...prev, text]);
    }
  }, [text]);

  const handleKeyPress = (char) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNoteId
          ? { ...note, text: note.text + char }
          : note
      )
    );
  };

  const handleSpacePress = () => {
    handleKeyPress(" ");
  };

  const HandleDeleteAll = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNoteId ? { ...note, text: "" } : note
      )
    );
  };

  const HandleDeleteChar = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNoteId
          ? { ...note, text: note.text.slice(0, -1) }
          : note
      )
    );
  };

  const handleAddNote = () => {
    if (notes.length < 6) {
      const newNote = {
        id: Date.now(),
        text: "",
        style: {
          fontFamily: "Arial",
          fontSize: "16px",
          color: "white",
          fontWeight: "normal",
          fontStyle: "normal",
          textDecoration: "none",
        },
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setSelectedNoteId(newNote.id);
    }
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(null); // אם הפתק שנבחר נמחק, מבטלים את הבחירה
    }
  };
  

  
  const handleStyleChange = (property, value) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNoteId
          ? {
              ...note,
              style: (() => {
                const newStyle = { ...note.style };
                switch (property) {
                  case "bold":
                    newStyle.fontWeight = newStyle.fontWeight === "bold" ? "normal" : "bold";
                    break;
                  case "italic":
                    newStyle.fontStyle = newStyle.fontStyle === "italic" ? "normal" : "italic";
                    break;
                  case "underline":
                    newStyle.textDecoration = newStyle.textDecoration === "underline" ? "none" : "underline";
                    break;
                  default:
                    newStyle[property] = value;
                }
                return newStyle;
              })(),
            }
          : note
      )
    );
  };
  

  const handleSearchReplace = (searchText, replaceText) => {
    setText((prev) => prev.replace(new RegExp(searchText, "g"), replaceText));
  };

  const handleUndo = () => {
    if (textHistory.length > 0) {
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
      <TextDisplay
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={setSelectedNoteId}
        onDeleteNote={handleDeleteNote}
      />
      <EditorArea
        text={text}
        onKeyPress={handleKeyPress}
        onDeleteAll={HandleDeleteAll}
        onDeleteChar={HandleDeleteChar}
        onSpacePress={handleSpacePress}
        onStyleChange={handleStyleChange}
        onSearchReplace={handleSearchReplace}
        onUndo={handleUndo}
        onAddNote={handleAddNote}
      />
    </div>
  );
}