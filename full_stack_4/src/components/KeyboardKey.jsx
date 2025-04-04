function KeyboardKey({ char, onKeyPress }) {
    return (
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => onKeyPress(char)}
      >
        {char}
      </button>
    );
  }

  export default KeyboardKey;