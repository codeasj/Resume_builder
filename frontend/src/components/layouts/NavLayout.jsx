/* eslint-disable react/prop-types */
import GodFatherLogo from "../../assets/the-godfather.svg";
import { FiEdit } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import { useCallback, useContext } from "react";
import { AUTH_STATE, DesignContext } from "../../contexts/DesignIndexContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import Button from "../Button";
import { useEffect } from "react";
import { authApi } from "./../../api";
import { toast } from "react-hot-toast";

const NavLayout = () => {
  const { designIndex, authState, handleToggle, handleAuthState } =
    useContext(DesignContext);

  const navigate = useNavigate();

  const checkUserAuth = useCallback(() => {
    let user = localStorage.getItem("USER");
    user = user && JSON.parse(user);

    if (user?._id) return handleAuthState(AUTH_STATE.AUTHENTIC);

    handleAuthState(AUTH_STATE.UN_AUTHENTIC);
    navigate("/auth", {
      replace: true,
    });
  }, [navigate, handleAuthState]);

  // checking user authentic or not
  useEffect(() => {
    checkUserAuth();
  }, [checkUserAuth]);

  const Logout = async () => {
    try {
      const logout = confirm("Do you want to logout?");
      if (!logout) return;

      await authApi.get("/auth/logout");
      toast.success("Logout Success");
      navigate("/auth", {
        replace: true,
      });
      localStorage.clear();
    } catch (error) {
      toast(error?.response?.data?.message || "");
    }
  };

  if (authState === AUTH_STATE.LOADING)
    return (
      <div className="w-full h-screen flex justify-center items-center text-2xl font-medium">
        Loading...
      </div>
    );

  return (
    <div className="container mx-auto p-5 pt-0">
      <div className="flex justify-between mb-4 sticky top-0 bg-white">
        <Link to="/" className="max-w-16">
          <img src={GodFatherLogo} alt="" />
        </Link>

        <div className="flex gap-6 items-center">
          <button title={"Home"} className="text-[1.75rem]">
            <Link to="/">
              <FiHome />
            </Link>
          </button>

          <button title={"Edit Profile"} className="text-[1.75rem]">
            <Link to={"/edit/basic"}>
              <FiEdit />
            </Link>
          </button>

          <button
            onClick={handleToggle}
            title={"Toggle Layout"}
            className="text-3xl relative"
          >
            <span className="text-xs absolute -top-3 -right-4 bg-blue-500 text-white rounded-full w-5 h-5 flex justify-center items-center">
              <span className="w-6 h-6 bg-blue-300 -z-10 absolute rounded-full animate-ping"></span>
              {designIndex + 1}
            </span>
            <LuLayoutDashboard />
          </button>

          <div className="ml-10">
            <Button onClick={Logout}>Log Out</Button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default NavLayout;
