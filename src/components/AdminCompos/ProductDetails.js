import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { MdModeEditOutline } from 'react-icons/md';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai';

function ProductDetails(props) {
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

   // handling Delete
   const handleDelete = async (id) => {
      await axios.delete(`http://localhost:8080/${id}`);
      props.setOpenModal(false);
      props.setDeletedProduct(props.product);
   };

   return (
      <div class="relative z-10" role="dialog" aria-modal="true">
         <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"></div>

         <div class="fixed inset-0 z-10  overflow-y-auto">
            <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
               <div class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div class=" relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                     <button
                        class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                        onClick={() => {
                           props.setOpenModal(false);
                        }}
                     >
                        <AiOutlineClose size={20} />
                     </button>

                     <div class=" grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                        <div class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                           <img
                              src={`http://localhost:8080/${productImage}`}
                              alt={name}
                              class="object-cover object-center"
                           />
                        </div>
                        <div class="sm:col-span-8 lg:col-span-7">
                           <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">
                              {name}
                           </h2>

                           <section
                              aria-labelledby="information-heading"
                              class="mt-2"
                           >
                              <p class="text-2xl text-gray-900">
                                 {'$'} {price}
                              </p>
                           </section>

                           <section
                              aria-labelledby="options-heading"
                              class="mt-10"
                           >
                              <div>
                                 <h1 class="text-md font-medium text-gray-900">
                                    Description
                                 </h1>
                                 <h4 class="text-gray-500">
                                    {productDescription}
                                 </h4>
                              </div>

                              <button
                                 type="submit"
                                 class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-800 px-8 py-3 text-base font-medium text-white hover:bg-sky-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                 <MdModeEditOutline />
                                 <div
                                    onClick={() => {
                                       props.setOpenModal(false);
                                       props.setEditable(true);
                                    }}
                                    className="pl-3 sm:text-lg"
                                 >
                                    Edit
                                 </div>
                              </button>

                              <button
                                 type="submit"
                                 onClick={() => {
                                    handleDelete(props.product.id);
                                 }}
                                 class="mt-6 flex w-full items-center justify-center rounded-md border border-gray-400  bg-white px-8 py-3 text-base font-medium text-gray-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                 <AiFillDelete />
                                 <div className="pl-3 sm:text-lg">Delete</div>
                              </button>
                           </section>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductDetails;
