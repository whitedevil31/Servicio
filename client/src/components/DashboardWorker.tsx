import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import axios, { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";

const DashboardWorker = () => {
  const { register, handleSubmit } = useForm();

  const workerPost = () => {};

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

  const onSubmit = (data: any) => {
    alert("poda naye");
    console.log(data)
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // if (position?.latitude === undefined) {
    //   return window.alert("Enable location or refresh the page to continue ");
    // }
    // const userData: userType = {
    //   location: {
    //     latitude: position!.latitude,
    //     longitude: position!.longitude,
    //   },
    //   ...data,
    // };
    // let config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // axios
    //   .post("http://localhost:5000/api/worker/post", data, config)
    //   .then((response) => {
    //     console.log(response);
    //   });
  };

  return (
    <div>
      {Cookies.get("worker") ? (
        <div>
          <nav className="bg-gray-800">
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
          <div className="flex">
            <div className="flex flex-row">
              <div className="bg-gray-200 shadow-2xl rounded-2xl mt-10 ml-5 relative h-2/4 w-72 min-h-screen">
                <div className="xl:py-2">
                  <div className="xl:flex uppercase font-bold text-white text-lg px-4 py-2">
                    testsdsdsdfdsfsdfsdfdsfsdf
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div
                className="flex justify-between bg-indigo-50 ml-6 mt-8 h-full w-full shadow-inner sm:rounded-2xl border-b-4 
               border-green-800 
               transition duration-300 ease-in-out hover:scale-y-125 hover:bg-indigo-100
               "
              >
                Hey, Let's Get you started.
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col">
                    <div className="mt-10 w-1/2 ml-3 mr-5">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-indigo-700"
                      >
                        Pay
                      </label>

                      <input
                        type="number"
                        name="pay"
                        ref={register}
                        autoComplete="off"
                        className="mt-1 h-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-2xl sm:text-sm border-gray-500 border-b-2 rounded-md transition duration-500 ease-in-out hover:shadow-inner"
                      ></input>
                    </div>

                    <div className="mt-10 float-right w-1/2 ml-3 mr-5">
                      <fieldset>
                        <legend className="text-base font-medium text-gray-900">
                          Services
                        </legend>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="comments"
                                name="plumbing"
                                ref={register}
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              ></input>
                            </div>
                            <div className="ml-3 text-sm">
                              <label className="font-medium text-gray-700">
                                Plumbing
                              </label>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="candidates"
                                name="cooking"
                                ref={register}
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              ></input>
                            </div>
                            <div className="ml-3 text-sm">
                              <label className="font-medium text-gray-700">
                                Cooking
                              </label>
                  
                            </div>
                          </div>
                      
                        </div>
                      </fieldset>
                    </div>
                  </div>
                  <button>
                    <input
                    type="submit"
                    className="w-40 h-20 mt-24 mr-8 -ml-8 shadow-lg flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  />
                    
                  </button>
                </form>
              </div>

              {/* {worker.map((obj) => (
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
              ))} */}
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
};

export default DashboardWorker;
