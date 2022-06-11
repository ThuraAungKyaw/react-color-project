import React, { useRef, useEffect } from "react";
import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'

function EmojiPicker(props) {
    const ref = useRef()

    useEffect(() => {
        new Picker({ ...props, data, ref })
    }, [])

    return <div ref={ref} />
}

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
            <DialogTitle>Choose a Palette Name</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter a new for your new palette.
                </DialogContentText>
                <EmojiPicker />
                <ValidatorForm
                    onSubmit={handleSubmit}
                >
                    <TextValidator
                        fullWidth
                        margin="normal"
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