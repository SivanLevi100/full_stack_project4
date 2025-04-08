import VirtualKeyboard from "./VirtualKeyboard";
function EditorArea({onKeyPress}) {

  return (
    <div className="editor-area">
      {/* add here more edit components*/}
      <VirtualKeyboard onKeyPress={onKeyPress} />
    </div>
  );
  }
export default EditorArea;


