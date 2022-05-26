import React from "react";
import Slider from "rc-slider";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import 'rc-slider/assets/index.css';
import './Navbar.css';

function Navbar({ colorIntensity, colorFormat, handleSliderChange, changeColorFormat }) {



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
            <Select
                labelId="color-option-select"
                id="color-option-select"
                value={colorFormat}
                label="color-option"
                onChange={changeColorFormat}
            >
                <MenuItem value={'hex'}>HEX - #ffffff</MenuItem>
                <MenuItem value={'rgb'}>RGB - rgb(255,255,255)</MenuItem>
                <MenuItem value={'rgba'}>RGBA - rgba(255,255,255,1.0)</MenuItem>
            </Select>
        </header>
    )
}

export default Navbar;