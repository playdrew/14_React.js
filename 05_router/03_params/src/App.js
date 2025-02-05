//PS C:\Lecture\14_react\01_lecture-source\05_router\03_params> npx create-react-app ./
//PS C:\Lecture\14_react\01_lecture-source\05_router\03_params> npm install react@18 react-router-dom@6 react-dom@18
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Layout from './layouts/Layout';
import Menu from './pages/Menu';
import About from './pages/About';
import Main from './pages/Main';
import MenuDetails from './pages/MenuDetail';
import MenuSearchResult from './pages/MenuSearchResult'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path='/main' element={<Main/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/menu'>
            <Route index element={<Menu/>}/>
            <Route path=":menuCode" element={<MenuDetails/>}/>
            <Route path="search" element={<MenuSearchResult/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;