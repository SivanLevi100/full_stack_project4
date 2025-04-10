const SpaceKey = ({ onSpacePress }) => {
    return (
      <div className="space-key-container">
        <button className="keyboard-key space-key" onClick={() => onSpacePress()}>
          |_______________________________________|
        </button>
      </div>
    );
  };
  
  export default SpaceKey;