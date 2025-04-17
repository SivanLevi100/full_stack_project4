//Keyboard key component

function KeyboardKey({ char, onKeyPress }) {
    return (
      <button
        className="keyboard-key"
        onClick={() => onKeyPress(char)}
      >
        {char}
      </button>
    );
  }

  export default KeyboardKey;

 