import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSolidUserCircle } from 'react-icons/bi';
import { BsSendFill } from 'react-icons/bs';

import AddReviews from '../ClientCompos/AddReviews';

function ProductClientDetails({ product, setOpenModal, setEditable }) {
   const { id } = product; //useParams();
   const [name, setName] = useState('Product name');
   const [productImage, setProductImage] = useState('');
   const [productDescription, setProductDescription] = useState('');
   const [price, setPrice] = useState(0);
   const [reviews, setReviews] = useState([]); // Store reviews
   const [rates, setRates] = useState([]); // Store Ratings
   const [averageRating, setAverageRating] = useState(0);
   const [reviewCount, setReviewCount] = useState(0);
   const [reviwer, setReviwer] = useState(false);
   const [reviewInput, setReviewInput] = useState('');

   const handleInputChange = (event) => {
      setReviewInput(event.target.value);
   };

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
      const getReviews = async () => {
         try {
            // Fetch reviews for the product
            const response = await axios.get(
               `http://localhost:8080/getProductReviews/${id}`,
            );
            const reviewDescription = response.data.map(
               (review) => review.description,
            );
            const reviewRate = response.data.map((review) => review.rating);
            setReviews(reviewDescription);
            setRates(reviewRate);
            // console.log('===>response:', response);
            // console.log('===>reviewDescription:', reviewDescription);
            // console.log('===>rating:', reviewRate);
         } catch (error) {
            console.error('Error fetching reviews:', error);
         }
      };
      getSingleProductData();
      getReviews();
   }, [id]);

   useEffect(() => {
      // This code will run whenever averageRating or reviewCount changes
      const getProductData = async () => {
         try {
            const reviewStatistics = await axios.get(
               `http://localhost:8080/getProductReviewStatistics/${id}`,
            );

            setAverageRating(reviewStatistics.data.averageRating);
            setReviewCount(reviewStatistics.data.reviewCount);
            console.log('===>averageRating:', averageRating);
            console.log('===>reviewCount:', reviewCount);
         } catch (error) {
            console.error('Error fetching review statistics:', error);
         }
      };
      getProductData();
   }, [averageRating, reviewCount]);

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
                           setOpenModal(false);
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
                              class=" mt-2"
                           >
                              <p class="text-2xl text-gray-900">
                                 {'$'} {price}
                              </p>
                           </section>

                           <div class="mt-6 ">
                              <h4 class="sr-only">Reviews</h4>
                              <div class="flex items-center">
                                 <div class="flex items-center">
                                    <svg
                                       class="text-sky-800 h-5 w-5 flex-shrink-0"
                                       viewBox="0 0 20 20"
                                       fill="currentColor"
                                       aria-hidden="true"
                                    >
                                       <path
                                          fill-rule="evenodd"
                                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                          clip-rule="evenodd"
                                       />
                                    </svg>
                                    <svg
                                       class="text-sky-800 h-5 w-5 flex-shrink-0"
                                       viewBox="0 0 20 20"
                                       fill="currentColor"
                                       aria-hidden="true"
                                    >
                                       <path
                                          fill-rule="evenodd"
                                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                          clip-rule="evenodd"
                                       />
                                    </svg>
                                    <svg
                                       class="text-sky-800 h-5 w-5 flex-shrink-0"
                                       viewBox="0 0 20 20"
                                       fill="currentColor"
                                       aria-hidden="true"
                                    >
                                       <path
                                          fill-rule="evenodd"
                                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                          clip-rule="evenodd"
                                       />
                                    </svg>
                                    <svg
                                       class="text-sky-800 h-5 w-5 flex-shrink-0"
                                       viewBox="0 0 20 20"
                                       fill="currentColor"
                                       aria-hidden="true"
                                    >
                                       <path
                                          fill-rule="evenodd"
                                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                          clip-rule="evenodd"
                                       />
                                    </svg>
                                    <svg
                                       class="text-gray-200 h-5 w-5 flex-shrink-0"
                                       viewBox="0 0 20 20"
                                       fill="currentColor"
                                       aria-hidden="true"
                                    >
                                       <path
                                          fill-rule="evenodd"
                                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                          clip-rule="evenodd"
                                       />
                                    </svg>
                                 </div>
                                 <p class="sr-only">3.9 out of 5 stars</p>
                                 <a className="pl-3 text-2xl font-bold text-gray-900">
                                    {averageRating.toFixed(1)}/10
                                 </a>
                                 <a
                                    href="#"
                                    class="ml-3 text-sm font-medium text-sky-800 hover:text-indigo-500"
                                 >
                                    {reviewCount} reviews
                                 </a>
                              </div>
                           </div>

                           <section
                              aria-labelledby="options-heading"
                              class=" mt-6"
                           >
                              <div>
                                 <h1 class="text-md font-medium text-gray-900">
                                    Description
                                 </h1>
                                 <h4 class="text-gray-500">
                                    {productDescription}
                                 </h4>

                                 <h1 class="mt-6 text-md font-medium text-gray-900">
                                    Reviews
                                 </h1>
                                 <div className=" flex flex-col">
                                    {reviews.length === 0 ? (
                                       <h2 className="text-md text-gray-500">
                                          No Reviews
                                       </h2>
                                    ) : (
                                       reviews.map((review, index) => (
                                          <div
                                             key={review.id}
                                             className="flex items-center mt-1"
                                          >
                                             <div className="text-gray-300 text-5xl">
                                                <BiSolidUserCircle />
                                             </div>
                                             <div className="flex p-1 bg-gray-200  w-full rounded-md border border-gray-300">
                                                <div className="w-full text-gray-600">
                                                   {review}
                                                </div>
                                                <div className="flex pl-2 pr-1 w-16 text-sky-800">
                                                   <div>
                                                      <h4>
                                                         {rates[index]}/10{' '}
                                                      </h4>
                                                   </div>
                                                   <div class="flex pr-1 ">
                                                      <svg
                                                         class="text-skynpm-800 h-5 w-5 flex-shrink-0  "
                                                         viewBox="0 0 20 20"
                                                         fill="currentColor"
                                                      >
                                                         <path
                                                            fill-rule="evenodd"
                                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                            clip-rule="evenodd"
                                                         />
                                                      </svg>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       ))
                                    )}
                                 </div>

                                 <div className="flex p-2 mt-2 text-gray-500 w-full rounded-md border border-gray-300">
                                    <input
                                       type="text"
                                       name="Review"
                                       id="Review"
                                       class="w-full outline-none sm:text-base"
                                       placeholder="Add a Review"
                                       onChange={handleInputChange}
                                       value={reviewInput}
                                    ></input>

                                    <button
                                       onClick={() => {
                                          setReviwer(true);
                                          setReviewInput(reviewInput);
                                          console.log(
                                             'reviewInput: ',
                                             reviewInput,
                                          );
                                       }}
                                       class="text-2xl  text-sky-800 hover:text-sky-950"
                                    >
                                       <BsSendFill size={25} />
                                    </button>
                                 </div>
                              </div>

                              <button
                                 type="submit"
                                 class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-800 px-8 py-3 text-base font-medium text-white hover:bg-sky-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                 <FaShoppingCart />
                                 <div
                                    onClick={() =>
                                       console.log('Added to Cart!')
                                    }
                                    className="pl-3 sm:text-lg"
                                 >
                                    Add to Cart
                                 </div>
                              </button>
                           </section>
                        </div>
                     </div>
                  </div>
                  {reviwer && (
                     <AddReviews
                        reviewInput={reviewInput}
                        setReviwer={setReviwer}
                        productid={id}
                     />
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductClientDetails;
