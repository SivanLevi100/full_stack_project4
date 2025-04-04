function TextDisplay({ text }) {
    return (
      <div className="border p-4 rounded-xl shadow-md min-h-[80px]">
        {text || "your text.."}
      </div>
    );
  }
  export default TextDisplay;