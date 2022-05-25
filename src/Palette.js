import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import './Palette.css';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorIntensity: 500
        }

        this.handleSliderChange = this.handleSliderChange.bind(this);
    }

    handleSliderChange(value) {
        this.setState({ colorIntensity: value })
    }
    render() {
        const { colors } = this.props.palette;
        const { colorIntensity } = this.state;
        const colorBoxes = colors[colorIntensity].map(color => {
            return <ColorBox key={color.id} background={color.hex} name={color.name} />
        })
        return (
            <div className="Palette">
                <Navbar colorIntensity={this.state.colorIntensity} handleSliderChange={this.handleSliderChange} />

                <div className="Palette-colors">
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

export default Palette;