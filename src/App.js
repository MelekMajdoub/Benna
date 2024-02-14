import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Error from './Pages/Error';
import Home from './Pages/Home';
import Unauthorized from './Pages/Unauthorized';
import RequireAuth from './components/RequireAuth';
import AdminDashboard from './Pages/AdminDashboard';

function App() {
   return (
      <Routes>
         {/* public routes */}
         <Route path="/Login" element={<Login />} />

         {/* we want to protect these routes */}
         <Route element={<RequireAuth allowedRoles="3"/>}>
            <Route path="/Admin" element={<AdminDashboard />} />
         </Route>
         <Route element={<RequireAuth allowedRoles={[1, 2, 3]}/>}>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
         </Route>

         {/* catch all */}
         <Route path="/*" element={<Error />} />
         <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
   );
}

export default App;
