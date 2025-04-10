import { useState } from "react";
import TextDisplay from "./components/TextDisplay";
import EditorArea from "./components/EditorArea";

export default function App() {
  const [notes, setNotes] = useState([{ id: 1, text: "" }]); // מתחילים עם פתק אחד
  const [selectedNoteId, setSelectedNoteId] = useState(1);

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
      const newNote = { id: Date.now(), text: "" }; 
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setSelectedNoteId(newNote.id); 
    }
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(null); // Deselect the note if it's deleted
    }
  };

  return (
    <div className="app-container">
      <TextDisplay
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={setSelectedNoteId}
        onDeleteNote={handleDeleteNote}
        onAddNote={handleAddNote}
      />
      <EditorArea
        onKeyPress={handleKeyPress}
        onSpacePress={handleSpacePress}
        onDeleteAll={HandleDeleteAll}
        onDeleteChar={HandleDeleteChar}
      />
    </div>
  );
}