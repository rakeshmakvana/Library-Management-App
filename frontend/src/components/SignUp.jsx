import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from ".././service/authOpeation";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const handleFormSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      reset();
      return;
    }
    dispatch(signUp(data, navigate));
  };
  return (
    <div className="w-[92vw] h-full flex justify-center items-center flex-col text-center text-white my-auto px-40 pb-5 font-Poppins mx-auto">
      <h3 className="font-bold text-4xl text-richgreen-300">Register</h3>
      <h4 className="text-xl my-2">Create your new account</h4>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-5 justify-center items-center"
      >
        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="text"
          placeholder="Username"
          required={true}
          {...register("username", { required: true })}
        />

        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
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
            onClick={(e) => {
              e.preventDefault();
              setPasswordShown(!passwordShown);
            }}
          >
            {passwordShown ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="relative">
          <input
            className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
            type={confirmPasswordShown ? "text" : "password"}
            placeholder="Confirm Password"
            required={true}
            {...register("confirmPassword", { required: true })}
          />
          <button
            className="absolute top-3 right-3 text-richYellow"
            onClick={(e) => {
              e.preventDefault();
              setConfirmPasswordShown(!confirmPasswordShown);
            }}
          >
            {confirmPasswordShown ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <p className="text-xs my-2">
          By signing up you agree to our{" "}
          <span className="text-richgreen-100 underline">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="text-richgreen-100 underline">Privacy Policy</span>
        </p>
        <button
          type="submit"
          className="bg-richYellow hover:bg-yellow-400 text-richBlue-100 font-saira text-xl font-bold p-2 px-7 rounded-full w-[20rem]"
        >
          Sign up
        </button>
      </form>
      <p className="text-base">
        Already have an Account?{" "}
        <Link to="/login">
          <span className="text-richYellow font-semibold">Log in</span>
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
