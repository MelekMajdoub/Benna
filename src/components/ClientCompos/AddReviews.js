import { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsSendFill } from 'react-icons/bs';

import { AiOutlineClose } from 'react-icons/ai';

function AddReviews(props) {
   const [number, setNumber] = useState(0);
   const [hoverStar, setHoverStar] = useState(undefined);
   const [reviewDecription, setReviewDecription] = useState('');

   const handleRate = () => {
      switch (number || hoverStar) {
         case 0:
            return 0;
         case 1:
            return 1;
         case 2:
            return 2;
         case 3:
            return 3;
         case 4:
            return 4;
         case 5:
            return 5;
         case 6:
            return 6;
         case 7:
            return 7;
         case 8:
            return 8;
         case 9:
            return 9;
         case 10:
            return 10;
         default:
            return 'your rate ';
      }
   };

   const handleInputChange = (event) => {
      setReviewDecription(event.target.value);
   };

   const handleSubmit = async () => {
      console.log('id', props.productid);
      console.log('rating', handleRate());
      console.log('reviewDecription', reviewDecription);

      try {
         const response = await fetch(
            `http://localhost:8080/addReview/${props.productid}`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  rating: handleRate(),
                  description: reviewDecription,
               }),
            },
         );

         if (response.ok) {
            // Review successfully added, you can handle the success here
            console.log('Review Added');
         } else {
            // Handle the case where the request failed
            console.error('Failed to add review');
         }
      } catch (error) {
         console.error('Error adding review:', error);
      }
   };

   return (
      <div class=" fixed inset-0 z-10  overflow-y-auto">
         <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <div class=" flex w-70 transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl shadow-2xl">
               <div class="grid  grid-cols-1  relative w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                     class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                     onClick={() => {
                        props.setReviwer(false);
                     }}
                  >
                     <AiOutlineClose size={20} />
                  </button>

                  <div className="w-full items-center text-center">
                     <h1 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        Add a review
                     </h1>
                  </div>
                  <div>
                     <h1 className="text-center text-gray-500">
                        {handleRate()}/10
                     </h1>
                     <div className="flex py-3 justify-center gap-4">
                        {Array(10)
                           .fill()
                           .map((_, index) =>
                              number >= index + 1 || hoverStar >= index + 1 ? (
                                 <AiFillStar
                                    className="text-2xl"
                                    onMouseOver={() =>
                                       !number && setHoverStar(index + 1)
                                    }
                                    onMouseLeave={() => setHoverStar(undefined)}
                                    style={{ color: 'orange' }}
                                    onClick={() => setNumber(index + 1)}
                                 />
                              ) : (
                                 <AiOutlineStar
                                    className="text-2xl"
                                    onMouseOver={() =>
                                       !number && setHoverStar(index + 1)
                                    }
                                    onMouseLeave={() => setHoverStar(undefined)}
                                    style={{ color: 'orange' }}
                                    onClick={() => setNumber(index + 1)}
                                 />
                              ),
                           )}
                     </div>
                  </div>
                  <div className="flex p-2 mt-2 text-gray-500 w-full rounded-md border border-gray-300 ">
                     <input
                        type="text"
                        name="Review"
                        id="Review"
                        class="w-full outline-none sm:text-base mb-12"
                        placeholder={props.reviewInput}
                        onChange={handleInputChange}
                        value={reviewDecription}
                     ></input>
                  </div>
                  <button
                     type="submit"
                     class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-sky-800 px-8 py-3 text-base font-medium text-white hover:bg-sky-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                     <BsSendFill />
                     <div onClick={handleSubmit} className="pl-3 sm:text-lg">
                        submit
                     </div>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default AddReviews;
