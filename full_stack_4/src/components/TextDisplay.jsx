//Text display component
/*
function TextDisplay({ text }) {
    return (
      <div className="text-display">
        {text || "your text.."}
      </div>
    );
  }

export default TextDisplay;
*/

import React from 'react';

function TextDisplay({ text, textStyle }) {
  return (
    <div className="text-display">
      <div style={textStyle}>
        {text || "your text.."}
      </div>
    </div>
  );
}

export default TextDisplay;