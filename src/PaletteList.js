import React from "react";
import seedColors from './seedColors';
import { Link } from 'react-router-dom';

function PaletteList() {
    return (<div>{
        seedColors.map(color => {
            return (<><Link to={`/palette/${color.id}`}>{color.id}</Link><br /></>)
        })
    }</div>)
}

export default PaletteList;