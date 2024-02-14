import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../components/Header';
import Footer from '../components/Footer';

import ProductCard from '../components/AdminCompos/ProductCard';
import ProductClientDetails from '../components/ClientCompos/ProductClientDetails';
import ProductDetails from '../components/AdminCompos/ProductDetails';

import { IoMdAdd } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';

function Home() {
   const [products, setProducts] = useState([]);
   const [selectedProduct, setSelectedProduct] = useState(null);

   const [users, setUsers] = useState([]);
   const [selectedUser, setSelectedUser] = useState(null);

   const [usersWithProducts, setUsersWithProducts] = useState({});

   const [modalOpen, setModalOpen] = useState(false);
   const [modalOpenAdd, setModalOpenAdd] = useState(false);

   // console.log(editable);

   useEffect(() => {
      // Fetch all products
      axios
         .get('http://localhost:8080/allProducts')
         .then((response) => {
            const allProducts = response.data;

            // Organize products by user ID
            const productsByUserId = allProducts.reduce((acc, product) => {
               const userId = product.user_id;
               if (!acc[userId]) {
                  acc[userId] = [];
               }
               acc[userId].push(product);
               return acc;
            }, {});

            setProducts(productsByUserId);
         })
         .catch((error) => {
            console.error('Error fetching products:', error);
         });
   }, []);

   useEffect(() => {
      // Fetch all users
      axios
         .get('http://localhost:8080/allUsers')
         .then((response) => {
            const allUsers = response.data;
            setUsers(allUsers);
         })
         .catch((error) => {
            console.error('Error fetching users:', error);
         });
   }, []);

   return (
      <div>
         <Header />
         <div className="h-full px-20 py-24 bg-zinc-50  flex flex-col">
            <h2 className="text-center pb-4 font-bold text-5xl text-sky-950">
               Home
            </h2>
            <p className=" text-center text-2xl text-gray-500">
               Explores diverse menus, provides valuable feedback
            </p>
            <div class=" mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
               {/* Search Bar */}
               <div class=" relative shadow-sm">
                  <div class=" pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                     <span class="text-gray-500 sm:text-sm">
                        <AiOutlineSearch size={25} />
                     </span>
                  </div>
                  <input
                     type="text"
                     name="search"
                     id="search"
                     class="block w-full rounded-md border-0 py-3 pl-11 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6"
                     placeholder="search for a meal"
                  ></input>
               </div>
               {/* Items */}

               <div className="mt-20">
                  {Object.keys(products).map((userId) => (
                     <div key={userId}>
                        <h2 className="pb-2 text-2xl font-bold text-sky-950">
                           {
                              users.find((user) => user.id === parseInt(userId))
                                 ?.firstName
                           }
                        </h2>
                        <div className="pb-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 drop-shadow">
                           {products[userId].map((product) => (
                              <div key={product.id}>
                                 <ProductCard
                                    product={product}
                                    setOpenModal={setModalOpen}
                                    setSelectedProduct={setSelectedProduct}
                                 />
                              </div>
                           ))}
                        </div>
                     </div>
                  ))}
                  {modalOpen && (
                     <ProductClientDetails
                        product={selectedProduct}
                        setOpenModal={setModalOpen}
                     />
                  )}
               </div>
            </div>
         </div>

         <Footer />
      </div>
   );
}

export default Home;
