import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers'
import PaletteList from './PaletteList';

function App() {
  const [currentPalette, setCurrentPalette] = useState(seedColors[4])


  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<PaletteList palettes={seedColors} />} />
        <Route exact path="/palette/:id" element={<Palette palette={generatePalette(currentPalette)} changePalette={(id) => {
          const palette = seedColors.filter(p => p.id === id)[0]

          setCurrentPalette(palette)
        }} />} />
      </Routes>
    </div>
  );
}

export default App;
