import { useState } from "react";
import LoginPage from "./components/LoginPage";
import NotesPage from "./components/NotesPage";
import Message from "./components/Message";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [messageType, setMessageType] = useState("alert"); // "alert" or "prompt"
  const [messageText, setMessageText] = useState("");
  const [onConfirm, setOnConfirm] = useState(() => () => {});
  const [onCancel, setOnCancel] = useState(() => () => {});
  const [confirm, setConfirm] = useState("OK");
  const [cancel, setCancel] = useState("Cancel");

  const showMessage = (type, message, onConfirmCallback, onCancelCallback,confirm,cancel) => {
    setMessageType(type);
    setMessageText(message);
    setOnConfirm(() => onConfirmCallback || (() => {}));
    setOnCancel(() => onCancelCallback || (() => {}));
    setIsMessageOpen(true);
    setConfirm(confirm || "OK");
    setCancel(cancel || "Cancel");
  };

  const handleConfirm = (inputValue = null,secondInput=null) => {
    onConfirm(inputValue,secondInput);
    closeMessage();
  };

  const handleCancel = () => {
    onCancel();
    closeMessage();
  };

  const closeMessage = () => {
    setIsMessageOpen(false);
    setMessageText("");
    setOnConfirm(() => () => {});
    setOnCancel(() => () => {});
  };

  return (
    <div className="App">
      <Message
        isOpen={isMessageOpen}
        type={messageType}
        message={messageText}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirm={confirm}
        cancel={cancel}
      />
      {currentUser ? (
        <NotesPage
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          showMessage={showMessage}
        />
      ) : (
        <LoginPage setCurrentUser={setCurrentUser} showMessage={showMessage} />
      )}
    </div>
  );
}
