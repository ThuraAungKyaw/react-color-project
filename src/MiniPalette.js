import React from "react";
import { withStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const styles = {
  root: {
    backgroundColor: 'white',
    borderRadius: '5px',
    border: '1px solid black',
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer"
    }

  },
  colors: {
    backgroundColor: 'grey'
  },
  title: {
    display: 'flex',
    justifyContent: "space-between",
    alignItems: "center",
    color: "black",
    margin: "0",
    fontSize: '1rem',
    paddingTop: '0.5rem',
    position: "relative"
  },
  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem'
  }
}


function MiniPalette(props) {
  const { classes, id, paletteName, emoji } = props;

  return (
    <>
      <div className={classes.root}>
        <div className={classes.colors}>

        </div>
        <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
        <Link to={`/palette/${id}`}>{paletteName}</Link>
      </div>


    </>

  )
}

export default withStyles(styles)(MiniPalette);

