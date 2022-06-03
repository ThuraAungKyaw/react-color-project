import React, { useState } from "react";
import Slider from "rc-slider";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import 'rc-slider/assets/index.css';
import './Navbar.css';

function Navbar({ colorIntensity, colorFormat, handleSliderChange, changeColorFormat, isSinglePalette }) {

    const [open, setSnackBarState] = useState(false);

    const closeSnackbar = () => {
        setSnackBarState(false)
    }

    return (
        <header className="Navbar">
            <div className="logo">
                <a href="/">reactcolorpicker</a>
            </div>
            {!isSinglePalette && <div className="slider-container">
                <span>Level: {colorIntensity}</span>
                <div className="slider">
                    <Slider min={100} max={900} step={100} value={colorIntensity} onChange={handleSliderChange} />
                </div>
            </div>}
            <div className="select-container">
                <Select
                    labelId="color-option-select"
                    id="color-option-select"
                    value={colorFormat}
                    label="color-option"
                    onClose={closeSnackbar}
                    onChange={(e) => {
                        changeColorFormat(e.target.value, setSnackBarState)
                    }}
                >
                    <MenuItem value={'hex'}>HEX - #ffffff</MenuItem>
                    <MenuItem value={'rgb'}>RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value={'rgba'}>RGBA - rgba(255,255,255,1.0)</MenuItem>
                </Select>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                open={open}
                autoHideDuration={3000}
                message={<span id="message-id">Color Format Changed to {colorFormat.toUpperCase()}!</span>}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                action={[< IconButton onClick={closeSnackbar} >
                    <CloseIcon />
                </IconButton>]}
            />

        </header >
    )
}

export default Navbar;