import React, { useState } from "react";
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function PaletteMetaForm({ isOpen, setModalOpen, paletteName, handleNameChange, handleSave }) {

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleSubmit = () => {

        handleSave()
    }


    return (<div>
        <Button variant="contained" color="primary" onClick={handleOpen}>
            Save Palette
        </Button>
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Save Palette</DialogTitle>
            <DialogContent>
                <DialogContentText>

                </DialogContentText>
                <ValidatorForm
                    onSubmit={handleSubmit}
                >
                    <TextValidator
                        label="Palette Name"
                        name="paletteName"
                        onChange={handleNameChange}
                        value={paletteName}
                        validators={['required', 'isPaletteNameExisting']}
                        errorMessages={['this field is required', 'the palette with the same name already exists']}
                    />
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </ValidatorForm>
            </DialogContent>

        </Dialog>
    </div>)
}

export default PaletteMetaForm;