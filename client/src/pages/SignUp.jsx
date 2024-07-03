import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../component/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`/api/auth/sign-up`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(data);

      setMessage(data.message);

      if (data.messsage === false) {
        setError(data.message);
      }
      setLoading(false);
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center  text-text flex-col">
      <div className="w-full max-w-md mx-auto h-[90%] p-6 shadow-md rounded-lg  dark:shadow-sm dark:shadow-accent ">
        <h1 className="text-3xl text-center font-semibold mb-6 text-accent">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            id="username"
            placeholder="Username"
            onChange={handleChange}
            className="dark:bg-darkBackground dark:text-darkText border-2 border-accent p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-light"
          />
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="dark:bg-darkBackground dark:text-darkText border-2 border-accent p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-light"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            className="dark:bg-darkBackground dark:text-darkText border-2 border-accent p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-light"
          />
          <input
            type="password"
            id="confirmPassword"
            placeholder="confirm password..."
            onChange={handleChange}
            className="dark:bg-darkBackground dark:text-darkText border-2 border-accent p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-light"
          />
          <button
            type="submit"
            className="mt-4 p-3 bg-accent text-white rounded-lg  transition-colors"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>{" "}
          <OAuth />
          {message && <p className="text-green-600 text-center">{message}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}{" "}
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
