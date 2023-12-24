import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="  flex flex-col items-center justify-center min-h-screen ">
      <div className=" flex flex-col items-center justify-start ">
        <h1 className=" text-8xl lg:text-9xl font-extrabold mb-4 text-center text-red-400 ">
          Oops!
        </h1>
        <p className=" text-2xl lg:text-4xl font-extrabold mb-4 text-center uppercase ">
          404-Page not Found
        </p>
        <p className=" w-[320px] lg:w-[480px]  text-justify ">
          The page you're searching for is on a coffee break. Please join us in
          waiting, or enjoy some cat videos while the page takes a well-deserved
          rest. If the page doesn't return soon, consider offering it a virtual
          snack. Thanks for your patience!
        </p>
        <Link to="/">
          <button className=" flex items-center justify-center uppercase px-5 py-2 mt-5 bg-blue-600 rounded-full cursor-pointer text-white ">
            Go to homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
