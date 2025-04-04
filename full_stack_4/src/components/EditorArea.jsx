import VirtualKeyboard from "./VirtualKeyboard";
function EditorArea({onKeyPress}) {

  return (
    <div className="p-4 border rounded-xl shadow-md bg-gray-100">
      {/* add here more edit components*/}
      <VirtualKeyboard onKeyPress={onKeyPress} />
    </div>
  );
  }
export default EditorArea;


