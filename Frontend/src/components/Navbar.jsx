/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link as LinkR, NavLink } from "react-router-dom";
import LogoImg from "../utils/Images/Logo.png";
import {
  FavoriteBorder,
  MenuRounded,
  CloseRounded, // Import Close Icon
  SearchRounded,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Button from "./Button";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/UserSlice";

const Navbar = ({ setOpenAuth, openAuth, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <nav className="bg-white h-20 flex items-center justify-center sticky top-0 z-10 text-white">
      <div className="w-full max-w-[1400px] px-6 flex gap-3.5 items-center justify-between text-base">
        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-black flex items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <CloseRounded sx={{ fontSize: 30 }} /> // Close icon when menu is open
          ) : (
            <MenuRounded sx={{ fontSize: 30 }} /> // Menu icon when menu is closed
          )}
        </div>

        {/* Logo */}
        <LinkR to="/" className="flex items-center px-1.5 font-medium text-lg">
          <img src={LogoImg} alt="Logo" className="h-8.5" />
        </LinkR>

        {/* Navigation Links (Hidden in Mobile) */}
        <ul className="hidden md:flex items-center justify-center gap-8 list-none px-1.5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium transition-all text-lg ${
                isActive
                  ? "text-red-500 underline underline-offset-4"
                  : "text-black hover:text-red-500"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dishes"
            className={({ isActive }) =>
              `font-medium transition-all text-lg ${
                isActive
                  ? "text-red-500 underline"
                  : "text-black hover:text-red-500"
              }`
            }
          >
            Dishes
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `font-medium transition-all text-lg ${
                isActive
                  ? "text-red-500 underline"
                  : "text-black hover:text-red-500"
              }`
            }
          >
            Orders
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `font-medium transition-all text-lg ${
                isActive
                  ? "text-red-500 underline"
                  : "text-black hover:text-red-500"
              }`
            }
          >
            Contact
          </NavLink>
        </ul>

        {/* Icons and User Actions */}
        <div className="flex items-center gap-4 text-black">
          <NavLink to="/search">
            <SearchRounded sx={{ color: "inherit", fontSize: "30px" }} />
          </NavLink>

          {currentUser ? (
            <>
              <NavLink to="/favorite">
                <FavoriteBorder sx={{ color: "inherit", fontSize: "28px" }} />
              </NavLink>
              <NavLink to="/cart">
                <ShoppingCartOutlined
                  sx={{ color: "inherit", fontSize: "28px" }}
                />
              </NavLink>
              <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
              <span
                className="font-semibold text-secondary cursor-pointer hover:text-primary"
                onClick={() => dispatch(logout())}
              >
                Logout
              </span>
            </>
          ) : (
            <Button text="Sign In" small onClick={() => setOpenAuth(true)} />
          )}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 w-auto bg-white shadow-lg z-50">
            {/* Menu Items */}
            <ul className="flex flex-col items-start gap-4 p-6 w-full">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-medium text-lg transition-all ${
                    isActive
                      ? "text-red-500 underline underline-offset-4"
                      : "text-black hover:text-red-500"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/dishes"
                className={({ isActive }) =>
                  `font-medium text-lg transition-all ${
                    isActive
                      ? "text-red-500 underline underline-offset-4"
                      : "text-black hover:text-red-500"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Dishes
              </NavLink>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `font-medium text-lg transition-all ${
                    isActive
                      ? "text-red-500 underline underline-offset-4"
                      : "text-black hover:text-red-500"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Orders
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `font-medium text-lg transition-all ${
                    isActive
                      ? "text-red-500 underline underline-offset-4"
                      : "text-black hover:text-red-500"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Contact
              </NavLink>

              {currentUser && (
                <span
                  className="font-semibold text-secondary cursor-pointer hover:text-primary"
                  onClick={() => {
                    dispatch(logout());
                    setIsOpen(false); // Close the menu after logging out
                  }}
                >
                  Logout
                </span>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
