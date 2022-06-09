import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import "./styles/ColorPickerForm.css"

function ColorPickerForm({ selectedColor, setSelectedColor, paletteFull, addNewColor }) {

    const [colorName, setColorName] = useState("");

    const handlePickerChange = (pickedColor) => {
        setSelectedColor(pickedColor.hex)
    }

    const handleNameChange = (e) => {
        setColorName(e.target.value)
    }

    const handleColorAdd = () => {
        addNewColor(selectedColor, colorName);
        setColorName("")
    }



    return (
        <div>
            <ChromePicker className='picker' color={selectedColor} onChange={handlePickerChange} />
            <ValidatorForm
                onSubmit={handleColorAdd}
            >
                <TextValidator
                    className='colorNameInput'
                    label="Color Name"
                    name="colorName"
                    margin="normal"
                    onChange={handleNameChange}
                    value={colorName}
                    validators={['required', 'isNameExisting', 'isColorExisting']}
                    errorMessages={['this field is required', 'the color with the same name already exists', 'the color already exists']}
                />
                <Button className="add-btn" type="submit" disabled={paletteFull} variant="contained" style={{ background: selectedColor }}>
                    {paletteFull ? 'PALETTE FULL' : 'ADD COLOR'}
                </Button>
            </ValidatorForm>
        </div>
    )
}

export default ColorPickerForm;