import KeyboardKey from "./KeyboardKey";

function VirtualKeyboard({ onKeyPress }) {
  return (
    <div className="flex gap-2">
      <KeyboardKey char="A" onKeyPress={onKeyPress} />
      <KeyboardKey char="B" onKeyPress={onKeyPress} />
      <KeyboardKey char="C" onKeyPress={onKeyPress} />

    </div>
  );
}
export default VirtualKeyboard;