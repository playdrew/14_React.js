import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Layout from './layouts/Layout';
import Menu from './pages/Menu';
import About from './pages/About';
import Main from './pages/Main';

// npm install react@18 react-dom@18 -- node-modules 깔기
// npm install react-router-dom@6 -- router 깔기 (다른 페이지 볼 수 있게 해주는 것)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path='main' element={<Main/>}/>
          <Route path='menu' element={<Menu/>}/>
          <Route path='about' element={<About/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
