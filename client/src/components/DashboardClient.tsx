import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import axios, { AxiosRequestConfig } from "axios";
import NavBar from './NavBar'

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
          <NavBar />
          <div className="w-full bg-gray-300 h-full flex justify-center">
            <div className="w-1/5 px-7 py-7 font-bold  bg-gray-200 shadow-2xl rounded-2xl h-full mr-5 mt-5">
              Selected workers: 
              {/* {hiredworker.map((obj) => ( */}
                <div className="flex px-5 py-5 bg-indigo-100 rounded-xl mt-6 w-full hover:bg-indigo-200 shadow-inner">
                  <div className="flex flex-col float-left">Thala</div>
                  <a className="flex flex-col float-right ml-24 mt-2 cursor-pointer">
                    <i className="far fa-comments"></i>
                  </a>
                </div>
                {/* ))} */}
            </div>

            <div className="w-1/2 h-full mr-4">
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

            <div className="bg-gray-200 shadow-2xl rounded-2xl h-1/2 mt-5">
              <div className="xl:flex uppercase font-bold text-black text-lg px-4 py-7">
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
