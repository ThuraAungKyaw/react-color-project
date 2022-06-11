import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { arrayMoveImmutable as arrayMove } from 'array-move';
import { getRandomColor } from './utils/helpers';

import DraggableColorList from './DraggableColorList';
import NewPaletteFormNav from './NewPaletteFormNav';

import './styles/NewPaletteForm.css';
import ColorPickerForm from './ColorPickerForm';

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
    const [colors, setColors] = useState([]);
    const [paletteName, setPaletteName] = useState("");
    const [selectedColor, setSelectedColor] = useState("purple");
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

    const addNewColor = async (color, name) => {

        let newColor = {
            color: color,
            name: name
        }
        // if (colors.indexOf(selectedColor) < 0) {
        await setColors([...colors, newColor])
        setSelectedColor("")


        // }
    }



    const handleDelete = (color) => {
        setColors(colors.filter(c => c.color !== color))
    }

    const handleSave = () => {
        console.log(`handleSaveClicked`)
        let palette = {
            colors: colors,
            paletteName: paletteName,
            id: paletteName.toLowerCase().replace(/ /g, "-")
        }

        savePalette(palette)
        navigate("/")


    }

    const onSortEnd = ({ oldIndex, newIndex }) => {
        let newList = arrayMove(colors, oldIndex, newIndex);
        console.log(newList)
        setColors(newList)
    };

    const clearColors = () => {
        setColors([])
    }

    const generateRandomColor = () => {
        setSelectedColor(getRandomColor())
    }

    const handleNameChange = (e) => {

        setPaletteName(e.target.value)


    }

    return (
        <Box sx={{ display: 'flex' }}>
            <NewPaletteFormNav open={open}
                handleDrawerOpen={handleDrawerOpen}
                handleNameChange={handleNameChange}
                handleSave={handleSave}
                paletteName={paletteName} />
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
                    <Stack className="btn-stack" direction="row" spacing={2}>

                        <Button className="stack-btn" variant="contained" color="secondary" onClick={clearColors}>
                            CLEAR COLORS
                        </Button>
                        <Button className="stack-btn" variant="contained" color="success" onClick={generateRandomColor}>
                            RANDOM COLOR
                        </Button>

                    </Stack>
                    <ColorPickerForm
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                        paletteFull={paletteFull}
                        addNewColor={addNewColor}
                    />

                </div>


            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <DraggableColorList distance={1} colors={colors} removeColor={handleDelete} axis="xy" onSortEnd={onSortEnd} />
            </Main>
        </Box>
    );
}



export default NewPaletteForm;