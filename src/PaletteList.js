import React, { useState } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors";

const styles = {
    "@global": {
        ".fade-exit": {
            opacity: 1,
        },
        ".fade-exit-active": {
            opacity: 0,
            transition: "opacity 500ms ease-out"
        }
    },
    root: {
        display: 'flex',
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        "@media (max-width: 575.98px)": {
            width: '60%'
        },
        "@media (min-width: 575.98px) and (max-width: 991.98px)": {
            width: '80%'
        }
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: 'white',
        alignItems: 'center',
        "& a": {
            color: 'white'
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "1.5rem",
        "@media (max-width: 575.98px)": {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "1rem"
        },
        "@media (min-width: 575.98px) and (max-width: 991.98px)": {
            gridTemplateColumns: "repeat(2, 50%)"
        }
    }
}

function PaletteList({ palettes, classes, deletePalette }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [currentPaletteId, setCurrentPalette] = useState(null)

    const openDeleteDialog = (id) => {
        setDeleteDialogOpen(true)
        setCurrentPalette(id)
    }

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false)
        setCurrentPalette(null)
    }

    const handleDelete = () => {
        deletePalette(currentPaletteId)
        setDeleteDialogOpen(false)
    }
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1>React Colors</h1>
                    <Link to="/palette/new" >Create Palette </Link>
                </nav>

                <TransitionGroup className={classes.palettes}>
                    {palettes.map(color =>
                        <CSSTransition key={color.id} classNames="fade" timeout={500}>
                            <MiniPalette key={color.name} {...color} openDialog={openDeleteDialog} />
                        </CSSTransition>

                    )
                    }
                </TransitionGroup>

            </div>
            <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog} aria-labelledby="delete-palette-dialog">
                <DialogTitle id="delete-palette-dialog">Delete This Palette?</DialogTitle>

                <DialogContent>
                    <List>
                        <ListItem button onClick={handleDelete}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                                    <Check />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete" />
                        </ListItem>
                        <ListItem button onClick={closeDeleteDialog}>
                            <ListItemAvatar>
                                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                    <Close />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel" />
                        </ListItem>
                    </List>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default withStyles(styles)(PaletteList);