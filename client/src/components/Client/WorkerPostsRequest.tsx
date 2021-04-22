import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { GlobalContext } from "../../context/GlobalState";
import { timeslotData, ADD } from "../../types/types";

//This is the componentA that will display the worker posts, after the worker have opened themselves to jobs.


export function WorkerPosts() {
  const { workerData } = useContext(GlobalContext);
  console.log(workerData);
  const [selectSlot, setSelectSlot] = useState<string | null>(null);
  const [add, setAdd] = useState<ADD>();
  const { register, handleSubmit, errors } = useForm({
    criteriaMode: "all",
  });

  const timeslotSubmit = () => {
    console.log(selectSlot);
    let slotArray: string[] = [];
    if (selectSlot) {
      slotArray = selectSlot.split("+");
    }

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

    const timeslotData: timeslotData = {
      timeslots: selectedSlot,
      accepted: false,
      workerId: add?.workerId,
      services: add?.services,
      pay: add?.pay,
    };

    axios
      .post("http://localhost:5000/api/worker/request", timeslotData, config)
      .then((response) => {
        console.log(response);
        Toastify({
          text: "✨ Hey, you have successfully requested help. Please wait until furthur communication arrives!",
          backgroundColor: "linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)",
          className: "info",
        }).showToast();
        // alert(
        //   "Hey, you have successfully requested help. Please wait until furthur communication arrives!"
        // );
      });
  };
  return (
    <div className="w-2/3">
      {workerData ? (
        workerData.map((obj: any) => (
          <form onSubmit={handleSubmit(timeslotSubmit)} id="timeslot">
            <div className="flex flex-col">
              <div
                className="mb-5 mr-5 justify-between cursor-pointer bg-indigo-50 shadow-inner sm:rounded-2xl border-b-4 
               border-green-800 p-5
               transition duration-300 ease-in-out hover:scale-y-125 hover:bg-indigo-100
               "
              >
                <div className="flex w-full">
                  <div className="pb-2 h-1/3">
                    <img
                      className="h-8 w-8 rounded-b-full"
                      src="https://images.unsplash.com/photo-1521710696740-c8144a7eaf88?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                      alt=""
                    ></img>
                    <div className="w-full h-8">
                      <h1 className="font-display text-xl text-green-800">
                        {obj.user.username}
                      </h1>
                    </div>
                    <div className=" h-2/3 pt-1">
                      <p className="flex-col text-sm font-bold text-green-800">
                        Age: {obj.user.age}
                      </p>
                    </div>
                    <div className="text-xs flex h-full mt-5">
                      {obj.services.map((item: any) => (
                        <p
                          className="mt-2 mr-2 bg-gray-700 text-white shadow-2xl p-2 rounded-full text-xs flex-row 
                        hover:scale-125"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="ml-12 mt-8 font-display text-mg text-green-800">
                    <p>
                        <b className="mb-2">About:</b>
                        <br></br>
                        {obj.user.about}
                      </p>
                    </div>

                    <div className="text-xs flex ml-10">
                      {obj.timeslots.map((time: any) => (
                        <div className="flex-row mb-2 mr-3 mt-5 text-sm text-white">
                          <input
                            className="mr-20 bg-gray-600"
                            type="radio"
                            name="time"
                            ref={register}
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
                    </div>
                  </div>

                  {/* <a className="float-right w-12 h-12 px-5 py-5 shadow-lg  items-center justify-center rounded-full bg-green-300 hover:bg-green-500">
                  <i className="far fa-comments"></i>
                </a>*/}
                  <p className="ml-24 mt-7 font-cursive text-xl text-green-800">
                    <i className="fas fa-money-bill-wave"></i>
                    <b> ₹{obj.pay}</b>
                  </p>
                </div>

                <button
                  type="submit"
                  className="text-sm float-right font-display text-white bg-green-800 h-10  p-2 rounded-md"
                  onClick={() =>
                    setAdd({
                      pay: obj.pay,
                      services: obj.services,
                      workerId: obj.user._id,
                    })
                  }
                >
                  Hire Me!
                </button>
              </div>
            </div>
          </form>
        ))
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
