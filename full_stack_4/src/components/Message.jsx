import React, { useState } from "react";

function Message({ isOpen, type = "alert", message, onConfirm, onCancel }) {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

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
          <button onClick={onConfirm}>
            OK
          </button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Message;