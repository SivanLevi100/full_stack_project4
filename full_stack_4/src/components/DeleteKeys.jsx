import React from 'react';

const DeleteKeys = ({ onDeleteAll, onDeleteChar }) => {
    return (
        <div className="delete-keys">
            <button className='keyboard-key' onClick={onDeleteAll}>Delete All</button>
            <button className='keyboard-key' onClick={onDeleteChar}>Delete</button>
        </div>
    );
};

export default DeleteKeys;