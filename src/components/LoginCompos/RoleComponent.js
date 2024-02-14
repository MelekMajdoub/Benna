import React from 'react';
import { useState } from 'react';

import { TbChefHat } from 'react-icons/tb';
import { GiMeal } from 'react-icons/gi';

function RoleComponent({selectedRole,handleRoleSelect, onFormSwitch }) {



   return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8 ">
         <div className=" sm:mx-auto sm:w-full sm:max-w-lg ">
            <div className="sm:mx-auto sm:w-auto  text-6xl">
               <h2 className="font-bold tracking-tight text-sky-950">
                  {' '}
                  Register{' '}
               </h2>
            </div>
            <div className="mt-12 space-y-6">
               <div>
                  <label
                     htmlFor="Role"
                     className="block text-2xl font-light  leading-6 text-gray-900"
                  >
                     Please select a role
                  </label>
                  <div className="mt-5 ">
                     <button
                        className="my-5 grid grid-cols-5 border-2 border-gray-300 transition duration-300 ease-in-out group hover:bg-sky-950 hover:text-white"
                        onClick={() => {
                           handleRoleSelect(3); // '3' for admin
                           onFormSwitch('register');
                        }}
                     >
                        <div className="col-span-1 mx-3 py-8 text-sky-950 group-hover:text-white">
                           <TbChefHat size={80} />
                        </div>
                        <div className="col-span-4">
                           <div className="text-left font-bold mt-2 pl-2 text-2xl text-gray-600 group-hover:text-white">
                              Restaurent Owner
                           </div>
                           <p className="pl-2 mt-2 pr-5 text-xl text-gray-500 text-justify group-hover:text-white">
                              Responsible for crafting and maintaining the
                              restaurant's menu, offering a diverse and enticing
                              selection to customers
                           </p>
                        </div>
                     </button>
                     <button
                        className="my-5 grid grid-cols-5 border-2 border-gray-300 transition duration-300 ease-in-out group hover:bg-sky-950 hover:text-white"
                        onClick={() => {
                           handleRoleSelect(1); //'1' for client
                           onFormSwitch('register');
                        }}
                     >
                        <div className="col-span-1 mx-3 py-8 text-sky-950 group-hover:text-white">
                           <GiMeal size={80} />
                        </div>
                        <div className="col-span-4">
                           <div className="text-left font-bold mt-2 pl-2 text-2xl text-gray-600 group-hover:text-white">
                              Client
                           </div>
                           <p className="pl-2 mt-2 pr-5 text-xl text-gray-500 text-justify group-hover:text-white">
                              Explores diverse menus, provides valuable
                              feedback, shaping the restaurant's offerings and
                              reputation.
                           </p>
                        </div>
                     </button>
                  </div>
               </div>
            </div>
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

export default RoleComponent;
