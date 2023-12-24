import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../utils/local-storage";
import { useUserProfileQuery } from "../redux/api/authApi";

const UserProfile = () => {
  const { data } = useUserProfileQuery(undefined);
  const course = data?.data;
  const navigate = useNavigate();
  const userLoggedIn = isLoggedIn();
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
    setIsLoading(true);
  }, [loading, userLoggedIn, navigate]);

  if (!loading) {
    <div>
      <h1>Loading..........</h1>
    </div>;
  }

  //===========================

  return (
    <div className="flex justify-center items-center py-10">
      <div className=" w-full items-center justify-cente shadow-lg outline outline-gray-300/75 rounded p-5 ">
        <h1 className=" text-center text-lg font-bold ">My Profile</h1>
        <div className="bg-white flex flex-col items-center justify-center px-5 w-full">
          <div className=" flex flex-col items-start justify-start ">
            <h1 className=" text-center font-semibold ">
              Name :{course?.name}
            </h1>
            <h1 className=" text-center font-semibold ">
              Email :{course?.email}
            </h1>
          </div>
        </div>
        {/* Enroll data */}
        {/* <h2 className="font-bold text-xl mb-2">Enroll Course</h2> */}
        {/* <div className=" items-center justify-cente shadow-lg outline outline-gray-300/75 rounded p-5 my-4 ">
          <div className="bg-white flex items-center justify-center px-5">
            <img
              src={enrollData?.courseId?.thumbnail}
              alt="thumbnail"
              className="w-48 h-48 object-cover mx-auto rounded overflow-hidden"
            />
          </div>
          <h2 className="font-bold md:text-sm lg:text-xl mb-2">
            {enrollData?.courseId?.name}
          </h2>
          <h2 className="font-bold md:text-sm lg:text-xl mb-2">
            Instructor: {enrollData?.courseId?.instructor}
          </h2>
        </div> */}
        {/* <EnrollCart /> */}
      </div>
    </div>
  );
};

export default UserProfile;
