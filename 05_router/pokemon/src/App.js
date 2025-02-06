import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Section from './components/Section';
import PokemonDetail from './components/PokemonDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="pokemon" element={<Section />} />
          <Route path="pokemon/:id" element={<PokemonDetail />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
