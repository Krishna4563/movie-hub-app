import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ visible: false, message: "" });

  const navigate = useNavigate();

  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        setAlert({ visible: false, message: "" });
      }, 1700);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://movie-hub-server-phi.vercel.app/api/users/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      setIsAuthenticated(true);

      navigate("/home", { state: { loginDetail: email } });
    } catch (error) {
      setAlert({ visible: true, message: error.response.data.msg });
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen bg-custom-dark-blue p-4">
      {alert.visible && (
        <div className="absolute top-4 bg-red-500 text-white p-4 rounded shadow-md">
          {alert.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl mb-4 bg-white">Login</h1>
        <div>
          <label className="bg-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-4 bg-white"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4 bg-white"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>

      <p className=" text-white">
        Don't have an account?{" "}
        <span>
          <button onClick={handleRegister} className="underline text-cyan-300">
            Register
          </button>
        </span>
      </p>
    </div>
  );
};

export default Login;
