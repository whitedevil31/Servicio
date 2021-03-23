import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import axios, { AxiosRequestConfig } from "axios";

function DashboardClient() {
  const [worker, setWorker] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/worker/get", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setWorker(response.data);
        console.log(response);
      });
  });

  const history = useHistory();
  const logoutHandler = () => {
    fetch("http://localhost:5000/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setTimeout(() => {
        if (response.status === 200) {
          Cookies.remove("user");
          history.push("/", {});
        }
      }, 800);
    });
  };

  return (
    <div>
      {Cookies.get("user") ? (
        <div className="w-full h-screen flex flex-col">
          <nav className="w-screen bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                    <svg
                      className="hidden h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src=""
                      alt="Workflow"
                    ></img>
                    <h1 className="hidden lg:block h-8 w-auto text-white">
                      Servicio
                    </h1>
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Dashboard
                      </a>
                      <a
                        href="#"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        About
                      </a>
                      <a
                        href="#"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        FAQ
                      </a>
                      <a
                        href="#"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>

                <div className="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1521710696740-c8144a7eaf88?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                        alt=""
                      ></img>
                    </button>
                  </div>
                  <div
                    hidden={true}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Your Profile
                    </a>

                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={logoutHandler}
                      role="menuitem"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="w-screen bg-gray-500 h-full p-1 flex justify-center">
            <div className="w-1/5 bg-gray-500 h-full mr-4">
              testsdsdsdfdsfsdfsdfdsfsdf
            </div>

            <div className="w-1/2 border-2 border-blue-500 h-full mr-4">
              {worker.map((obj) => (
                <div
                  className="flex justify-between bg-indigo-50 ml-6 mt-8 h-40 w-11/12 shadow-inner sm:rounded-2xl border-b-4 
               border-green-800 
               transition duration-300 ease-in-out hover:scale-y-125 hover:bg-indigo-100
               "
                >
                  <img
                    className="h-8 w-8 ml-6 mt-7 rounded-b-full"
                    src="https://images.unsplash.com/photo-1521710696740-c8144a7eaf88?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    alt=""
                  ></img>
                  <h1 className="flex ml-5 mt-6 font-display text-xl text-green-800">
                    Name{obj.username}
                  </h1>
                  <p className="flex flex-row mt-16 -ml-12 font-display text-sm font-bold text-green-800">
                    Age{obj.age}
                  </p>
                  <button className="w-14 h-8 mt-24 mr-8 -ml-8 shadow-lg flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                    Hire!
                  </button>
                  <p className="ml-5 mt-9 mr-2 mb-3 font-display text-mg text-green-800">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Odit repellat quas velit.
                  </p>
                  <a className="ml-2 -mr-10 mt-12 w-12 h-12 px-5 py-5 shadow-lg flex items-center justify-center rounded-full bg-green-300 hover:bg-green-500">
                    <i className="far fa-comments"></i>
                  </a>
                  <p className="flex mt-28 mr-5 font-cursive text-xl text-green-800">
                    <b>₹{obj.pay}</b>
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gray-200 shadow-2xl rounded-2xl w-1/4S h-full">
              <div className="xl:flex uppercase font-bold text-black text-lg px-4 py-2">
                Workers Near By:
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-screen">
          <div className="bg-red-600 rounded-lg flex items-center flex-col justify-center w-1/2 h-1/3">
            <h1 className="text-yellow-300 text-xl">
              You are not Authenticated ma{" "}
            </h1>
            <h3 className="text-yellow-300 text-xl">Go back</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardClient;
