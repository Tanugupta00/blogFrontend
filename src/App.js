import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import RegisterPage from './authentication/register';
import LoginPage from './authentication/login';
import Sidebar from './common/sidebar';
import Blogs from './blogs/blogs';
import Blog from './pages/blog';
import PrivateRoutes from './utils/privateroutes';
import Toastify from './common/toastify';

function Layout() {
  const location = useLocation();
  const hideSidebarRoutes = ["/login", "/register", "/"];

  return (
    <>
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/addpost" exact element={<Blog />} />
        </Route>
        <Route path="/" exact element={<Blogs />} />
        <Route path="/register" exact element={<RegisterPage />} />
        <Route path="/login" exact element={<LoginPage />} />
      </Routes>
      <Toastify/>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
