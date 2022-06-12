import React from "react";
import { withStyles } from "@mui/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";

const styles = {
  root: {
    backgroundColor: 'white',
    borderRadius: '5px',
    border: '1px solid black',
    padding: "0.5rem",
    position: "relative",
    cursor: "pointer",
    "&:hover svg": {
      opacity: 1
    }

  },
  colors: {
    backgroundColor: '#dae1e4',
    height: "150px",
    width: "100%",
    borderRadius: "5px",
    overflow: "hidden"
  },
  title: {
    display: 'inline-flex',
    paddingBottom: '1rem',
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
  },
  miniColor: {
    height: "20%",
    width: "25%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-3.5px"
  },
  deleteIcon: {
    width: "20px",
    height: "20px",
    backgroundColor: "#eb3d30",
    color: "white",
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
    opacity: 0,

  }
}


function MiniPalette(props) {
  const navigate = useNavigate();
  const { classes, id, paletteName, emoji, colors, openDialog } = props;
  const miniColorBoxes = colors.map(color => {
    return <div className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name} />

  })

  const handleDivClick = () => {
    navigate(`/palette/${id}`)
  }

  const handleDelete = (e) => {
    e.stopPropagation();
    openDialog(id);
  }

  return (
    <>

      <div className={classes.root} onClick={handleDivClick}>

        <DeleteIcon
          className={classes.deleteIcon}
          style={{ transition: "all 0.3s ease-in-out" }}
          onClick={handleDelete}
        />

        <div className={classes.colors}>
          {miniColorBoxes}
        </div>
        <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>

      </div>


    </>

  )
}

export default withStyles(styles)(MiniPalette);

