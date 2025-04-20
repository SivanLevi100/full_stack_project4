import React from "react";

const KeyboardSwitcher = ({ currentLayout, onLanguageChange }) => {
  return (
    <div className="keyboard-switcher">
      <button
        className={`language-button ${currentLayout === "english" ? "active" : ""}`}
        onClick={() => onLanguageChange("english")}
      >
        A
      </button>
      <button
        className={`language-button ${currentLayout === "hebrew" ? "active" : ""}`}
        onClick={() => onLanguageChange("hebrew")}
      >
        א
      </button>
      <button
        className={`language-button ${currentLayout === "emoji" ? "active" : ""}`}
        onClick={() => onLanguageChange("emoji")}
      >
        😊 
      </button>
    </div>
  );
};

export default KeyboardSwitcher;