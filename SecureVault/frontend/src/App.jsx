import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Auth from './components/Auth';
import Signup from './components/Signup';
import Welcomepage from './components/Welcomepage';
import Profile from './components/Profile';
import './index.css';
import Dashboard from './components/Dashboard';
import ResetPassword from './components/ResetPassword';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Welcomepage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        

      </Routes>
    </div>
  );
}

export default App;
