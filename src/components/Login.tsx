import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../redux/api/authApi";
import { setToLocalStorage } from "../utils/local-storage";
import { authKey } from "../constant/storageKey";
// import axios from "axios";
type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data", data);
    const result = await login(data).unwrap(); // status: 'false'
    if (result?.status === "true") {
      setToLocalStorage(authKey, result.token);
      navigate("/");
      toast.success("user Login successfully");
      window.location.reload();
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
    //       toast.success("user Logged in successfully");
    //     }
    //   })
    //   .catch(function (error: Error) {
    //     toast.error("user login field");
    //     console.error(error);
    //   });
    // console.log(result);
    // console.log(data);
  };
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen ">
      <div>
        <h1 className=" text-3xl font-bold mb-4 text-center ">Sign In</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" py-10 rounded-lg shadow-lg flex flex-col bg-gray-200 px-6 md:px-10 "
        >
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
            {...register("password", { required: true })}
            placeholder="Enter your password"
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
            disabled={isLoading}
            type="submit"
            className=" p-2 border rounded-lg bg-blue-500 text-white border-gray-300 mt-2 mb-4 focus:border-gray-600"
          >
            Login Now
          </button>
          <Link
            to="/register"
            className=" text-sm text-center mt-5 text-neutral-600 "
          >
            Do not have an account ?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
