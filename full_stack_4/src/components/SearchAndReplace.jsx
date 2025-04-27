import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";

function SearchAndReplace({
  isOpen,
  searchText,
  replaceText,
  setSearchText,
  setReplaceText,
  onSearchReplace,
  onClose,
}) {
  if (!isOpen) return null;

  return (
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
          onClose(); // Close after replacing
        }}
      >
        <FontAwesomeIcon icon={faExchangeAlt} />
        Replace
      </button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default SearchAndReplace;