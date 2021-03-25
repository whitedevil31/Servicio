import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import WorkerPostModal from "./WorkerPostModal";
import axios, { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import NavBar from './NavBar'

const DashboardWorker = () => {
  const { register, handleSubmit } = useForm();
  const [client, setClient] = useState<any[]>([]);
  const [assignee, setAssignee] = useState<any[]>([]);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    var selected = new Array();
    var worker = document.getElementById("worker");

    if (worker) {
      var ticks = worker.getElementsByTagName("input");

      for (var i = 0; i < ticks.length; i++) {
        if (ticks[i].checked) {
          selected.push(ticks[i].value);
        }
      }
    }

    console.log(selected);
    console.log(data);

    let config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const workerData: any = {
      ...data,
      services: selected,
    };

    axios
      .post("http://localhost:5000/api/worker/post", workerData, config)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      {Cookies.get("worker") ? (
        <div className="w-full h-screen flex flex-col">
          
          <NavBar />
          <div className="w-screen h-full flex ">
            {/* {client.map((obj) => ( */}
            <div className="flex flex-col w-3/4  mr-4">
              <div
                className="flex bg-gray-100 ml-6 mt-4 h-40 w-full shadow-2xl sm:rounded-2xl border-b-4 
               border-green-800 
               transition duration-300 ease-in-out hover:scale-y-125 hover:shadow-inner hover:bg-gray-200
               "
              >
                <div className="flex flex-col">
                  <p className="px-4 py-4">Hey, Let's Get you started.</p>
                  <WorkerPostModal />
                </div>
              </div>

              <div
                className="flex bg-gray-300 ml-6 mt-20 h-52 w-full shadow-2xl sm:rounded-2xl border-b-4 
               border-green-800 
               transition duration-300 ease-in-out hover:scale-y-125 hover:shadow-inner hover:bg-gray-200
               "
              >
                <div className="flex">
                  <img
                    className="h-8 w-8 ml-6 mt-7 rounded-b-full"
                    src="https://images.unsplash.com/photo-1521710696740-c8144a7eaf88?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    alt=""
                  ></img>
                  <h1 className="flex ml-5 mt-6 float-left font-display text-xl text-green-800">
                    Name
                  </h1>
                  <p className="flex flex-row mt-16 -ml-12 float-left font-display text-sm font-bold text-green-800">
                    Age
                  </p>
                  <button className="w-14 h-8 mt-40 mr-12 -ml-8 shadow-lg items-center justify-center text-base font-medium rounded-md text-green-700 border-2 border-green-600 hover:bg-green-700 hover:text-white">
                    Accept
                  </button>
                  <button className="w-14 h-8 mt-40 mr-12 -ml-8 shadow-lg items-center justify-center text-base font-medium rounded-md text-red-700 border-2 border-red-600 hover:bg-red-700 hover:text-white">
                    Reject
                  </button>
                  <div className="mt-16 mr-2 -ml-32 mb-3 font-display text-mg text-green-800">
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Odit repellat quas velit.
                    </p>
                  </div>
                  <div className="flex float-right mt-12">
                    <a className="flex w-12 h-12 cursor-pointer px-5 py-5 shadow-lg rounded-full items-center justify-center bg-green-300 hover:bg-green-500">
                      <i className="far fa-comments"></i>
                    </a>
                    <p className="flex float-right mt-20 -mr-40 font-cursive text-xl text-green-800">
                      <b>₹20,000</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* ))} */}
            <div className="w-1/5 float-right bg-gray-100 rounded-md h-96 ml-5 mt-5 shadow-2xl transition duration-400 ease-in-out hover:scale-y-125 hover:bg-gray-200 ">
              <div className="px-5 py-5">
                Assigned To:
                {/* {assignee.map((obj) => ( */}
                <div className="flex px-5 py-5 bg-indigo-100 rounded-xl mt-6 w-full hover:bg-indigo-200 shadow-inner">
                  <div className="flex flex-col float-left">Thala</div>
                  <a className="flex flex-col float-right ml-24 mt-2 cursor-pointer">
                    <i className="far fa-comments"></i>
                  </a>
                </div>
                {/* ))} */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-screen">
          <div className="bg-red-600 rounded-lg flex items-center flex-col justify-center w-1/2 h-1/3">
            <h1 className="text-yellow-300 text-xl">
              You are not Authenticated{" "}
            </h1>
            <h3 className="text-yellow-300 text-xl">Kindly, Go back.</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardWorker;
