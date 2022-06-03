import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import "./styles/SingleColorPalette.css"

function SingleColorPalette({ palette }) {
    const { colorId, paletteId } = useParams()
    const [colorFormat, setColorFormat] = useState("hex");
    const { colors, emoji, paletteName } = palette;
    console.log(palette)


    const gatherShades = () => {
        let shades = []

        for (let key in colors) {
            shades = shades.concat(colors[key].filter(color => color.id === colorId))
        }
        return shades.slice(1)

    }

    const shades = gatherShades()
    const colorBoxes = shades.map(color => {

        return <ColorBox key={color.name} id={color.name} name={color.name} background={color[colorFormat]} showLink={false} />
    })

    const changeColorFormat = async (format, callback) => {
        await setColorFormat(format)
        callback(true)
        setTimeout(() => { callback(false) }, 2000)

    }


    return (
        <div className="Palette">
            <Navbar colorFormat={colorFormat} changeColorFormat={changeColorFormat} isSinglePalette={true} />
            <div className="SingleColorPalette Palette-colors">
                {colorBoxes}
                <div className="go-back ColorBox">
                    <Link to={`/palette/${paletteId}`} className="back-btn">
                        Go Back
                    </Link>
                </div>
            </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    )

}

export default SingleColorPalette;