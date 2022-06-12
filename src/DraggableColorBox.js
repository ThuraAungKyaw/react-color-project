import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { SortableElement } from "react-sortable-hoc";
import chroma from "chroma-js";
import './styles/DraggableColorBox.css';

const DraggableColorBox = SortableElement(({ color, name, deleteColor }) => {
    const luminance = chroma(color).luminance()

    const handleClick = (e) => {
        e.stopPropagation();
        deleteColor(color)
    }

    return (<div className='DraggableColorBox' style={{ backgroundColor: color, color: luminance <= 0.25 ? '#fff' : '#000' }}>
        <div className='box-content'>
            <span> {name}</span>
            <span><DeleteIcon className='delete-icon' onClick={handleClick} /></span>
        </div>

    </div>)
})

export default DraggableColorBox;