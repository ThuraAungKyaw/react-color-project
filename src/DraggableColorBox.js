import React from 'react';
import './styles/DraggableColorBox.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { SortableElement } from "react-sortable-hoc";

const DraggableColorBox = SortableElement(({ color, name, deleteColor }) => {

    const handleClick = (e) => {
        e.stopPropagation();
        console.log(color)
        deleteColor(color)
    }

    return (<div className='DraggableColorBox' style={{ backgroundColor: color }}>
        <div className='box-content'>
            <span> {name}</span>
            <span><DeleteIcon className='delete-icon' onClick={handleClick} /></span>
        </div>

    </div>)
})

export default DraggableColorBox;