import { useState } from "react";

function Message({ isOpen, type = "alert", message, onConfirm, onCancel, confirm, cancel }) {
  const [inputValue, setInputValue] = useState("");
  const [secondInputValue, setSecondInputValue] = useState(""); 

  if (!isOpen) {
    if (inputValue !== "" || secondInputValue !== "") { 
      setInputValue(""); 
      setSecondInputValue("");
    }
    return null;
  }

  const handleConfirmClick = () => {
    if (type === "prompt") {
      onConfirm(inputValue);
    } else if (type === "replace") {
      onConfirm(inputValue, secondInputValue); 
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
        {type === "replace" && (
          <>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter the text to replace"
            />
            <input
              type="text"
              value={secondInputValue}
              onChange={(e) => setSecondInputValue(e.target.value)}
              placeholder="Enter the new text"
            />
          </>
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
