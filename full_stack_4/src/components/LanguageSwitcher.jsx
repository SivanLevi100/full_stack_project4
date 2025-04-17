//Multi-language support component

import React from 'react';

function LanguageSwitcher({ currentLanguage, onLanguageChange }) {
  const languages = ['english', 'hebrew', 'emoji'];
  
  return (
    <div className="language-switcher">
      {languages.map(lang => (
        <button 
          key={lang}
          className={`language-button ${currentLanguage === lang ? 'active' : ''}`}
          onClick={() => onLanguageChange(lang)}
        >
          {lang.charAt(0).toUpperCase() + lang.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;