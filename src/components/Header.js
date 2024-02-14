import React from 'react';
import logoBlue from '../assets/Benna Logo Blue.svg';
import logoBlanc from '../assets/Benna Logo blanc.svg';
import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BiSolidLogOut } from 'react-icons/bi';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
   const [nav, setNav] = useState(false);

   const handleNav = () => {
      setNav(!nav);
   };
   const { auth } = useAuth();
   const navigate = useNavigate();

   const navigateToHome = () => {
      navigate('/Home');
   };

   const navigateToAdminDashboard = () => {
      navigate('/Admin');
   };

   const handleLogout = async () => {
      try {
         const response = await fetch('http://localhost:8080/signout', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         if (response.ok) {
            console.log('Loged out!');
         }
         navigate('/Login');
      } catch (error) {
         console.error('Error logging out:', error);
      }
   };

   return (
      <div className="flex justify-between items-center h-24 max-w-[2000px] mx-auto px-20  bg-white font-sans drop-shadow">
         {/* Logo */}
         <div class=" ">
            <img className="h-[6vh]" src={logoBlue} alt="benna logo" />
         </div>
         {/* Links */}
         <ul className="text-black text-xl invisible md:visible md:flex ">
            <li
               className="p-4 hover:font-bold cursor-pointer"
               onClick={navigateToHome}
            >
               Home
            </li>
            <li className="p-4">Company</li>
            <li className="p-4">About</li>
            <li className="p-4">Contact</li>
            {auth?.role_id === 3 && (
               <li
                  className="p-4 hover:font-bold cursor-pointer"
                  onClick={navigateToAdminDashboard}
               >
                  Admin Dashboard
               </li>
            )}
         </ul>
         {/* Log out */}
         <button
            onClick={handleLogout}
            class="invisible md:visible flex rounded-md bg-sky-800 px-3.5 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-sky-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-950"
         >
            <BiSolidLogOut size={25} />
            <div>Log out</div>
         </button>
         <div onClick={handleNav} className="block md:hidden">
            {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
         </div>
         <ul
            className={
               nav
                  ? 'fixed left-0 top-0 w-[60%] h-full bg-sky-800 ease-in-out duration-500 text-white'
                  : 'ease-in-out duration-500 fixed left-[-100%]'
            }
         >
            <img className="w-[12rem] py-5" src={logoBlanc} alt="benna logo" />
            <li className="pl-8 p-5">Home</li>
            <li className="pl-8 p-5">Resources</li>
            <li className="pl-8 p-5">About</li>
            <li className="pl-8 p-5">Contact</li>
            {auth?.role_id === 3 && (
               <li className="pl-8 p-5">Admin Dashboard</li>
            )}
            <button
               onClick={handleLogout}
               class="flex pl-8 p-5 bg-sky-800  text-xl  text-white shadow-sm"
            >
               <BiSolidLogOut size={25} />
               <div>Log out</div>
            </button>
         </ul>
      </div>
   );
};

export default Header;
