/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";

import Banner from "./components/Bannar/Banner";
import FilterSection from "./components/FilterSection";
import Product from "./components/Product";
import SearchBar from "./components/SearchBar";

function App() {
  // const { data, isLoading } = useGetCoursesQuery(undefined);
  // const course = data?.data;
  // console.log("course:", course);
  // console.log("loading:", isLoading);
  return (
    <>
      <div className=" items-center rounded flex justify-center h-full pb-24 overflow-hidden ">
        <div>
          <div className=" h-90 py-4 px-4  mx-4 ">
            <SearchBar />
          </div>
          <div className=" ">
            <Banner />
          </div>
          <div className="px-6 mx-6 gap-3 ">
            <FilterSection />
            <Product />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
