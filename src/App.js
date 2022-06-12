import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers'
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import "./styles/App.css";

// const AnimatedSwitch = () => {
//   const location = useLocation();

//   console.log("location", location);

// const [transitionName, setTransitionName] = useState("next");

/*
useEffect(() => {
  if (transitionName === "next") setTransitionName("prev");
  if (transitionName === "prev") setTransitionName("next");
}, [location]);
*/

// return (

// );
// };

function App() {

  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [currentPalette, setCurrentPalette] = useState(savedPalettes ? savedPalettes[4] : seedColors[4])
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);
  const location = useLocation();


  const savePalette = (palette) => {
    setPalettes([...palettes, palette])
  }

  const deletePalette = (id) => {
    setPalettes(palettes.filter(p => p.id !== id))
  }

  const syncLocalStorage = useCallback(() => {

    window.localStorage.setItem("palettes", JSON.stringify(palettes))
  }, [palettes])

  useEffect(() => {
    syncLocalStorage();
  }, [syncLocalStorage])




  return (
    <div className="App">
      <TransitionGroup >
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={500}
        >
          <Routes location={location}>
            <Route exact path="/" element={<PaletteList palettes={palettes} deletePalette={deletePalette} />} />
            <Route exact path="/palette/new" element={<NewPaletteForm savePalette={savePalette} palettes={palettes.map(p => p.paletteName)} />} />
            <Route exact path="/palette/:id" element={<Palette palette={generatePalette(currentPalette)} changePalette={(id) => {
              const palette = palettes.filter(p => p.id === id)[0]
              setCurrentPalette(palette)
            }} />} />
            <Route exact path="/palette/:paletteId/:colorId" element={<SingleColorPalette palette={generatePalette(currentPalette)} />} />


          </Routes>
        </CSSTransition>
      </TransitionGroup>



    </div>
  );
}

export default App;
