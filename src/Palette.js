import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import './Palette.css';

function Palette({ palette, changePalette }) {
    const [colorIntensity, setColorIntensity] = useState(500);
    const [colorFormat, setColorFormat] = useState('hex');
    const { colors, paletteName, emoji } = palette;
    const { id } = useParams();


    useEffect(() => {
        changePalette(id)
    }, [id, changePalette])

    const handleSliderChange = (value) => {
        setColorIntensity(value);
    }

    const changeColorFormat = async (format, callback) => {
        await setColorFormat(format)
        callback(true)
        setTimeout(() => { callback(false) }, 2000)

    }

    const colorBoxes = colors[colorIntensity].map(color => {
        return <ColorBox key={color.id} background={color[colorFormat]} name={color.name} />
    })
    return (
        <div className="Palette">
            <Navbar
                colorFormat={colorFormat}
                colorIntensity={colorIntensity}
                handleSliderChange={handleSliderChange}
                changeColorFormat={changeColorFormat} />

            <div className="Palette-colors">
                {colorBoxes}
            </div>
            <div className="palette-footer">
                {paletteName}
                <span className="emoji">{emoji}</span>
            </div>
        </div>
    )

}

export default Palette;