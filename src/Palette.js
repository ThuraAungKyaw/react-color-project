import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
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
                <Slider min={100} max={900} step={100} value={colorIntensity} onChange={this.handleSliderChange} />
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

export default Palette;