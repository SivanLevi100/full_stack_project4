

//Keyboard component

import React, { useState } from 'react';
import KeyboardKey from "./KeyboardKey";
import LanguageSwitcher from "./LanguageSwitcher";
import KeyboardSwitcher from './KeyboardSwitcher';
import SpaceKey from "./SpaceKey";



const keyboardLayouts = {
  english: [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?'],
    ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
  ],
  hebrew: [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['/', '\'', 'ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
    ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'],
    ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ', '?'],
    ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
  ],
  emoji: [
    ['😀', '😂', '😊', '😍', '😎', '🤔', '😴', '😳', '😭', '😡'],
    ['👍', '👎', '👌', '✋', '👏', '👋', '👀', '👉', '👈', '💪'],
    ['❤️', '💔', '💖', '💙', '💯', '💤', '💨', '💦', '💫', '⭐'],
    ['🔥', '⚡', '☀️', '🌙', '☁️', '🌈', '🍀', '🌹', '🌸', '🍂'],
    ['🐶', '🐱', '🐭', '🐼', '🐵', '🦁', '🐯', '🦊', '🐻', '🐨'],
  ]

};

function VirtualKeyboard({ onKeyPress, onSpacePress }) {
  const [currentLanguage, setCurrentLanguage] = useState('english');
  
  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };
  
  return (
    <div className="keyboard-container">
      {keyboardLayouts[currentLanguage].map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard">
          {row.map((char, i) => (
            <KeyboardKey key={i} char={char} onKeyPress={onKeyPress} />
          ))}
        </div>
      ))}
      <div className='keyboard-bottom-row'>
      <SpaceKey onSpacePress={onSpacePress} />
      <KeyboardSwitcher 
        currentLanguage={currentLanguage} 
        onLanguageChange={handleLanguageChange} 
      />  

      </div>
    </div>
  );
}

export default VirtualKeyboard;