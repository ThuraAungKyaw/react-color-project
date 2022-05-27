import React from "react";
import { Link } from 'react-router-dom';

function PaletteList({ palettes }) {
    console.log(palettes)
    return (<div>{
        palettes.map(color => {
            return (<><Link to={`/palette/${color.id}`}>{color.id}</Link><br /></>)
        })
    }</div>)
}

export default PaletteList;