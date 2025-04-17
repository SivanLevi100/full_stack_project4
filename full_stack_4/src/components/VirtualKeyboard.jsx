/*import KeyboardKey from "./KeyboardKey";

const EnglishKeyboardLayout = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?'],
    ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
    ['Space'] 
];

function VirtualKeyboard({ onKeyPress }) {
    return (
        <div className="keyboard-container">
          {EnglishKeyboardLayout.map((row, rowIndex) => (
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
*/

//Keyboard component

import React, { useState } from 'react';
import KeyboardKey from "./KeyboardKey";
import LanguageSwitcher from "./LanguageSwitcher";

const keyboardLayouts = {
  english: [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?'],
    ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
    ['Space']
  ],
  hebrew: [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['/', '\'', 'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
    ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'],
    ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ', '?'],
    ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
    ['Space']
  ],
  emoji: [
    ['😀', '😂', '😊', '😍', '😎', '🤔', '😴', '😳', '😭', '😡'],
    ['👍', '👎', '👌', '✋', '👏', '👋', '👀', '👉', '👈', '💪'],
    ['❤️', '💔', '💖', '💙', '💯', '💤', '💨', '💦', '💫', '⭐'],
    ['🔥', '⚡', '☀️', '🌙', '☁️', '🌈', '🍀', '🌹', '🌸', '🍂'],
    ['🐶', '🐱', '🐭', '🐼', '🐵', '🦁', '🐯', '🦊', '🐻', '🐨'],
    ['Space']
  ]

};

function VirtualKeyboard({ onKeyPress }) {
  const [currentLanguage, setCurrentLanguage] = useState('english');
  
  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };
  
  return (
    <div className="keyboard-container">
      <LanguageSwitcher 
        currentLanguage={currentLanguage} 
        onLanguageChange={handleLanguageChange} 
      />
      
      {keyboardLayouts[currentLanguage].map((row, rowIndex) => (
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