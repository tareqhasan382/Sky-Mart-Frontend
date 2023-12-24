const Footer = () => {
  return (
    <div>
      <div className="max-w-[1640px] h-full bottom-0 min-h-full m-auto px-2 pt-12 lg:px-20">
        <footer className=" text-white py-24 px-8 items-center justify-center ">
          <div className="container mx-auto flex flex-col lg:flex-row gap-10  justify-between items-center">
            <div className="flex items-center justify-center flex-col text-center">
              <h2 className="text-lg font-bold mb-2">Follow Us</h2>
              <div className="flex justify-center space-x-4">
                <a
                  href="#"
                  className="text-xl hover:text-[#CC470A] transition duration-300"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-xl hover:text-[#CC470A] transition duration-300"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-xl hover:text-[#CC470A] transition duration-300"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
