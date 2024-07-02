import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
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
    setError(null);
    setMessage(null);

    try {
      const { data } = await axios.post(`/api/auth/sign-in`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(data);
      setMessage(data.message);

      if (!data.success === false) {
        setError(data.message);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center text-text">
      <div className="w-full max-w-md mx-auto h-[90%] p-6 shadow-md rounded-lg dark:shadow-sm dark:shadow-accent">
        <h1 className="text-3xl text-center font-semibold mb-6 text-accent">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="dark:bg-darkBackground dark:text-darkText border-2 border-accent p-3 rounded-lg focus:outline-none"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            className="dark:bg-darkBackground dark:text-darkText border-2 border-accent p-3 rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            className="mt-4 p-3 bg-accent text-white rounded-lg transition-colors"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          {message && <p className="text-green-600 text-center">{message}</p>}
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </form>
        <div className="flex gap-2 mt-5">
          <p className="dark:text-darkText">Dont Have an account?</p>
          <Link to="/sign-up">
            <span className="text-accent">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
