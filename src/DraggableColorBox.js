import React from 'react';
import './styles/DraggableColorBox.css';

function DraggableColorBox({ color }) {
    return (<div className='DraggableColorBox' style={{ backgroundColor: color }}>{color}</div>)
}

export default DraggableColorBox;