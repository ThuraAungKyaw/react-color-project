import React from "react";
import { useParams } from "react-router-dom";
import ColorBox from "./ColorBox";


function SingleColorPalette({ palette }) {
    const { colorId } = useParams()


    const gatherShades = () => {
        let shades = []
        let colors = palette.colors;

        for (let key in colors) {
            shades = shades.concat(colors[key].filter(color => color.id === colorId))
        }
        return shades.slice(1)

    }

    const shades = gatherShades()
    const colorBoxes = shades.map(color => {

        return <ColorBox key={color.name} id={color.name} name={color.name} background={color.hex} showLink={false} />
    })


    return (


        <div className="Palette">
            <div className="Palette-colors">
                {colorBoxes}
            </div>

        </div>
    )

}

export default SingleColorPalette;