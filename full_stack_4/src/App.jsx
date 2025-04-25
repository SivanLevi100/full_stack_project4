import { useState } from "react";
import LoginPage from "./components/LoginPage";
import NotesPage from "./components/NotesPage";
import Message from "./components/Message";


export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [MessageType, setMessageType] = useState("alert"); // "alert" or "prompt"
  const [MessageMessage, setMessageMessage] = useState("");
  const [onMessageConfirm, setOnMessageConfirm] = useState(() => () => {});
  const [onMessageCancel, setOnMessageCancel] = useState(() => () => {});


  const showMessage = (type, message, onConfirm) => {
    setMessageType(type);
    setMessageMessage(message);
    setOnMessageConfirm(() => onConfirm);
    setOnMessageCancel(() => () => setIsMessageOpen(false));
    setIsMessageOpen(true);
  };
  const handleConfirm = () => {
    setIsMessageOpen(false);
    onMessageConfirm(value);
    setMessageMessage("");
  }
  const handleCancel = () => {
    setIsMessageOpen(false);
    onMessageCancel();
    setMessageMessage("");
};
 

  return (
    <div className="App">
      <Message
        isOpen={isMessageOpen}
        type={MessageType}
        message={MessageMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      {currentUser ? (
        <NotesPage currentUser={currentUser} setCurrentUser={setCurrentUser} showMessage={showMessage}/>
      ) : (
        <LoginPage setCurrentUser={setCurrentUser} showMessage={showMessage} />
      )}
    </div>
  );
}
