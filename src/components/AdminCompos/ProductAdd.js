import React from 'react';
import { useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import { BsFillCloudArrowUpFill } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';

function ProductAdd(props) {
   const [name, setName] = useState('');
   const [image, setImage] = useState('');
   const [description, setDescription] = useState('');
   const [price, setPrice] = useState(0);
   // console.log(price);

   /*const addProductHandler = async (e) => {
      e.preventDefault();

      // const data = {
      //     name: name,
      //     price: price,
      //     description: description,
      // }

      const formData = new FormData();

      formData.append('image', image);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);

      await axios.post('http://localhost:8080/addProduct', formData);
   };*/
   const addProductHandler = async (e) => {
      e.preventDefault();
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      formData.append('description', description);
      formData.append('price', price);

      try {
         const response = await fetch('http://localhost:8080/addProduct', {
            method: 'POST',
            body: formData,
         });

         if (response.ok) {
            const data = await response.json();
            props.setNewProduct(data);
            
            console.log('Product added successfully!');
         } else {
            console.log('someting went wrong!');
         }
      } catch (error) {
         console.error('Error:', error);
      }
   };

   return (
      <div class="relative z-10" role="dialog" aria-modal="true">
         <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>

         <div class="fixed inset-0 z-10  overflow-y-auto">
            <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
               <div class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                     <button
                        class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                        onClick={() => {
                           props.setOpenModalAdd(false);
                        }}
                     >
                        <AiOutlineClose size={20} />
                     </button>

                     <form
                        onSubmit={addProductHandler}
                        /*method="POST"
                        encType="multipart/form-data"*/
                        class=" grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8"
                     >
                        <div class="h-full p-4 flex items-center rounded-lg gap-2 bg-gray-100 cursor-pointer hover:bg-gray-200 sm:col-span-4 lg:col-span-5">
                           <div className="text-sky-800 mx-auto flex flex-col items-center">
                              <BsFillCloudArrowUpFill size={50} />
                              <span>Choose image file to upload</span>
                              <input
                                 id="image"
                                 name="image"
                                 type="file"
                                 required
                                 onChange={(e) => setImage(e.target.files[0])}
                                 size="lg"
                                 className="text-gray-100 hover:bg-gray-200"
                              />
                           </div>
                        </div>
                        <div class="sm:col-span-8 lg:col-span-7">
                           <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">
                              Add a new meal
                           </h2>
                           <div className="mt-12 space-y-6">
                              <div>
                                 <label
                                    htmlFor="name"
                                    className="block text-xl font-light  leading-6 text-gray-900"
                                 >
                                    Meal Name
                                 </label>
                                 <div className="mt-1 ">
                                    <input
                                       id="name"
                                       name="name"
                                       type="text"
                                       autoComplete="given-name"
                                       required
                                       onChange={(e) => setName(e.target.value)}
                                       className="pl-2 block w-full rounded-md border-0 py-3 text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-800 sm:text-lg sm:leading-12"
                                    />
                                 </div>
                              </div>

                              <div>
                                 <label
                                    htmlFor="Age"
                                    className="block text-xl font-light  leading-6 text-gray-900"
                                 >
                                    Price
                                 </label>
                                 <div className="mt-1 ">
                                    <input
                                       id="price"
                                       name="price"
                                       type="text"
                                       autoComplete="off"
                                       required
                                       onChange={(e) => setPrice(e.target.value)}
                                       className="pl-2 block w-full rounded-md border-0 py-3 text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-800 sm:text-lg sm:leading-12"
                                    />
                                 </div>
                              </div>
                              <div>
                                 <label
                                    htmlFor="Description"
                                    className="block text-xl font-light  leading-6 text-gray-900"
                                 >
                                    Description
                                 </label>
                                 <div className="mt-2 ">
                                    <input
                                       id="description"
                                       name="description"
                                       type="text"
                                       autoComplete="off"
                                       required
                                       onChange={(e) =>
                                          setDescription(e.target.value)
                                       }
                                       className="pl-2 block w-full rounded-md border-0 py-3 text-sky-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-800 sm:text-lg sm:leading-12"
                                    />
                                 </div>
                              </div>

                              <button
                                 type="submit"
                                 class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-800 px-8 py-3 text-base font-medium text-white hover:bg-sky-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                 <IoMdAdd size={30} />
                                 <div className="pl-3 sm:text-lg">
                                    Add Product
                                 </div>
                              </button>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductAdd;
