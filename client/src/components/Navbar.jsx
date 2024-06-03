import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginDetail = location.state.loginDetail;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="flex flex-col-reverse gap-4  md:flex-row md:justify-between items-center md:p-6 top-0 left-0 right-0 mb-6">
      <p className=" text-white">
        User : <span className="text-cyan-300">{loginDetail}</span>
      </p>

      <button
        onClick={handleLogout}
        className=" w-32 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
