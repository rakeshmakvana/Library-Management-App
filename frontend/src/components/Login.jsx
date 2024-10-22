import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from ".././service/authOpeation";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);

  const handleFormSubmit = (data) => {
    console.log("Login data : ", data);
    dispatch(login(data, navigate));
    reset();
  };
  return (
    <div className="flex h-full w-[93vw] justify-center items-center text-white">
      <div className=" text-center my-auto px-32 py-32 font-Poppins">
        <h3 className="font-bold text-4xl text-richgreen-300">Welcome Back</h3>
        <h4 className="text-xl my-2">Login to your account</h4>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-6"
        >
          <input
            className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black "
            type="email"
            placeholder="Email"
            required={true}
            {...register("email", { required: true })}
          />
          <div className="relative">
            <input
              className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
              type={passwordShown ? "text" : "password"}
              placeholder="Password"
              required={true}
              {...register("password", { required: true })}
            />
            <button
              className="absolute top-3 right-3 text-richYellow"
              onClick={() => setPasswordShown(!passwordShown)}
            >
              {passwordShown ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="bg-richYellow hover:bg-yellow-400 text-richBlue-100 font-saira text-xl font-bold p-2 px-7 rounded-full w-[20rem]"
          >
            Log In
          </button>
        </form>
        <p className="text-base">
          Don’t have an Account?
          <br />
          <Link to={"/signup"}>
            <span className="text-richYellow cursor-pointer">
              Create Account
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
