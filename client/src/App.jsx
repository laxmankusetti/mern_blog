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
import AdminOnlyPrivateRoute from './components/AdminOnlyPrivateRoute.jsx';
import CreatePost from './pages/CreatePost.jsx';
import UpdatePost from './pages/UpdatePost.jsx';
import PostPage from './pages/PostPage.jsx';
import ScrollTopTop from './components/ScrollToTop.jsx';
import Search from './pages/Search.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTopTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRouter/>}>
          <Route path='/dashboard' element={<DashBoard />} />
        </Route>
        <Route element={<AdminOnlyPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/projects' element={<Projects />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/search' element={<Search />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  )
}
