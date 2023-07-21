import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LandingPage from "./pages/LandingPage";
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoute from './pages/ProtectedRoute';

import SharedLayout from './pages/dashboard/SharedLayout';
import AddJob from './pages/dashboard/AddJob';
import AllJobs from './pages/dashboard/AllJobs';
import Profile from './pages/dashboard/Profile';
import Stats from './pages/dashboard/Stats';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><SharedLayout/></ProtectedRoute>} >
          <Route index element={<Stats/>}/>
          <Route path="all-jobs" element={<AllJobs/>}/>
          <Route path="add-job" element={<AddJob/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Route>
        <Route path="landing" element={<LandingPage/>} />
        <Route path="register" element={<RegisterPage/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
      <ToastContainer position="top-center"/>
    </BrowserRouter>
  );
}

export default App;
