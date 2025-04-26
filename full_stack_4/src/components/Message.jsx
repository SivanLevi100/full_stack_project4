import { useState } from "react";

function Message({ isOpen, type = "alert", message, onConfirm, onCancel,confirm,cancel}) {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) {
    if (inputValue !== "") {
      setInputValue(""); 
    }
    return null;
  }

  const handleConfirmClick = () => {
    if (type === "prompt") {
      onConfirm(inputValue);
    } else {
      onConfirm();
    }
  };

  const handleCancelClick = () => {
    onCancel();
  };

  return (
    <div className="Message-overlay">
      <div className="Message">
        <p>{message}</p>
        {type === "prompt" && (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your input"
          />
        )}
        <div className="Message-buttons">
          <button onClick={handleConfirmClick}>{confirm}</button>
          <button onClick={handleCancelClick}>{cancel}</button>
        </div>
      </div>
    </div>
  );
}

export default Message;
