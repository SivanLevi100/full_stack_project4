//Delete button component

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

const DeleteKeys = ({ onDeleteAll, onDeleteChar }) => {
    return (
        <div className="delete-keys">
            <button className='keyboard-key' onClick={onDeleteChar}>
                <FontAwesomeIcon icon={faDeleteLeft} /> 
            </button>
            <button className='keyboard-key' onClick={onDeleteAll}>Delete All</button>
        </div>
    );
};

export default DeleteKeys;