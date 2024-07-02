/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center  text-text">
      <div className="w-full max-w-md mx-auto h-[90%] p-6 shadow-md rounded-lg  dark:shadow-sm dark:shadow-accent ">
        <h1 className="text-3xl text-center font-semibold mb-6 text-accent">
          Sign In
        </h1>
        <form action="" className="flex flex-col gap-4 ">
          <input
            type="email"
            placeholder="Email Address"
            className="dark:bg-darkBackground dark:text-darkText border-2 border-accent p-3 rounded-lg focus:outline-none "
          />
          <input
            type="password"
            placeholder="Password"
            className="dark:bg-darkBackground dark:text-darkText border-2 border-accent p-3 rounded-lg focus:outline-none "
          />
          <button className="mt-4 p-3 bg-accent text-white rounded-lg  transition-colors">
            Sign Up
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p className="dark:text-darkText">Don't Have an account?</p>
          <Link to="/sign-up">
            <span className="text-accent">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
