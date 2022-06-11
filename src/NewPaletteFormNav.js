import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';

import PaletteMetaForm from "./PaletteMetaForm";

import './styles/NewPaletteForm.css';

const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

function NewPaletteFormNav({ open, handleDrawerOpen, paletteName, handleSave, handleNameChange }) {
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!isModalOpen)
    }

    return (<div>

        <CssBaseline />
        <AppBar position="fixed" color="default" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Create A Palette
                </Typography>

                <Stack style={{ marginLeft: 'auto' }} direction="row" spacing={2}>

                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Button variant="contained" color="error" >
                            Back
                        </Button>
                    </Link>
                    <PaletteMetaForm isOpen={isModalOpen}
                        setModalOpen={setModalOpen}
                        handleSave={handleSave}
                        paletteName={paletteName}
                        handleNameChange={handleNameChange} />

                    {/* <Button variant="contained" color="primary" onClick={handleSave}>
                        Save Palette 
                </Button>*/}


                </Stack>
            </Toolbar>
        </AppBar>

    </div>)
}

export default NewPaletteFormNav;