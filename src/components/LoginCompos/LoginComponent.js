import React from 'react';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function LoginComponent({ onFormSwitch }) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [errorMessage, setErrorMessage] = useState('');

   const navigate = useNavigate();

   const { setAuth } = useAuth();
   const location = useLocation();
   const from = location.state?.from?.pathname ;

   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch('http://localhost:8080/signin', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
         });

         if (response.ok) {
            console.log('OKKKK');
            const data = await response.json();
            // Store user data (e.g., token) in state or local storage
            console.log('===> data', data);
            localStorage.setItem('access-token', data.token);
            //message de confirmatoin
            console.log('Loged!');
            console.log('======>from', from);
            // Redirect user to another page (e.g., dashboard)
            navigate(from, { replace: true });
            //navigate('/Home');
            const token = localStorage.getItem('access-token');
            const decoded = jwtDecode(token);
            //console.log('token decoded:', decoded);
            setAuth(decoded.dataValues);
         } else {
            console.log('Invalid email or password');
            setErrorMessage('Invalid email or password');
         }
      } catch (error) {
         console.error('Error:', error);
      }
   };

   return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8 ">
         <div className=" sm:mx-auto sm:w-full sm:max-w-lg ">
            <div className="sm:mx-auto sm:w-auto  text-6xl">
               <h2 className="font-bold tracking-tight text-sky-950">
                  {' '}
                  Sign in{' '}
               </h2>
            </div>
            <form className="mt-12 space-y-12" onSubmit={handleLogin}>
               <div>
                  <label
                     htmlFor="email"
                     className="block text-2xl font-light  leading-6 text-gray-900"
                  >
                     Email address
                  </label>
                  <div className="mt-2 ">
                     <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md border-0 py-3 text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-800 sm:text-lg sm:leading-12"
                     />
                  </div>
               </div>
               <div>
                  <div className="flex items-center justify-between ">
                     <label
                        htmlFor="password"
                        className="block text-2xl font-light  leading-6 text-gray-900"
                     >
                        Password
                     </label>
                     <div className="text-base">
                        <a
                           href="#"
                           className="font-semibold text-sky-800 hover:text-sky-950"
                        >
                           Forgot password?
                        </a>
                     </div>
                  </div>
                  <div className="mt-2">
                     <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-md border-0 py-3 text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-800 sm:text-lg sm:leading-12"
                     />
                  </div>
               </div>
               <div>
                  <button
                     type="submit"
                     className="flex w-full justify-center rounded-md bg-sky-800 px-3 py-3 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-sky-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                     Sign in
                  </button>
               </div>
               {/* Display error message */}
               {errorMessage && (
                  <p className="text-red-500 text-lg">{errorMessage}</p>
               )}
            </form>
            <p className="mt-10 text-center text-xl text-gray-500">
               Not a member?{' '}
               <a
                  href="#"
                  className="font-semibold leading-6 text-sky-800 hover:text-sky-950"
                  onClick={() => onFormSwitch('role')}
               >
                  Register
               </a>
            </p>
         </div>
      </div>
   );
}

export default LoginComponent;
