
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
          showMessage("replace", "Replace text", (inputValue, secondInputValue) => {
            onSearchReplace(inputValue, secondInputValue);
          }, () => {}, "Replace", "Cancel");
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

      
    </div>
  );
}

export default NoteHandle;
