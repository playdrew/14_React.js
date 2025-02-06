// PS C:\Lecture\14_react\01_lecture-source\05_router\03_params>
//  npx create-react-app 04_etc
// C:\Lecture\14_react\01_lecture-source\05_router\04_etc>
//  npm install react@18 react-dom@18 react-router-dom@6

import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import Menu from './pages/Menu';
import About from './pages/About';
import Error404 from './pages/errors/Error404';
import Mypage from './pages/Mypage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Main/>}/>
        <Route path='main' element={<Main/>}/>
        <Route path='menu' element={<Menu/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='mypage' element={<Mypage/>}/>
      </Route>
      <Route path='*' element={<Error404/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
