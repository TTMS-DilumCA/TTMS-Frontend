import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/common/Login';
import ProtectedRoute from './ProtectedRoute';
import HomeManager from './pages/manager/HomeManager';
import HomeMO_01 from './pages/machineOperator_01/HomeMO_01';
import HomeMO_02 from './pages/machineOperator_02/HomeMO_02';
import MoldDetails from './pages/manager/MoldDetails';
import Users from './pages/manager/Users';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/manager' element={<ProtectedRoute component={HomeManager} role="ROLE_MANAGER" />} />
        <Route path='/operator1' element={<ProtectedRoute component={HomeMO_01} role="ROLE_MACHINE_OPERATOR_01" />} />
        <Route path='/operator2' element={<ProtectedRoute component={HomeMO_02} role="ROLE_MACHINE_OPERATOR_02" />} />
        <Route path='/mold-details' element={<ProtectedRoute component={MoldDetails} role="ROLE_MANAGER" />} />
        <Route path = 'users' element={<ProtectedRoute component = {Users} role ="ROLE_MANAGER"/> }/>
      </Routes>
    </Router>
  );
}

export default App;