
// Note management component

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faRotateBackward } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';


function NoteHandle({ onDeleteNote, onSaveNotes, note, onUndo, onSearchReplace, showMessage }) {
  const [isReplaceDialogOpen, setIsReplaceDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [replaceText, setReplaceText] = useState("");

  return (
    <div className="note-handle">

      <button className="replace-text-button"
        onClick={(e) => {
          e.stopPropagation();
          setIsReplaceDialogOpen(true); 
        }}>
        <FontAwesomeIcon icon={faSearch} /> 
      </button>

      <button className="undo-button" onClick={(e) => {
        e.stopPropagation();
        onUndo(note);
      }}>
        <FontAwesomeIcon icon={faRotateBackward} />
      </button>

      <button className="save-note-button" onClick={(e) => {
        e.stopPropagation();
        onSaveNotes(note.id);
      }}>
        <FontAwesomeIcon icon={faFloppyDisk} />
      </button>

      <button className="delete-note-button" onClick={(e) => {
        e.stopPropagation();
        onDeleteNote(note.id);
      }}>
        X
      </button>

      {/* Replace Inputs directly in the NoteHandle */}
      {/*{isReplaceDialogOpen && showMessage("alert", `Note updated in file "${existingFileName}"`, () => {})}*/}

      {isReplaceDialogOpen && (
        <div className="replace-inputs">
          <input 
            type="text" 
            placeholder="Search" 
            value={searchText} 
            onChange={(e) => setSearchText(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="Replace with" 
            value={replaceText} 
            onChange={(e) => setReplaceText(e.target.value)} 
          />
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSearchReplace(searchText, replaceText);
              setIsReplaceDialogOpen(false); // Close after replacing
            }}
          >
            <FontAwesomeIcon icon={faExchangeAlt} />
            Replace
          </button>
          <button 
            onClick={() => setIsReplaceDialogOpen(false)}
          >
            Cancel
          </button>
        </div>
      )}

      
    </div>
  );
}

export default NoteHandle;
