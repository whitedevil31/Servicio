import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { workerRequest } from "../../types/types";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export default function () {
  const [workerRequest, setWorkerRequest] = useState<workerRequest[]>([]);

  useEffect(() => {
    const workerId = Cookies.get("user");
    axios
      .get(`http://localhost:5000/api/worker/request/${workerId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setWorkerRequest(response.data);
      });
  }, []);

  const AcceptJob = (id: string) => {
    fetch(`http://localhost:5000/api/request/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      Toastify({
        text: "✨ We will let the worker know that you have accepted their request. Thank you for using Servicio!",
        backgroundColor: "linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)",
        className: "info",
      }).showToast();
      // console.log(response);
      // alert(
      //   "We will let the worker know that you have accepted their request. Thank you for using Servicio!"
      // );
    });
  };

  const RejectJob = (id: string) => {
    fetch(`http://localhost:5000/api/request/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      Toastify({
        text: "😞 We will let the worker know that you could not accept their request. Thank you for using Servicio! Please do return to us!",
        backgroundColor: "linear-gradient(315deg, #6b0f1a 0%, #b91372 74%)",
        duration: 3000,
        className: "info",
      }).showToast();
      // console.log(response);
      // alert(
      //   "We will let the worker know that you could not accept their request. Thank you for using Servicio! Please do return to us!"
      // );
    });
  };

  return (
    <>
      {workerRequest.map((item: any) => (
        <div
          className="flex bg-
                  gray-300 ml-6 mt-20 h-52 w-4/6 shadow-2xl sm:rounded-2xl border-b-4 
               border-green-800 
               transition duration-300 ease-in-out hover:scale-y-125 hover:shadow-inner hover:bg-gray-200
               "
        >
          <div className="flex w-full ">
            <div className="flex w-1/2 flex-col h-full">
              <div className="flex pb-2 h-1/3">
                <img
                  className="h-10 w-10 mx-4 mt-4 rounded-b-full"
                  src="https://images.unsplash.com/photo-1521710696740-c8144a7eaf88?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                  alt=""
                ></img>{" "}
                <div className="flex w-full  h-8">
                  <h1 className=" text-2xl mt-2 text-green-800">
                    {item.client.username}
                  </h1>
                </div>
              </div>
              <div className="mx-4 h-2/3 pt-1">
                <p className=" text-sm font-bold text-green-800">
                  {item.client.age} Yrs
                </p>
                <div className="font-display text-mg text-green-800">
                  <b>Residence: </b>
                  <p>{item.client.residence}</p>
                </div>
                <div className="my-2">
                  {" "}
                  <button
                    className="w-16 h-8 mr-8  shadow-lg items-center justify-center text-base font-medium rounded-md text-green-700 border-2 border-green-600 hover:bg-green-700 hover:text-white"
                    onClick={() => AcceptJob(item._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="w-16 h-8  shadow-lg items-center justify-center text-base font-medium rounded-md text-red-500 border-2 border-red-600 hover:bg-red-600 hover:text-white"
                    onClick={() => RejectJob(item._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start mt-9  w-1/2">
              <div className="flex font-cursive text-xl text-green-800 my-2 ml-1  ">
                <b>Pay: ₹{item.pay}</b>
              </div>{" "}
              <div className="flex w-full  my-4">
                {item.services.map((item: any) => (
                  <div
                    className="bg-gray-700 text-white shadow-2xl p-2  mr-2 rounded-full text-sm flex-row h-8 flex justify-center items-center
                        hover:scale-125"
                  >
                    <p> {item}</p>
                  </div>
                ))}{" "}
              </div>
              <div className="p-2 bg-blue-900 text-white text-sm  rounded-2xl flex justify-center w-28  ">
                <p>{item.timeslots.start.startTime}</p>
                <p>{item.timeslots.start.startFormat}</p> -
                <p>{item.timeslots.end.endTime}</p>
                <p>{item.timeslots.end.endFormat}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
