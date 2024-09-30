import React from "react";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="block bg-grey-light border-t">
      {/* Container */}
      <div className="py-16 md:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
        {/* Component */}
        <div className="flex-col flex items-center">
          <a href="#" className="mb-8 inline-block max-w-full text-black">
            <img
              src="{img1}"
              alt=""
              className="inline-block max-h-10"
            />
          </a>
          <div className="text-center font-semibold">
            <a
              href=""
              className="inline-block px-6 py-2 font-normal text-black transition hover:text-primary"
            >
              TrizzenDotNet
            </a>
            <a
              href="https://www.youtube.com/watch?v=7smnB7tPW04"
              className="inline-block px-6 py-2 font-normal text-black transition hover:text-primary"
            >
              Contact US
            </a>
            
            <a
              href="https://www.youtube.com/watch?v=7smnB7tPW04"
              className="inline-block px-6 py-2 font-normal text-black transition hover:text-primary"
            >
              www.trizzen.net
            </a>
           
          </div>
          <div className="mb-8 mt-8 border-b border-gray-300 w-48"></div>
          
          <p className="text-sm sm:text-base">
            © Copyright. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

  );
}

export default Footer;
