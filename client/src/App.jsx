import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import DashBoard from './pages/DashBoard.jsx';
import Projects from './pages/Projects.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Header from './components/Header.jsx';
import FooterCom from './components/Footer.jsx';
import PrivateRouter from './components/PrivateRouter.jsx';


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRouter/>}>
          <Route path='/dashboard' element={<DashBoard />} />
        </Route>
        <Route path='/projects' element={<Projects />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  )
}
