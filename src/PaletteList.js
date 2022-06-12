import React from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const styles = {
    root: {
        backgroundColor: 'blue',
        margin: '0 auto 20px auto',
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

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1>React Colors</h1>
                    <Link to="/palette/new" >Create Palette </Link>
                </nav>
                <div className={classes.palettes}>
                    {palettes.map(color => {
                        return <MiniPalette key={color.name} {...color} deletePalette={deletePalette} />
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(PaletteList);