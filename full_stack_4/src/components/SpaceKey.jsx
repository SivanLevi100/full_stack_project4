const SpaceKey = ({ onSpacePress }) => {
    return (
      <div className="space-key">
        <button className="keyboard-key space-key" onClick={onSpacePress}>
          |_______________________________________|
        </button>
      </div>
    );
  };
  
  export default SpaceKey;