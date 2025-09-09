import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function Header({ bgColor }) {
  const { user, ready } = useContext(UserContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const handleClick = (path) => {
    setActiveLink(path);
    setIsMenuOpen(false); // Close the menu when a link is clicked
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`fixed w-full flex justify-between py-5 lg:px-[120px] px-5 z-20  transition-all ${
        isScrolled || isMenuOpen || bgColor === "bg-lime-500"
          ? ` bg-lime-500 border-b border-primary md:border-0 text-black `
          : "bg-transparent text-white"
      }`}
    >
      <Link
        to="/"
        className="flex items-center gap-1  duration-300"
        onClick={() => handleClick("/")}
      >
        <ion-icon name="bonfire"></ion-icon>
        <span className="font-bold text-2xl pl-1">StayEase</span>
      </Link>
      <div
        className={`flex absolute duration-200 bg-lime-500 md:items-center ${
          isMenuOpen ? "top-[87px]" : "top-[-1000px]"
        } left-0 w-full h-screen md:h-auto md:static md:w-auto md:bg-transparent py-5 md:py-0 `}
      >
        <div className="flex md:flex-row flex-col gap-5 md:gap-11 pl-5 md:pl-0">
          <Link
            to="/"
            className={` ${
              activeLink === "/" ? "duration-500" : " opacity-60"
            }`}
            onClick={() => handleClick("/")}
          >
            Home
          </Link>
          <Link
            to="/Places"
            className={`${
              activeLink === "/Places" ? "duration-500" : "  opacity-60"
            }`}
            onClick={() => handleClick("/Places")}
          >
            Places
          </Link>
          <Link
            to="/about"
            className={` ${
              activeLink === "/about" ? "duration-500" : "  opacity-60"
            }`}
            onClick={() => handleClick("/about")}
          >
            About
          </Link>
          {!user && ready && (
            <Link
              to="/login"
              className="flex justify-center py-3 absolute left-5 right-5 bottom-40 font-bold rounded-full  bg-white text-black md:hidden"
              onClick={() => handleClick("/login")}
            >
              Login
            </Link>
          )}
          {user && ready && (
            <Link
              to={user ? "/account" : "/login"}
              className=" flex justify-start absolute left-5 right-5 bottom-40 items-center gap-2 border rounded-full py-2 px-4 border-gray-300  md:hidden text-black bg-white"
              onClick={() => handleClick("/account")}
            >
              <div className="rounded-full border overflow-hidden bg-gray-500 text-white border-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 relative top-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {user && ready && <div>{user.name}</div>}
            </Link>
          )}
        </div>
      </div>
      {user && ready && (
        <Link
          to={user ? "/account" : "/login"}
          className={`items-center gap-2 border rounded-full py-2 px-4 border-gray-300 hidden md:flex ${
            isScrolled || isMenuOpen || bgColor === "bg-lime-500"
              ? "border-black "
              : "border-gray-300"
          }`}
          onClick={() => handleClick("/account")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="rounded-full border overflow-hidden bg-gray-500 text-white border-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {user && <div>{user.name}</div>}
        </Link>
      )}
      {!user && (
        <Link
          to="/login"
          className="   items-center font-bold px-4  bg-white text-black hidden md:flex rounded-lg"
          onClick={() => handleClick("/login")}
        >
          Login
        </Link>
      )}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className={`bg-transparent ${
            isScrolled || isMenuOpen || bgColor === "bg-lime-500"
              ? "text-black"
              : "text-white"
          }`}
        >
          <ion-icon name={isMenuOpen ? "close" : "menu"}></ion-icon>
        </button>
      </div>
    </header>
  );
}
