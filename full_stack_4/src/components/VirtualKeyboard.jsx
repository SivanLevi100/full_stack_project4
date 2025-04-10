import KeyboardKey from "./KeyboardKey";

const keyboardLayouts = {
    english: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?'],
      ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
      ['space'] 
    ],
    hebrew: [
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
      ['/', '\'', 'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
      ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'],
      ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ', '?'],
      ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
      ['space'] 
    ],
    emoji: [
      ['😀', '😂', '😊', '😍', '😎', '🤔', '😴', '😳', '😭', '😡'],
      ['👍', '👎', '👌', '✋', '👏', '👋', '👀', '👉', '👈', '💪'],
      ['❤️', '💔', '💖', '💙', '💯', '💤', '💨', '💦', '💫', '⭐'],
      ['🔥', '⚡', '☀️', '🌙', '☁️', '🌈', '🍀', '🌹', '🌸', '🍂'],
      ['🐶', '🐱', '🐭', '🐼', '🐵', '🦁', '🐯', '🦊', '🐻', '🐨'],
      ['space'] 
    ]
  };

function VirtualKeyboard({ onKeyPress ,layout}) {
  const currentLayout = keyboardLayouts[layout] || keyboardLayouts.english; // Default to English if no layout is provided
    return (
        <div className="keyboard-container">
          {currentLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {row.map((char, i) => (
                <KeyboardKey key={i} char={char} onKeyPress={onKeyPress} />
              ))}
            </div>
          ))}
        </div>
      );
}

export default VirtualKeyboard;

/*

  

*/