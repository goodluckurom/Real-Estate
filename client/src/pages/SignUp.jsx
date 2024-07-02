import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  text-text">
      <div className="w-full max-w-md mx-auto h-[90%] p-6 shadow-md rounded-lg  dark:shadow-sm dark:shadow-accent ">
        <h1 className="text-3xl text-center font-semibold mb-6 text-accent">
          Sign Up
        </h1>
        <form action="" className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="dark:bg-darkBackground dark:text-darkText border-2 border-accent p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-light"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="dark:bg-darkBackground dark:text-darkText border-2 border-accent p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-light"
          />
          <input
            type="password"
            placeholder="Password"
            className="dark:bg-darkBackground dark:text-darkText border-2 border-accent p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-light"
          />
          <button className="mt-4 p-3 bg-accent text-white rounded-lg  transition-colors">
            Sign Up
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p className="dark:text-darkText">Already have an account?</p>
          <Link to="/sign-in">
            <span className="text-accent">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
