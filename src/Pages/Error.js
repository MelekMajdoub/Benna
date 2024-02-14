import { useNavigate } from 'react-router-dom';

const Error = () => {
   const navigate = useNavigate();

   const goBack = () => navigate(-1);

   return (
      <div class="flex items-center justify-center min-h-screen bg-white ">
         <div class="text-center">
            <p class="text-base font-semibold text-sky-800 sm:text-4xl">404</p>
            <h1 class="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-7xl">
               Page not found
            </h1>
            <p class="mt-6 text-base leading-7 text-sky-800 sm:text-xl">
               Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
               <div class="rounded-md bg-sky-800 px-3.5 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-sky-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-950">
                  <button onClick={goBack}>Go Back</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Error;
