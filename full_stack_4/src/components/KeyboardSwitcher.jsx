import React from "react";

const KeyboardSwitcher = ({ currentLayout, onSwitchLayout }) => {
  return (
    <div className="keyboard-switcher">
      <button
        className={`keyboard-key ${currentLayout === "english" ? "active" : ""}`}
        onClick={() => onSwitchLayout("english")}
      >
        English
      </button>
      <button
        className={`keyboard-key ${currentLayout === "hebrew" ? "active" : ""}`}
        onClick={() => onSwitchLayout("hebrew")}
      >
        עברית
      </button>
      <button
        className={`keyboard-key ${currentLayout === "emoji" ? "active" : ""}`}
        onClick={() => onSwitchLayout("emoji")}
      >
        😊 Emoji
      </button>
    </div>
  );
};

export default KeyboardSwitcher;