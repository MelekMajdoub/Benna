import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { AiOutlineClose } from 'react-icons/ai';
import { BiSolidSave } from 'react-icons/bi';

function ProductEdit(props) {
   const { id } = props.product; //useParams();
   const [name, setName] = useState('Product name');
   const [productImage, setProductImage] = useState('');
   const [productDescription, setProductDescription] = useState('');
   const [price, setPrice] = useState(0);

   useEffect(() => {
      const getSingleProductData = async () => {
         try {
            const { data } = await axios.get(`http://localhost:8080/${id}`);
            // console.log(data);
            setName(data.name);
            setProductImage(data.image);
            setProductDescription(data.description);
            setPrice(data.price);
         } catch (error) {
            console.error('Error fetching product data:', error);
         }
      };
      getSingleProductData();
   }, [id]);

   // handling Update
   const updateHandler = async (e) => {
      e.preventDefault();
      // update by put request
      const data = {
         id: id,
         name: name,
         price: price,
         productDescription: productDescription,
      };
      const result = await axios.put(`http://localhost:8080/${id}`, data);
      console.log('Product Edited successfully');
      props.setUpdateProduct(data);
      // console.log('Product Seted successfully', price, props.product.price);
   };

   return (
      <div class="relative z-10" role="dialog" aria-modal="true">
         <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>

         <div class="fixed inset-0 z-10  overflow-y-auto">
            <div class=" flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
               <div class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <form
                     onSubmit={updateHandler}
                     class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
                  >
                     <button
                        class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                        onClick={() => {
                           props.setEditable(false);
                        }}
                     >
                        <AiOutlineClose size={20} />
                     </button>

                     <div class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                        <div class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                           <img
                              src={`http://localhost:8080/${productImage}`}
                              alt={name}
                              class="object-cover object-center"
                           />
                        </div>

                        <div class="sm:col-span-8 lg:col-span-7">
                           <section
                              aria-labelledby="information-heading"
                              class=""
                           >
                              <p class="text-md font-medium text-gray-900">
                                 Set Name
                              </p>
                              <input
                                 className="pl-2 block w-full rounded-md border border-gray-200 py-2 text-2xl text-gray-900 sm:pr-12"
                                 value={name}
                                 onChange={(e) => setName(e.target.value)}
                                 type="text"
                              />
                              <p class="mt-6 text-md font-medium text-gray-900">
                                 Set Price
                              </p>
                              <input
                                 className="pl-2 block w-full rounded-md border border-gray-200 py-2 text-2xl text-gray-900 sm:pr-12 "
                                 value={price}
                                 onChange={(e) => setPrice(e.target.value)}
                                 type="text"
                              />
                              <div>
                                 <h1 class="text-md font-medium text-gray-900 mt-6">
                                    Set Description
                                 </h1>
                                 <input
                                    className="pl-2 block w-full rounded-md border border-gray-200 py-2 text-2xl text-gray-900 sm:pr-12 "
                                    value={productDescription}
                                    onChange={(e) =>
                                       setProductDescription(e.target.value)
                                    }
                                    type="text"
                                 />
                              </div>
                           </section>

                           <button
                              type="submit"
                              variant="primary"
                              onClick={() => {
                                 // setEditable(false);
                              }}
                              class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-800 px-8 py-3 text-base font-medium text-white hover:bg-sky-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                           >
                              <BiSolidSave />
                              <div className="pl-3 sm:text-lg">Save</div>
                           </button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductEdit;
