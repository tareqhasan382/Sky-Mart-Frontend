/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignupMutation } from "../redux/api/authApi";
type Inputs = {
  name: string;
  email: string;
  password: string;
};
const Register = () => {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data", data);
    const result = await signup(data).unwrap(); // status: 'false'
    if (result?.status === "true") {
      navigate("/login");
      toast.success("user create successfully");
      console.log("Result:", result);
    } else if (result?.status == "false") {
      toast.error(`${result?.message}`);
      console.log("Result:", result);
    }

    // await axios
    //   .post("/", data)
    //   .then(function (response) {
    //     if (response.status) {
    //       //console.log(response);
    //       navigate("/login");
    //       toast.success("user create successfully");
    //     }
    //   })
    //   .catch(function (error: Error) {
    //     toast.error("user Created field");
    //     console.error(error);
    //   });
    // console.log(result);
  };
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen ">
      <div>
        <h1 className=" text-3xl font-bold mb-4 text-center ">Register Now</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" py-10 rounded-lg shadow-lg flex flex-col bg-gray-200 px-6 md:px-10 "
        >
          <label htmlFor="" className=" mb-2 ">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            {...register("name", { required: true })}
            className=" p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 outline-none focus:border-gray-600 text-black "
          />
          {errors.name && (
            <span className=" text-sm text-red-500 ">
              This field is required
            </span>
          )}
          <label htmlFor="" className=" mb-2 ">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
            className=" p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 outline-none focus:border-gray-600 text-black "
          />
          {errors.email && (
            <span className=" text-sm text-red-500 ">
              This field is required
            </span>
          )}
          <label htmlFor="" className=" mb-2 ">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
            className=" p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 outline-none focus:border-gray-600 text-black "
          />
          {errors.password && (
            <span className=" text-sm text-red-500 ">
              This field is required
            </span>
          )}

          <p className=" text-right cursor-pointer font-light px-2 ">
            <Link to="/forgotpassword">Forgot Password</Link>
          </p>
          <button
            type="submit"
            disabled={isLoading}
            className=" p-2 border rounded-lg bg-blue-500 text-white border-gray-300 mt-2 mb-4 focus:border-gray-600"
          >
            Sign up
          </button>
          <Link
            to="/login"
            className=" text-sm text-center mt-5 text-neutral-600 "
          >
            Already have an account ?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
