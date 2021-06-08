import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SLOT } from "../../types/types";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export default function WorkerModal() {
  const [startTime, setStartTime] = useState<string | null>("");
  const [startFormat, setStartFormat] = useState<string | null>("");
  const [endTime, setEndTime] = useState<string | null>("");
  const [endFormat, setEndFormat] = useState<string | null>("");

  const [slot, setSlot] = useState<SLOT[]>([]);
  const { register, handleSubmit, errors } = useForm({
    criteriaMode: "all",
  });
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const timeslotSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      start: { startTime, startFormat },
      end: { endTime, endFormat },
    };
    console.log(data);

    setSlot((slot: any) => [...slot, data]);

    e.target.reset();
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

    // console.log(selected);
    // console.log(data);

    let config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const workerData: any = {
      pay: data.pay,
      services: selected,
      timeslots: slot,
    };
    console.log(workerData);
    axios
      .post("http://localhost:5000/api/worker/post", workerData, config)
      .then((response) => {
        //console.log(response);
        Toastify({
          text: "✨ Koodos! You have successfully registered a job request! Thank you for using Servicio!",
          backgroundColor: "linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)",
          className: "info",
        }).showToast();
        setOpen(false);
      });
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        <input
          className="ml-3 mt-5 px-2 py-2 w-96 rounded-2xl cursor-pointer"
          placeholder="Create a post"
        ></input>
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="flex-row float-left px-5">
            <div
              className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center"
              id="overlay"
            >
              <div className="bg-gray-200 w-1/2 h-2/3 py-2 px-3 rounded shadow-xl text-gray-800">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg mt-3 ml-5 font-bold font-display underline">
                    Let's get started here
                  </h4>
                  <button onClick={handleClose}>
                    <svg
                      className="h-6 w-6 cursor-pointer p-1 hover:bg-gray-300 rounded-full"
                      id="close-modal"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} id="worker">
                  <div className="flex flex-col mt-10">
                    <div className="flex justify-end ">
                      <button
                        type="submit"
                        className="cursor-pointer h-12 w-40 shadow-lg items-center justify-center mb-5 ml-5 border border-transparent text-base font-medium rounded-md text-white bg-green-400 hover:bg-green-600"
                      >
                        Create Work Post!
                      </button>
                    </div>
                    <div>
                      <label className="mr-3 ml-5 text-lg font-display">
                        Pay:{" "}
                      </label>
                      <input
                        type="number"
                        name="pay"
                        ref={register({
                          required: "This input is required.",
                        })}
                        autoComplete="off"
                        className=" border-b-2 border-gray-500 shadow-inner h-4 px-4 py-4 rounded-lg w-24"
                      ></input>
                      <div className="text-red-600">
                        {errors.pay && (
                          <p className="ml-5 mt-2 name-error text-red-700 text-sm">
                            Please enter the pay you require.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex mt-7">
                      <label className="mr-96 ml-5 font-display text-lg">
                        Services you provide:{" "}
                      </label>
                    </div>

                    <div className="mr-4 ml-4 mt-6 flex flex-row space-x-3">
                      <input
                        name="Plumber"
                        ref={register}
                        type="checkbox"
                        value="plumber"
                        className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-400 rounded-full"
                      ></input>
                      <label className="font-medium mr-5 text-gray-700">
                        Plumbing
                      </label>

                      <input
                        name="Driver"
                        ref={register}
                        type="checkbox"
                        value="driver"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      ></input>
                      <label className="font-medium text-gray-700">
                        Driver
                      </label>
                      <input
                        name="Carpentry"
                        ref={register}
                        type="checkbox"
                        value="housekeep"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      ></input>
                      <label className="font-medium text-gray-700">
                        House Keeping
                      </label>
                      <input
                        name="Cleaning"
                        ref={register}
                        type="checkbox"
                        value="cleaning"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      ></input>
                      <label className="font-medium text-gray-700">
                        Laundry
                      </label>
                      <input
                        name="Cooking"
                        ref={register}
                        type="checkbox"
                        value="cook"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      ></input>
                      <label className="font-medium text-gray-700">Cook</label>
                    </div>
                  </div>
                </form>{" "}
                <form onSubmit={timeslotSubmit} id="time">
                  {" "}
                  <div className="w-full h-12 border-3 border-red-500">
                    <h1 className="ml-5 mt-6 ont-display text-lg">
                      Select your time slots:
                    </h1>
                  </div>
                  <div className="flex">
                    <input
                      type="time"
                      name="startingtime"
                      ref={register}
                      className="px-1 py-1 ml-5"
                      placeholder="HH:MM"
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                    <div className="text-sm ml-3 text-red-700">
                      {errors.startingtime && "Enter starting time."}
                    </div>
                    {/* <select
                      className="mt-1 ml-3 h-10 px-2 py-2 focus:ring-indigo-500  block w-20 shadow-2xl sm:text-sm border-gray-500 border-b-2 rounded-md hover:shadow-inner "
                      name="AM/PM"
                      onChange={(e) => setStartFormat(e.target.value)}
                    >
                      <option value="none" selected hidden>
                        M
                      </option>
                      <option className="select mr-5" value="AM">
                        AM
                      </option>
                      <option className="select" value="PM">
                        PM
                      </option>
                    </select> */}
                    <div className="mr-2 mt-1">to</div>
                    <input
                      id="endTime"
                      type="time"
                      ref={register}
                      name="endtime"
                      className="px-1 py-1"
                      placeholder="HH:MM"
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                    <div className="text-sm ml-3 text-red-700">
                      {errors.endtime && "Enter ending time."}
                    </div>
                    {/* <select
                      className="mt-1 ml-3 h-10 px-2 py-2 focus:ring-indigo-500  block w-20 shadow-2xl sm:text-sm border-gray-500 border-b-2 rounded-md hover:shadow-inner "
                      name="AM/PM"
                      onChange={(e) => setEndFormat(e.target.value)}
                    >
                      <option value="none" selected hidden>
                        M
                      </option>
                      <option className="select" value="AM">
                        AM
                      </option>
                      <option className="select" value="PM">
                        PM
                      </option>
                    </select> */}
                    <button
                      className="cursor-pointer h-10 w-24 flex shadow-lg ml-5 justify-center items-center px-3 p-b-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-900"
                      type="submit"
                    >
                      Set Time
                    </button>
                  </div>
                </form>
                {slot.length == 0 ? (
                  <h1 className="ml-5 mt-10 font-extrabold">
                    Time slots not created.
                  </h1>
                ) : (
                  <div className="w-full h-12 border-3 border-red-500 flex flex-row">
                    {slot.map((item: any) => (
                      <div className="w-32 h-12 flex bg-indigo-800 text-white m-3 text-sm rounded-full justify-center items-center ">
                        <p>{item.start.startTime}</p>
                        <p>{item.start.startFormat}</p>-
                        <p>{item.end.endTime}</p>
                        <p>{item.end.endFormat}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
