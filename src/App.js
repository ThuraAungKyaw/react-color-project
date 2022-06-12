import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import Palette from './Palette';
import Page from './Page';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers'
import "./styles/App.css";


function App() {

  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [currentPalette, setCurrentPalette] = useState(savedPalettes ? savedPalettes[0] || {} : seedColors[0] || {})
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);
  const location = useLocation();


  const savePalette = (palette) => {
    setPalettes([...palettes, palette])
  }

  const deletePalette = (id) => {
    setPalettes(palettes.filter(p => p.id !== id))
  }

  const seedPalettes = () => {
    setPalettes(seedColors)
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
          classNames="page"
          timeout={500}
        >
          <Routes location={location}>
            <Route exact path="/" element={<Page><PaletteList palettes={palettes} deletePalette={deletePalette} /></Page>} />
            <Route exact path="/palette/new" element={<Page><NewPaletteForm savePalette={savePalette} palettes={palettes.map(p => p.paletteName)} /></Page>} />
            <Route exact path="/palette/:id" element={<Page><Palette palette={generatePalette(currentPalette)} changePalette={(id) => {
              const palette = palettes.filter(p => p.id === id)[0]
              setCurrentPalette(palette)
            }} /></Page>} />
            <Route exact path="/palette/:paletteId/:colorId" element={<Page><SingleColorPalette palette={generatePalette(currentPalette)} /></Page>} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>



    </div>
  );
}

export default App;
