import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HeaderPart() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const handleBodyOverflow = () => {
      if (isNavVisible) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    handleBodyOverflow();

    return () => {
      // Cleanup to reset body overflow on component unmount
      document.body.style.overflow = 'auto';
    };
  }, [isNavVisible]);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token) {
      setIsLoggedIn(true);
      setUserEmail(email); // Set email from local storage if available
    } else {
      setIsLoggedIn(false);
      setUserEmail(null);
    }
  }, []);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const handleLogout = () => {
    // Remove token and email from local storage and redirect to login page
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setUserEmail(null);
    window.location.href = '/login'; // Redirect to login page
  };
  return (
    <nav className={`bg-white z-20 sticky top-0 w-full border-b border-gray-200 ${isNavVisible ? 'h-screen md:h-14' : 'h-14'}`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-1">
        <Link to="/" className="navbar-brand">
          <div>
            <h1 className='font-bold text-xl'>Trizzen</h1>
          </div>
        </Link>
        <div className="flex md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse items-center">
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse m-0">
            <button
              onClick={toggleNav}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`items-center w-full md:flex md:w-auto md:order-2 ${isNavVisible ? 'block text-center' : 'hidden'}`}
          id="navbar-sticky"
        >
          <ul className="items-center flex flex-col p-4 md:p-0 mt-4 mx-2 font-medium -100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
            <li>
              <a href="/" className="block py-2 px-3 text-gray-900 rounded  md:hover:text-primary md:p-0 md:dark:hover:text-primary dark:hover:text-white dark:border-gray-700">Home</a>
            </li>
            <li>
              <a href="/" className="block py-2 px-3 text-gray-900 rounded   md:hover:text-primary md:p-0 md:dark:hover:text-primary dark:hover:text-primary  ">About</a>
            </li>
            <li>
              <a href="/news" className="block py-2 px-3 text-gray-900 rounded  md:hover:text-primary md:p-0 md:dark:hover:text-primary   ">News</a>
            </li>
            
          </ul>
          {isLoggedIn ? (
            <> 
            <a href="/feedbacks" className="block py-2 px-3 mx-6 text-gray-900  md:hover:text-primary md:p-0 md:dark:hover:text-primary   ">Feedbacks</a>
          
            
              <div className="user justify-center">
                <Link to="/profile">
                  <div className="flex items-center mx-1 rounded-full px-2 justify-center">
                    <svg id='Male_User_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' >
                      <rect width='24' height='24' stroke='none' fill='#000000' opacity='0'/>
                      <g transform="matrix(0.77 0 0 0.77 12 12)">
                        <path transform=" translate(-16, -16)" d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 16 8 C 13.25 8 11 10.25 11 13 C 11 14.515625 11.707031 15.863281 12.78125 16.78125 C 10.53125 17.949219 9 20.300781 9 23 L 11 23 C 11 20.226563 13.226563 18 16 18 C 18.773438 18 21 20.226563 21 23 L 23 23 C 23 20.300781 21.46875 17.949219 19.21875 16.78125 C 20.292969 15.863281 21 14.515625 21 13 C 21 10.25 18.75 8 16 8 Z M 16 10 C 17.667969 10 19 11.332031 19 13 C 19 14.667969 17.667969 16 16 16 C 14.332031 16 13 14.667969 13 13 C 13 11.332031 14.332031 10 16 10 Z" stroke-linecap="round" />
                      </g>
                    </svg>
                    <span className="p-2 font-semibold text-primary">{userEmail}</span>
                  </div>
                </Link>
              </div>
              <div className="logout">
                <button onClick={handleLogout} type="button" className="px-5 py-2 text-20 text-grey font-semibold rounded-lg border border-black transition duration-1000 ease-in-out hover:text-white hover:bg-black">Log Out</button>
              </div>
            </>
          ) : (
            <Link to="/login" className="navbar-brand">
              <button type="button" className="px-5 py-2 mx-6 text-20 text-white bg-blue-600 font-semibold rounded-lg border border-grey transition duration-1000 ease-in-out hover:text-white hover:bg-grey">Log In</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default HeaderPart;
