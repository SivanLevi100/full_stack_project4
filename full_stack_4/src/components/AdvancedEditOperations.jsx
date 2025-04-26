//Component for advanced editing operations

import React, { useState } from 'react';

function AdvancedEditOperations({ text, onSearchReplace, onUndo }) {
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  
  const handleSearch = () => {
    if (text.includes(searchText)) {
      showMessage("alert", `Found "${searchText}" in the text!`);
    } else {
      showMessage("alert", `"${searchText}" not found.`);
    }
  };
  
  const handleReplace = () => {
    if (text.includes(searchText)) {
      onSearchReplace(searchText, replaceText);
      showMessage("alert", `Replaced "${searchText}" with "${replaceText}"`,() => {});
    } else {
      showMessage("alert", `"${searchText}" not found.`);
    }
  };
  
  return (
    <div className="advanced-edit-operations">
      <div className="search-replace-section">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search for..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        
        <div className="input-group">
          <input
            type="text"
            placeholder="Replace with..."
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
          />
          <button onClick={handleReplace}>Replace</button>
        </div>
      </div>
      
      <button className="undo-button" onClick={onUndo}>
        Undo
      </button>
    </div>
  );
}

export default AdvancedEditOperations;