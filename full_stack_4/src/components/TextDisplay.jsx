function TextDisplay({ text }) {
    return (
      <div className="text-display">
        {text || "your text.."}
      </div>
    );
  }
  export default TextDisplay;