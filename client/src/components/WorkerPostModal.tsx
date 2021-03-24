import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";

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
interface Slot {
  startTime: string;
  endTime: string;
}
export default function WorkerModal() {
  const [startTime, setStartTime] = useState<string | null>("");
  const [endTime, setEndTime] = useState<string | null>("");
  const [slot, setSlot] = useState<any>([]);
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
    const data = { startTime: startTime, endTime: endTime };
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

    console.log(selected);
    console.log(data.pay);

    let config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const workerData: any = {
      ...data,
      services: selected,
      timeslots: slot,
    };
    console.log(workerData);
    // axios
    //   .post("http://localhost:5000/api/worker/post", workerData, config)
    //   .then((response) => {
    //     console.log(response);
    //   });
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
              <div className="bg-gray-200 w-3/4 py-2 px-3 rounded shadow-xl text-gray-800">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg mt-3 font-bold">Let's start here</h4>
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
                    <div>
                      <label className="mr-3 ml-5">Pay: </label>
                      <input
                        name="pay"
                        ref={register({
                          required: "This input is required.",
                          pattern: {
                            value: /\d+/,
                            message: "This input is number only.",
                          },
                          maxLength: {
                            value: 10,
                            message: "This input exceed maxLength.",
                          },
                        })}
                        autoComplete="off"
                        className="bg-transparent border-b-2 border-gray-500 shadow-inner h-4 px-3 py-3 rounded-md w-20"
                      ></input>
                      <div className="text-red-600">
                        <ErrorMessage
                          errors={errors}
                          name="pay"
                          render={({ messages }) => {
                            console.log("messages", messages);
                            return messages
                              ? Object.entries(
                                  messages
                                ).map(([type, message]) => (
                                  <p key={type}>{message}</p>
                                ))
                              : null;
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-5">
                      <label className="mr-3 ml-5">Services: </label>
                    </div>

                    <div className="mr-4 ml-4 mt-3 flex flex-row space-x-3">
                      <input
                        name="Plumbing"
                        ref={register}
                        type="checkbox"
                        value="Plumbing"
                        className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-400 rounded-full"
                      ></input>
                      <label className="font-medium mr-5 text-gray-700">
                        Plumbing
                      </label>

                      <input
                        name="Driver"
                        ref={register}
                        type="checkbox"
                        value="Driver"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      ></input>
                      <label className="font-medium text-gray-700">
                        Driver
                      </label>
                      <input
                        name="Carpentry"
                        ref={register}
                        type="checkbox"
                        value="Carpentry"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      ></input>
                      <label className="font-medium text-gray-700">
                        Carpenter
                      </label>
                      <input
                        name="Cleaning"
                        ref={register}
                        type="checkbox"
                        value="Cleaning"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      ></input>
                      <label className="font-medium text-gray-700">
                        Cleaning
                      </label>
                      <input
                        name="Cooking"
                        ref={register}
                        type="checkbox"
                        value="Cooking"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      ></input>
                      <label className="font-medium text-gray-700">Chef</label>
                    </div>
                  </div>

               
                    {/* <input
                      type="submit"
                      className="cursor-pointer h-12 mt-6 shadow-lg flex justify-center px-8 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                    /> */}
                 
                </form>{" "}
                <form onSubmit={timeslotSubmit} id="time">
                  {" "}
                  <div className="w-full h-12 border-3 border-red-500">
                    <h1 className="ml-5 mt-10">Select your time slots</h1>
                  </div>
                  <input
                    type="number"
                    className="px-1 py-1 ml-5"
                    placeholder="HH:MM"
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <input
                    id="endTime"
                    type="number"
                    className="px-1 py-1 ml-3"
                    placeholder="HH:MM"
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                  
                    <input type="submit" className="cursor-pointer h-6 shadow-lg ml-5 justify-center items-center px-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-900" />
                 
                </form>
                {slot.length == 0 ? (
                  <h1 className="ml-5 mt-10 font-extrabold">Time slots not created.</h1>
                ) : (
                  <div className="w-full h-12 border-3 border-red-500 flex flex-row">
                    {slot.map((item: any) => (
                      <div className="w-20 h-12 flex bg-indigo-800 text-white m-3 text-sm rounded-full justify-center items-center ">
                        <p>{item.startTime}</p> - <p>{item.endTime}</p>
                      </div>
                    ))}
                  </div>
                )}
                <input
                type="submit"
                className="cursor-pointer w-full h-12 mt-6 shadow-lg flex flex-col items-center justify-center px-8 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
              />
              </div>
              
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
