import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import './Palette.css';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorIntensity: 500,
            colorFormat: 'hex'
        }

        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.changeColorFormat = this.changeColorFormat.bind(this);
    }

    handleSliderChange(value) {
        this.setState({ colorIntensity: value })
    }

    changeColorFormat(format, callback) {
        this.setState({
            colorFormat: format
        }, () => {
            callback(true)
            setTimeout(() => { callback(false) }, 2000)
        })
    }

    render() {
        const { colors, paletteName, emoji } = this.props.palette;
        const { colorIntensity, colorFormat } = this.state;
        const colorBoxes = colors[colorIntensity].map(color => {
            return <ColorBox key={color.id} background={color[colorFormat]} name={color.name} />
        })
        return (
            <div className="Palette">
                <Navbar
                    colorFormat={colorFormat}
                    colorIntensity={colorIntensity}
                    handleSliderChange={this.handleSliderChange}
                    changeColorFormat={this.changeColorFormat} />

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
}

export default Palette;