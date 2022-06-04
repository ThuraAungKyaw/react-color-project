import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import './styles/NewPaletteForm.css';
import DraggableColorBox from './DraggableColorBox';


const drawerWidth = 400;
const MAX_PALETTE_SIZE = 20;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        //padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

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

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


function NewPaletteForm({ palettes, savePalette }) {

    const [open, setOpen] = useState(true);
    const [selectedColor, setSelectedColor] = useState("purple");
    const [colors, setColors] = useState([]);
    const [colorName, setColorName] = useState("");
    const [paletteName, setPaletteName] = useState("");
    const navigate = useNavigate();
    const paletteFull = colors.length === MAX_PALETTE_SIZE;

    ValidatorForm.addValidationRule('isNameExisting', (value) => colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase()));
    ValidatorForm.addValidationRule('isPaletteNameExisting', (value) => palettes.every(name => name.toLowerCase() !== value.toLowerCase()));
    ValidatorForm.addValidationRule('isColorExisting', (_) => colors.every(({ color }) => color !== selectedColor));

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handlePickerChange = (pickedColor) => {
        setSelectedColor(pickedColor.hex)
    }

    const handleNameChange = (e) => {
        if (e.target.name === 'paletteName') {
            setPaletteName(e.target.value)
        } else {
            setColorName(e.target.value)
        }

    }

    const addNewColor = () => {
        let newColor = {
            color: selectedColor,
            name: colorName
        }
        // if (colors.indexOf(selectedColor) < 0) {
        setColors([...colors, newColor])
        setColorName("")

        // }
    }

    const handleDelete = (color) => {
        setColors(colors.filter(c => c.color !== color))
    }

    const handleSave = () => {

        let palette = {
            colors: colors,
            paletteName: paletteName,
            id: paletteName.toLowerCase().replace(/ /g, "-")
        }

        savePalette(palette)
        navigate("/")


    }

    return (
        <Box sx={{ display: 'flex' }}>
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
                    <ValidatorForm

                    >
                        <TextValidator
                            label="Palette Name"
                            name="paletteName"
                            onChange={handleNameChange}
                            value={paletteName}
                            validators={['required', 'isPaletteNameExisting']}
                            errorMessages={['this field is required', 'the palette with the same name already exists']}
                        />
                    </ValidatorForm>
                    <Stack style={{ marginLeft: 'auto' }} direction="row" spacing={2}>

                        <Button variant="contained" color="error" >
                            Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save Palette
                        </Button>

                    </Stack>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />

                <div className='form-container'>
                    <Typography variant="h4" component="h4">
                        Design Your Palette
                    </Typography>
                    <Stack direction="row" spacing={2}>

                        <Button variant="contained" color="secondary">
                            CLEAR PALETTE
                        </Button>
                        <Button variant="contained" color="success">
                            RANDOM COLOR
                        </Button>

                    </Stack>
                    <ChromePicker color={selectedColor} onChange={handlePickerChange} />
                    <ValidatorForm
                        onSubmit={addNewColor}
                    //onError={errors => console.log(errors)}
                    >
                        <TextValidator
                            label="Color Name"
                            name="colorName"
                            onChange={handleNameChange}
                            value={colorName}
                            validators={['required', 'isNameExisting', 'isColorExisting']}
                            errorMessages={['this field is required', 'the color with the same name already exists', 'the color already exists']}
                        />
                        <Button type="submit" disabled={paletteFull} variant="contained" style={{ background: selectedColor }}>
                            {paletteFull ? 'PALETTE FULL' : 'ADD COLOR'}
                        </Button>
                    </ValidatorForm>

                </div>


            </Drawer>
            <Main open={open}>
                <DrawerHeader />

                {colors.map(color => <DraggableColorBox key={color.name} deleteColor={handleDelete} color={color.color} name={color.name} />)}

            </Main>
        </Box>
    );
}



export default NewPaletteForm;