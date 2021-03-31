import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import WorkerPostModal from "./WorkerPostModal";
import axios, { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import NavBar from "./NavBar";

const DashboardWorker = () => {
  const { register, handleSubmit } = useForm();
  const [client, setClient] = useState<any[]>([]);
  const [selectSlot, setSelectSlot] = useState<any>();
  const [add, setAdd] = useState<any>();
  const [worker, setWorker] = useState<any[]>([]);
  const [assignee, setAssignee] = useState<any[]>([]);
  const [workerRequest, setWorkerRequest] = useState<any[]>([]);
  const [added, setAdded] = useState(false);
  useEffect(() => {
    const workerId = Cookies.get("uuid");
    console.log(workerId);
    axios
      .post(
        "http://localhost:5000/api/worker/filter",
        { services: [] },
        {
          headers: {
            "Content-Type": "application/json",
          },

          withCredentials: true,
        }
      )
      .then((response) => {
        setWorker(response.data);
        setWorkerRequest(response.data);
        console.log(response.data);
      });
  }, [added]);
  const [open, setOpen] = React.useState(false);
  const timeslotSubmit = (e: any) => {
    e.preventDefault();
    var slotArray = selectSlot.split("+");
    const selectedSlot = {
      start: { startTime: slotArray[0], startFormat: slotArray[1] },
      end: { endTime: slotArray[2], endFormat: slotArray[3] },
    };
    var selected = new Array();
    var time = document.getElementById("timeslot");

    if (time) {
      var ticks = time.getElementsByTagName("input");

      for (var i = 0; i < ticks.length; i++) {
        if (ticks[i].checked) {
          selected.push(ticks[i].value);
        }
      }
    }
    let config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const timeslotData: any = {
      timeslots: selectedSlot,
      accepted: false,
      workerId: add.workerId,
      services: add.services,
      pay: add.pay,
    };

    axios
      .post("http://localhost:5000/api/worker/request", timeslotData, config)
      .then((response) => {
        console.log(response);
        alert(
          "Hey, you have successfully requested help. Please wait until furthur communication arrives!"
        );
      });
  };

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
          Cookies.remove("uuid");
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
        <div className="w-screen h-screen flex flex-col">
          <NavBar />
          <div className="w-screen h-full flex ">
            <div className="flex flex-col w-screen">
              <div
                className="flex bg-gray-100 ml-6 mt-4 h-40 w-full p-5 shadow-2xl sm:rounded-2xl border-b-4 
               border-green-800 
               transition duration-300 ease-in-out hover:scale-y-125 hover:shadow-inner hover:bg-gray-200
               "
              >
                <div className="flex flex-col">
                  <p className="px-4 py-4">Hey, Let's Get you started.</p>
                  <WorkerPostModal />
                </div>
              </div>
              <div className="w-1/2 h-full mr-4">
                {worker.map((obj) => (
                  <form onSubmit={timeslotSubmit} id="timeslot">
                    <div
                      className="flex justify-between cursor-pointer bg-indigo-50 ml-6 mt-8 w-11/12 shadow-inner sm:rounded-2xl border-b-4 
               border-green-800 
               transition duration-300 ease-in-out hover:scale-y-125 hover:bg-indigo-100
               "
                    >
                      {" "}
                      <img
                        className="h-8 w-8 ml-6 mt-7 rounded-b-full"
                        src="https://images.unsplash.com/photo-1521710696740-c8144a7eaf88?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                        alt=""
                      ></img>
                      <h1 className="ml-5 mt-6 mr-5 font-display text-xl text-green-800">
                        {obj.user.username}
                      </h1>
                      <p className="flex-row mt-16 mr-5 -ml-12 font-display text-sm font-bold text-green-800">
                        Age{obj.user.age}
                      </p>
                      <div className="flex-col">
                        <p className="ml-1 mt-9 mr-2 mb-3 font-display text-mg text-green-800">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Odit repellat quas velit.
                        </p>
                        <div className="text-xs flex">
                          {obj.services.map((item: any) => (
                            <p
                              className="mt-2 mr-2 bg-gray-700 text-white shadow-2xl p-2 rounded-full text-xs flex-row 
                        hover:scale-125"
                            >
                              {item}
                            </p>
                          ))}
                        </div>
                        <div className="text-xs flex">
                          {obj.timeslots.map((time: any) => (
                            <div className="flex-row mb-2 mr-3 mt-5 text-sm text-white">
                              <input
                                className="mr-20 bg-gray-600"
                                type="radio"
                                name="time"
                                value={`${time.start.startTime} + ${time.start.startFormat} + ${time.end.endTime} + ${time.end.endFormat}`}
                                onChange={(e) => setSelectSlot(e.target.value)}
                              />
                              <div className="flex flex-row bg-gray-600 p-2 rounded-full text-xs">
                                <p>{time.start.startTime} </p>
                                <p>{time.start.startFormat}</p> -
                                <p>{time.end.endTime}</p>
                                <p>{time.end.endFormat}</p>
                              </div>
                            </div>
                          ))}
                          <input
                            type="submit"
                            className="text-sm text-white bg-green-800 h-8  p-2 rounded-full"
                            onClick={() =>
                              setAdd({
                                pay: obj.pay,
                                services: obj.services,
                                workerId: obj.user._id,
                              })
                            }
                          />
                        </div>
                      </div>
                      <a className="ml-2 -mr-10 mt-12 w-12 h-12 px-5 py-5 shadow-lg flex items-center justify-center rounded-full bg-green-300 hover:bg-green-500">
                        <i className="far fa-comments"></i>
                      </a>
                      <p className="flex mt-28 mr-5 font-cursive text-xl text-green-800">
                        <b>₹{obj.pay}</b>
                      </p>
                    </div>
                  </form>
                ))}
              </div>
            </div>

            {/* {client.map((obj) => ( */}

            <div className="w-1/5 float-right bg-gray-100 rounded-md h-96 ml-5 mt-52 shadow-2xl transition duration-400 ease-in-out hover:scale-y-125 hover:bg-gray-200 ">
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
