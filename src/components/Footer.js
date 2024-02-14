import React from 'react';
import logoBlue from '../assets/Benna Logo Blue.svg';
import {
   FaDribbbleSquare,
   FaFacebookSquare,
   FaGithubSquare,
   FaInstagram,
   FaTwitterSquare,
} from 'react-icons/fa';

const Footer = () => {
   return (
      <div className="max-w-[2000px] mx-auto py-16  px-20 grid lg:grid-cols-4 gap-8 text-gray-400 bg-white bottom-0 drop-shadow">
         <div>
            <img className="h-[5vh]" src={logoBlue} alt="benna logo" />
            <p className="py-4">
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id odit
               ullam iste repellat consequatur libero reiciendis, blanditiis
               accusantium.
            </p>
            <div className="flex justify-between md:w-[75%] my-6">
               <FaFacebookSquare size={30} />
               <FaInstagram size={30} />
               <FaTwitterSquare size={30} />
               <FaGithubSquare size={30} />
               <FaDribbbleSquare size={30} />
            </div>
         </div>
         {/* Seperation */}
         <div>
            <h6 className="font-medium text-gray-400">Project</h6>
            <p className="py-4">
               This is a fake project, carried out as part of a summer
               internship within the company Satoripop. It was developed by
               Melek Majdoub and supervised by Rayen Ben Saad.
            </p>
         </div>
         {/* Seperation */}
         <div className="lg:col-span-2 flex justify-between">
            <div>
               <h6 className="font-medium text-gray-400">Company</h6>
               <ul>
                  <li className="py-2 text-sm">About</li>
                  <li className="py-2 text-sm">Blog</li>
                  <li className="py-2 text-sm">Jobs</li>
                  <li className="py-2 text-sm">Press</li>
                  <li className="py-2 text-sm">Careers</li>
               </ul>
            </div>
            <div>
               <h6 className="font-medium text-gray-400">Support</h6>
               <ul>
                  <li className="py-2 text-sm">Pricing</li>
                  <li className="py-2 text-sm">Documentation</li>
                  <li className="py-2 text-sm">Guides</li>
                  <li className="py-2 text-sm">API Status</li>
               </ul>
            </div>
            <div>
               <h6 className="font-medium text-gray-400">Legal</h6>
               <ul>
                  <li className="py-2 text-sm">Claim</li>
                  <li className="py-2 text-sm">Privacy Policy </li>
                  <li className="py-2 text-sm">Terms & Conditions</li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Footer;
