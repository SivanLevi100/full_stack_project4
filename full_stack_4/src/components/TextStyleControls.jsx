//Text formatting tool component

import React from 'react';

function TextStyleControls({ onStyleChange, editMode, setEditMode  }) {
  const fonts = ['Arial', 'Times New Roman', 'Courier New', 'Verdana', 'David'];
  const sizes = ['12px', '14px', '16px', '18px', '24px', '32px'];
  const colors = ['black', 'red', 'blue', 'green', 'purple', 'orange'];
  
  return (
    <div className="text-style-controls">
       <div className="edit-mode-selector">
        <label>Edit Mode:</label>
        <select onChange={(e) => setEditMode(e.target.value)} value={editMode}>
          <option value="all">Edit All</option>
          <option value="forward">Edit From Now On</option>
        </select>
      </div>
      
      <div className='font-size-selector'>
        <div className="style-section">
          <label>Font:</label>
          <select onChange={(e) => onStyleChange('fontFamily', e.target.value)}>
            {fonts.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>
        
        <div className="style-section">
          <label>Size:</label>
          <select onChange={(e) => onStyleChange('fontSize', e.target.value)}>
            {sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="style-section">
        <label>Color:</label>
        <div className="color-options">
          {colors.map(color => (
            <button
              key={color}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => onStyleChange('color', color)}
            />
          ))}
        </div>
      </div>
      
      <div className="text-formatting">
        <button onClick={() => onStyleChange('bold', true)}>
          <strong>B</strong>
        </button>
        <button onClick={() => onStyleChange('italic', true)}>
          <em>I</em>
        </button>
        <button onClick={() => onStyleChange('underline', true)}>
          <u>U</u>
        </button>
      </div>
    </div>
  );
}

export default TextStyleControls;
