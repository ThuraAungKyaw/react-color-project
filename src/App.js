import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers'
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';


function App() {
  const [currentPalette, setCurrentPalette] = useState(seedColors[4])
  const [palettes, setPalettes] = useState(seedColors);

  const savePalette = (palette) => {
    setPalettes([...palettes, palette])
  }


  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<PaletteList palettes={palettes} />} />
        <Route exact path="/palette/new" element={<NewPaletteForm savePalette={savePalette} palettes={palettes.map(p => p.paletteName)} />} />
        <Route exact path="/palette/:id" element={<Palette palette={generatePalette(currentPalette)} changePalette={(id) => {
          const palette = palettes.filter(p => p.id === id)[0]
          setCurrentPalette(palette)
        }} />} />
        <Route exact path="/palette/:paletteId/:colorId" element={<SingleColorPalette palette={generatePalette(currentPalette)} />} />


      </Routes>
    </div>
  );
}

export default App;
