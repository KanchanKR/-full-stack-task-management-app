/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Modal } from "@mui/material";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import LogoImage from "../utils/Images/Logo.png";
import AuthImage from "../utils/Images/AuthImage.jpg";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Authentication = ({ openAuth, setOpenAuth }) => {
  const [login, setLogin] = useState(true);

  return (
    <Modal open={openAuth} onClose={() => setOpenAuth(false)}>
      <div className="flex h-full bg-white">
        {/* Left Side */}
        <div className="relative flex-1 hidden md:block">
          <img
            src={LogoImage}
            alt="Logo"
            className="absolute top-10 left-16 z-10"
          />
          <img
            src={AuthImage}
            alt="Auth Background"
            className="relative h-full w-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="relative flex flex-col flex-[0.9] p-10 gap-4 items-center justify-center md:flex-1">
          <button
            className="absolute top-5 right-5 w-8 h-8 border rounded-full flex items-center justify-center transition hover:bg-primary-light"
            onClick={() => setOpenAuth(false)}
          >
            <Close className="text-primary" />
          </button>

          {login ? (
            <>
              <SignIn setOpenAuth={setOpenAuth} />
              <p className="mt-4 text-center text-base text-gray-600">
                Don't have an account?{" "}
                <span
                  className="text-primary font-semibold cursor-pointer transition hover:underline"
                  onClick={() => setLogin(false)}
                >
                  Sign Up
                </span>
              </p>
            </>
          ) : (
            <>
              <SignUp setOpenAuth={setOpenAuth} />
              <p className="mt-4 text-center text-base text-gray-600">
                Already have an account?{" "}
                <span
                  className="text-primary font-semibold cursor-pointer transition hover:underline"
                  onClick={() => setLogin(true)}
                >
                  Sign In
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Authentication;
