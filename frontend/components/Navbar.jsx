import React, { useEffect, useState } from "react";
import NavLink from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const userToken = localStorage.getItem("user_access_token");
      const doctorToken = localStorage.getItem("doctor_access_token");
      if (userToken || doctorToken) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error accessing localStorage", error);
    }
  }, []);

  function handleLogout() {
    try {
      localStorage.removeItem("user_access_token");
      localStorage.removeItem("doctor_access_token");
      window.location.href = "/";
    } catch (error) {
      console.error("Error removing localStorage items", error);
    }
  }

  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <NavLink
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>

            <span className="ml-3 text-xl">Doco</span>
          </NavLink>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            {isAuthenticated ? (
              <>
                <NavLink className="mr-5 hover:text-gray-900" href="/">
                  Home
                </NavLink>
                <NavLink className="mr-5 hover:text-gray-900" href="/chatbot">
                  Chatbot
                </NavLink>
                <NavLink className="mr-5 hover:text-gray-900" href="/about">
                  About
                </NavLink>
                <NavLink className="mr-5 hover:text-gray-900" href="/doctors">
                  Doctors
                </NavLink>
                <NavLink className="mr-5 hover:text-gray-900" href="/profile">
                  Profile
                </NavLink>
                <NavLink
                  href="/"
                  className="mr-5 hover:text-gray-900"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
                <NavLink
                  href="/profile"
                  className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                >
                  Profile
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className="mr-5 hover:text-gray-900" href="/">
                  Home
                </NavLink>
                <NavLink className="mr-5 hover:text-gray-900" href="/chatbot">
                  Chatbot
                </NavLink>
                <NavLink className="mr-5 hover:text-gray-900" href="/about">
                  About
                </NavLink>
                <NavLink className="mr-5 hover:text-gray-900" href="/doctors">
                  Doctors
                </NavLink>
                <NavLink className="mr-5 hover:text-gray-900" href="/signin">
                  Signin
                </NavLink>
                <NavLink className="mr-5 hover:text-gray-900" href="/login">
                  Login
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;