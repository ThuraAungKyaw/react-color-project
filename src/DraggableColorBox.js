import React from 'react';
import './styles/DraggableColorBox.css';

function DraggableColorBox({ color, name }) {
    return (<div className='DraggableColorBox' style={{ backgroundColor: color }}>{name}</div>)
}

export default DraggableColorBox;