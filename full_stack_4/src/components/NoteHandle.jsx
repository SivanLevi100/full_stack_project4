//Note management component
/*
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk,faRotateBackward } from '@fortawesome/free-solid-svg-icons';
function NoteHandle({onDeleteNote, onSaveNotes,note,onUndo,onSearchReplace}) {


  return (
    <div className="note-handle">
      <button className="undo-button" onClick={(e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up to the note div
        onUndo(note);
      }}>
        <FontAwesomeIcon icon={faRotateBackward} />
      </button>
      <button
        className="save-note-button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent the click event from bubbling up to the note div
          onSaveNotes(note.id);
        }}
      >
        <FontAwesomeIcon icon={faFloppyDisk} />
      </button>
      <button
        className="delete-note-button"
        onClick={(e) => {
          e.stopPropagation(); // Prevent the click event from bubbling up to the note div
          onDeleteNote(note.id);
        }}
      >
        X
      </button>

      <button
       className="replace-text-button"
       onClick={(e) => {
       e.stopPropagation(); // שלא ילחץ בטעות גם על הפתק
       onSearchReplace(searchText, replaceText); // נקרא לפונקציה שכתבנו
         }}
        >
       🔄 החלף
      </button>


    </div>
  );
}
export default NoteHandle;
*/
// Note management component
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faRotateBackward } from '@fortawesome/free-solid-svg-icons';
import { faSearch, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';


function NoteHandle({ onDeleteNote, onSaveNotes, note, onUndo, onSearchReplace }) {
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

     

      {/* הדיאלוג יופיע רק אם נפתח */}
      {isReplaceDialogOpen && (
        <div className="replace-dialog">
          <h3>חיפוש והחלפה</h3>
          <input
            type="text"
            placeholder="טקסט לחיפוש"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <input
            type="text"
            placeholder="טקסט להחלפה"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
          />
          <button onClick={() => {
            onSearchReplace(searchText, replaceText); // מבצע חיפוש והחלפה
            setIsReplaceDialogOpen(false); // סוגר את הדיאלוג
            setSearchText(""); // מאפס קלטים
            setReplaceText("");
          }}>
            אישור
          </button>
          <button onClick={() => setIsReplaceDialogOpen(false)}>
            ביטול
          </button>
        </div>
      )}


      
    </div>
  );
}

export default NoteHandle;
