import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResgisterComponent({ selectedRole, onFormSwitch }) {
   const [firstName, setfirstName] = useState('');
   const [lastName, setlastName] = useState('');
   const [email, setemail] = useState('');
   const [age, setage] = useState('');
   const [gender, setgender] = useState('');
   const [password, setpassword] = useState('');
   const role_id = selectedRole;

   console.log('Selected Role:', selectedRole);
   console.log('Role id :', role_id);

   const [errorMessage, setErrorMessage] = useState('');
   const [ConfirmMessage, setConfirmMessage] = useState('');
   const navigate = useNavigate();

   const handleRegister = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               firstName,
               lastName,
               email,
               age,
               gender,
               password,
               role_id,
            }),
         });

         if (response.ok) {
            const data = await response.json();
            console.log('Registered successfully!');
            setConfirmMessage('Registered successfully!');
            // Redirect user to another page (e.g., login page)
            setTimeout(() => {
               console.log('Registered successfully!');
               onFormSwitch('login');
            }, 1500); // (1,5 seconds)
         } else {
            console.log('someting went wrong!');
            setErrorMessage('someting went wrong! please try again');

            setErrorMessage('Registration failed. Please check your details.');
         }
      } catch (error) {
         console.error('Error:', error);
         setErrorMessage('An error occurred during registration.');
      }
   };

   return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8 ">
         <div className=" sm:mx-auto sm:w-full sm:max-w-lg ">
            <div className="sm:mx-auto sm:w-auto  text-6xl">
               <h2 className="font-bold tracking-tight text-sky-950">
                  {' '}
                  Register{' '}
               </h2>
            </div>
            <form className="mt-12 space-y-6" onSubmit={handleRegister}>
               <div>
                  <label
                     htmlFor="firstName"
                     className="block text-2xl font-light  leading-6 text-gray-900"
                  >
                     First Name
                  </label>
                  <div className="mt-2 ">
                     <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        onChange={(e) => setfirstName(e.target.value)}
                        className="block w-full rounded-md border-0 py-3 text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-800 sm:text-lg sm:leading-12"
                     />
                  </div>
               </div>
               <div>
                  <label
                     htmlFor="lastName"
                     className="block text-2xl font-light  leading-6 text-gray-900"
                  >
                     Last Name
                  </label>
                  <div className="mt-2 ">
                     <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        onChange={(e) => setlastName(e.target.value)}
                        className="block w-full rounded-md border-0 py-3 text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-800 sm:text-lg sm:leading-12"
                     />
                  </div>
               </div>
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
                        onChange={(e) => setemail(e.target.value)}
                        className="block w-full rounded-md border-0 py-3 text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-800 sm:text-lg sm:leading-12"
                     />
                  </div>
               </div>
               <div>
                  <label
                     htmlFor="Age"
                     className="block text-2xl font-light  leading-6 text-gray-900"
                  >
                     Age
                  </label>
                  <div className="mt-2 ">
                     <input
                        id="age"
                        name="age"
                        type="number"
                        autoComplete="off"
                        required
                        onChange={(e) => setage(e.target.value)}
                        className="block w-full rounded-md border-0 py-3 text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-800 sm:text-lg sm:leading-12"
                     />
                  </div>
               </div>
               <div>
                  <label
                     htmlFor="Gender"
                     className="block text-2xl font-light  leading-6 text-gray-900"
                  >
                     Gender
                  </label>
                  <div className="mt-4 mx-10 flex space-x-4">
                     <label className="flex-grow inline-flex items-center">
                        <input
                           type="radio"
                           name="gender"
                           value="male"
                           onChange={(e) => setgender(e.target.value)}
                           required
                           className="mr-1"
                        />
                        <span className="block text-2xl font-thin  leading-6 text-gray-900">
                           Male
                        </span>
                     </label>

                     <label className="flex-grow inline-flex items-center">
                        <input
                           type="radio"
                           name="gender"
                           value="female"
                           onChange={(e) => setgender(e.target.value)}
                           className="mr-1"
                        />
                        <span className="block text-2xl font-thin  leading-6 text-gray-900">
                           Female
                        </span>
                     </label>

                     <label className="inline-flex items-center">
                        <input
                           type="radio"
                           name="gender"
                           value="other"
                           onChange={(e) => setgender(e.target.value)}
                           className="mr-1"
                        />
                        <span className="block text-2xl font-thin  leading-6 text-gray-900">
                           Other
                        </span>
                     </label>
                  </div>
               </div>
               <div>
                  <label
                     htmlFor="password"
                     className="block text-2xl font-light  leading-6 text-gray-900"
                  >
                     Password
                  </label>

                  <div className="mt-2">
                     <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setpassword(e.target.value)}
                        className="block w-full rounded-md border-0 py-3 text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-800 sm:text-lg sm:leading-12"
                     />
                  </div>
               </div>
               <div>
                  <button
                     type="submit"
                     className="flex w-full justify-center rounded-md bg-sky-800 px-3 py-3 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-sky-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                     Sign Up
                  </button>
               </div>
               {/* Display error message */}
               {errorMessage && (
                  <p className="text-red-500 text-lg">{errorMessage}</p>
               )}
               {/* Display Confirm message */}
               {ConfirmMessage && (
                  <p className="text-green-600 text-lg">{ConfirmMessage}</p>
               )}
            </form>
            <p className="mt-10 text-center text-xl text-gray-500">
               Already have an account?{' '}
               <a
                  href="#"
                  className="font-semibold leading-6 text-sky-800 hover:text-sky-950"
                  onClick={() => onFormSwitch('login')}
               >
                  Login here
               </a>
            </p>
         </div>
      </div>
   );
}

export default ResgisterComponent;
