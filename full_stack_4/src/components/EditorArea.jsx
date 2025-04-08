import VirtualKeyboard from "./VirtualKeyboard";
import DeleteKeys from "./DeleteKeys";

function EditorArea({ onKeyPress, onDeleteAll, onDeleteChar }) {
  return (
    <div className="editor-area">
      {/* add here more edit components */}
      <VirtualKeyboard onKeyPress={onKeyPress} />
      <DeleteKeys onDeleteAll={onDeleteAll} onDeleteChar={onDeleteChar} />
    </div>
  );
}

export default EditorArea;


