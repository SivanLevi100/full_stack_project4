import { useState } from "react";
import LoginPage from "./components/LoginPage";
import NotesPage from "./components/NotesPage";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
      {currentUser ? (
        <NotesPage currentUser={currentUser} setCurrentUser={setCurrentUser} />
      ) : (
        <LoginPage setCurrentUser={setCurrentUser} />
      )}
    </div>
  );
}
