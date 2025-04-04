function EditorArea({ text, setText }) {
    return (
      <textarea
        className="w-full h-40 p-2 border rounded-md resize-none"
        placeholder="הקלד כאן..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ direction: "rtl" }}
      />
    );
  }
export default EditorArea;