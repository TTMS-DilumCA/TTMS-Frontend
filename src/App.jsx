import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/common/Login';
import ProtectedRoute from './ProtectedRoute';
import HomeManager from './pages/manager/HomeManager';
import HomeMO_01 from './pages/machineOperator_01/HomeMO_01';
import HomeMO_02 from './pages/machineOperator_02/HomeMO_02';
import MoldDetails from './pages/manager/MoldDetails';
import ProcessDetails from './pages/manager/ProcessDetails';
import Users from './pages/manager/Users';
import ForgotPassword from './components/common/ForgotPassword';
import ChangePassword from './components/common/ChangePassword';
import VerifyOtp from './components/common/VerifyOtp';
import ResetPassword from './components/common/ResetPassword';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path= '/forgot-password' element ={<ForgotPassword/>}/>
        <Route path= '/change-password' element ={<ChangePassword/>}/>
        <Route path= '/verify-otp' element ={<VerifyOtp/>}/>
        <Route path= '/reset-password' element ={<ResetPassword/>}/>                     

        <Route path='/manager' element={<ProtectedRoute component={HomeManager} role="ROLE_MANAGER" />} />
        <Route path='/operator1' element={<ProtectedRoute component={HomeMO_01} role="ROLE_MACHINE_OPERATOR_01" />} />
        <Route path='/operator2' element={<ProtectedRoute component={HomeMO_02} role="ROLE_MACHINE_OPERATOR_02" />} />
        <Route path='/mold-details' element={<ProtectedRoute component={MoldDetails} role="ROLE_MANAGER" />} />
        <Route path='/process-details' element={<ProtectedRoute component={ProcessDetails} role="ROLE_MANAGER" />} />
        <Route path = 'users' element={<ProtectedRoute component = {Users} role ="ROLE_MANAGER"/> }/>
      </Routes>
    </Router>
  );
}

export default App;