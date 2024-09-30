
export const Home = () => {
    return (
        <>
<div className="relative bg-gray-900 bg-cover bg-center bg-black bg-opacity-50" style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/07/96/77/90/360_F_796779035_QKKxPCskiqvJuYTAlnusVZRWSjkITJlS.jpg')" }}>
  <div className="absolute inset-0 bg-black bg-opacity-60"></div> {/* Dark overlay */}
  <div className="relative z-10 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
    <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
      <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-white md:text-5xl sm:leading-none">
        Fresh and Healthy Dry Foods
        <br className="hidden md:block" />
        for a Better Life Everyday

      </h2>
      <p className="mb-6 text-base font-thin tracking-wide text-gray-300 md:text-lg">
        Discover our range of premium quality dry foods to keep your pantry
        stocked with healthy and delicious options.
      </p>
      
      <p className="max-w-md mb-10 text-xs font-thin tracking-wide text-gray-500 sm:text-sm sm:mx-auto md:mb-16">
        Sign up for updates on our latest products and special offers.
      </p>
      <a
        href="/"
        aria-label="Scroll down"
        className="flex items-center justify-center w-10 h-10 mx-auto text-white duration-300 transform border border-gray-400 rounded-full hover:text-blue-600 hover:border-blue-600 hover:shadow hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z" />
        </svg>
      </a>
    </div>
  </div>
</div>
</>
    );
  };
  