import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function ProductCard({ product, setOpenModal, setSelectedProduct }) {
   const [productImage, setProductImage] = useState('');

   useEffect(() => {
      const getSingleProductPhoto = async () => {
         try {
            const { data } = await axios.get(
               `http://localhost:8080/${product.id}`,
            );
            setProductImage(data.image);
         } catch (error) {
            console.error('Error fetching product image:', error);
         }
      };
      getSingleProductPhoto();
   });

   return (
      <div
         class="group relative drop-shadow"
         onClick={() => {
            setOpenModal(true);
            setSelectedProduct(product);
         }}
      >
         <div class=" aspect-h-1 aspect-w-1 h-64 w-64 overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 ">
            <img
               src={`http://localhost:8080/${productImage}`}
               alt={product.name}
               class="object-cover object-center "
            ></img>
         </div>
         <div class="mt-4 flex justify-between">
            <div>
               <h3 class="sm:text-lg text-sm text-gray-700">
                  <a href="#">
                     <span aria-hidden="true" class="absolute inset-0"></span>
                     {product.name}
                  </a>
               </h3>
            </div>
            <p class="sm:text-lg text-sm font-medium text-gray-900">
               {'$'} {product.price}
            </p>
         </div>
      </div>
   );
}

export default ProductCard;
