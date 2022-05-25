import React from "react";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import './Navbar.css';

function Navbar({ colorIntensity, handleSliderChange }) {
    return (
        <header className="Navbar">
            <div className="logo">
                <a href="/">reactcolorpicker</a>
            </div>
            <div className="slider-container">
                <span>Level: {colorIntensity}</span>
                <div className="slider">
                    <Slider min={100} max={900} step={100} value={colorIntensity} onChange={handleSliderChange} />
                </div>
            </div>

        </header>
    )
}

export default Navbar;