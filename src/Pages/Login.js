import React from 'react';
import { useState } from 'react';

import LoginComponent from '../components/LoginCompos/LoginComponent';
import ResgisterComponent from '../components/LoginCompos/RegisterComponent';
import RoleComponent from '../components/LoginCompos/RoleComponent';

import loginImg from '../assets/login_bacjround_img.jpg';
import logo from '../assets/Benna Logo blanc.svg';

function Login() {
   const [currentForm, setCurrentForm] = useState('login');

   const [selectedRole, setSelectedRole] = useState(1);
    
   const handleRoleSelect = (role) => {
      setSelectedRole(role);
      //console.log('Selected Role:', selectedRole);
      
   };

   const toggleForm = (formName) => {
      setCurrentForm(formName);
   };

   return (
      <div className=" grid grid-cols-1  sm:grid-cols-3 h-screen w-full">
         {/* Left */}
         <div className="col-span-2 relative invisible sm:visible">
            <div class="absolute inset-0 bg-sky-950 opacity-70 "></div>
            <img
               className="w-full h-full object-cover "
               src={loginImg}
               alt="backround"
            />
            <div class="absolute inset-0 flex items-center justify-center">
               <img className="h-[20vh]" src={logo} alt="benna logo" />
            </div>
         </div>
         {/* right */}
         {currentForm === 'login' ? (
            <LoginComponent onFormSwitch={toggleForm} />
         ) : currentForm === 'role' ? (
            <RoleComponent selectedRole={selectedRole} handleRoleSelect={handleRoleSelect} onFormSwitch={toggleForm} />
         ) : (
            <ResgisterComponent selectedRole={selectedRole} onFormSwitch={toggleForm} />
         )}
      </div>
   );
}

export default Login;
