import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import ProductCard from '../components/AdminCompos/ProductCard';
import ProductDetails from '../components/AdminCompos/ProductDetails';
import ProductEdit from '../components/AdminCompos/ProductEdit';
import ProductAdd from '../components/AdminCompos/ProductAdd';

import { IoMdAdd } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';

function AdminDashboard() {
   const [products, setProducts] = useState([]);
   const [selectedProduct, setSelectedProduct] = useState(null);

   const [modalOpen, setModalOpen] = useState(false);
   const [modalOpenAdd, setModalOpenAdd] = useState(false);

   const [editable, setEditable] = useState(false);
   console.log(editable);

   useEffect(() => {
      const getProductsData = async () => {
         try {
            const { data } = await axios.get(
               'http://localhost:8080/allProducts',
            );
            console.log(data);
            setProducts(data);
         } catch (error) {
            // Handle errors here
            console.error('Error fetching data:', error);
         }
      };

      // Call the initial data fetch when the component mounts
      getProductsData();

      // Include dependencies that may trigger a re-fetch, e.g., if modalOpen changes
   }, []);

   const setNewProduct = (data) => {
      setProducts([...products, data]);
   };

   const setDeletedProduct = (selectedProduct) => {
      // Create a new array that excludes the product to be deleted
      const updatedProducts = products.filter(
         (product) => product.id !== selectedProduct.id,
      );

      // Update the state with the new array
      setProducts(updatedProducts);
   };

   const setUpdateProduct = (selectedProduct) => {
      const updatedProducts = products.map((product) => {
         if (product.id === selectedProduct.id) {
            // Replace the product with the updated one
            return selectedProduct;
         } else {
            return product;
         }
      });
      // Update the state with the new array
      setProducts(updatedProducts);
   };

   return (
      <div>
         <Header />
         <div className="h-full px-20 py-24 bg-zinc-50  flex flex-col">
            <h2 className="text-center pb-4 font-bold text-5xl text-sky-950">
               Admin Dashboard
            </h2>
            <p className=" text-center text-2xl text-gray-500">
               Manage your meals, maintain your restaurant's menu
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

                  <button
                     onClick={() => {
                        setModalOpenAdd(true);
                     }}
                     class="py-2 absolute inset-y-0 right-0 h-full flex flex-row px-4 bg-sky-800  text-xl  text-white shadow-sm hover:bg-sky-950 rounded-md"
                  >
                     <IoMdAdd size={25} />
                     <div className="pl-3 sm:text-lg">Add Meal</div>
                  </button>
                  {modalOpenAdd && (
                     <ProductAdd
                        setOpenModalAdd={setModalOpenAdd}
                        setNewProduct={setNewProduct}
                     />
                  )}
               </div>
               {/* Items */}

               <div class="mt-20 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 drop-shadow">
                  {products.map((product) => {
                     return (
                        <div key={product.id}>
                           <ProductCard
                              key={product.id}
                              product={product}
                              setOpenModal={setModalOpen}
                              setSelectedProduct={setSelectedProduct}
                           />
                           {modalOpen && (
                              <ProductDetails
                                 product={selectedProduct}
                                 setOpenModal={setModalOpen}
                                 setEditable={setEditable}
                                 setDeletedProduct={setDeletedProduct}
                              />
                           )}
                           {editable && (
                              <ProductEdit
                                 product={selectedProduct}
                                 setEditable={setEditable}
                                 setUpdateProduct={setUpdateProduct}
                              />
                           )}
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>

         <Footer />
      </div>
   );
}

export default AdminDashboard;
