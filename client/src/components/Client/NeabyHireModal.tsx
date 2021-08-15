import React, { useState, useEffect, useContext } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useForm } from "react-hook-form";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { timeslotData, DATA, workerModal } from "../../types/types";

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
      padding: theme.spacing(2, 2, 2),
    },
  })
);

const NearbyModal: React.FC<workerModal> = (props: workerModal) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [selectSlot, setSelectSlot] = useState<string | null>(null);
  const [data, setData] = useState<DATA>();
  const { register, handleSubmit, errors } = useForm({
    criteriaMode: "all",
  });

  const timeslotSubmit = () => {
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
      workerId: data?.workerId,
      services: data?.services,
      pay: data?.pay,
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
        setOpen(false);
      });
  };

  return (
    <div>
      <button>
        <p className="mt-2 font-display" onClick={handleOpen}>
          <b>View </b>
          <i className="fas fa-eye"></i>
        </p>
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
          <div className="flex-row float-left px-5 pb-12">
            <div
              className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center"
              id="overlay"
            >
              <div className="bg-white w-2/4 h-5/7  px-3 rounded shadow-xl text-gray-800 pb-4">
                <div className="flex justify-between items-center  ">
                  <h4 className="mt-3 mb-5 font-bold font-display">
                    Hire your helpers now!
                  </h4>
                  <button onClick={handleClose}>
                    <svg
                      className="h-6 w-6 bg-white cursor-pointer p-1 hover:bg-gray-300 rounded-full"
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
                <form onSubmit={handleSubmit(timeslotSubmit)} id="timeslot">
                  <div className="flex w-full">
                    <div className="pb-2 w-1/3 h-1/3">
                      <img
                        className="h-8 w-8 rounded-b-full"
                        src="https://images.unsplash.com/photo-1521710696740-c8144a7eaf88?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                        alt=""
                      ></img>
                      <span className="w-full h-8">
                        <h1 className="w-1/3 font-display text-xl text-green-800 font-semibold">
                          {props.workerData.user.username}
                        </h1>
                      </span>

                      <span className="w-1/3 h-2/3 pt-1">
                        <p className="flex-col text-sm font-bold text-green-800">
                          Age: {props.workerData.user.age}
                        </p>
                      </span>
                      <div className="text-xs  flex h-full mt-5">
                        {props.workerData.services.map((item: any) => (
                          <p
                            className="mt-3 mr-3 w-32 bg-gray-300 font-semibold text-gray-700 shadow-2xl p-2 rounded-full text-xs flex-row 
                            hover:scale-125"
                          >
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="w-2/3">
                      <div className="ml-12 w-3/4 font-display text-mg text-green-800">
                        <p>
                          <b className="mb-2 underline">About</b>
                          <br></br>
                          {props.workerData.user.about}
                        </p>
                      </div>
                      <div className="text-xs font-semibold flex ml-10">
                        {props.workerData.timeslots.map((time: any) => (
                          <div className="flex-row mb-2 mr-3 mt-5 text-sm text-white">
                            <input
                              className="mr-20 bg-gray-600"
                              type="radio"
                              name="time"
                              required
                              ref={register}
                              value={`${time.start.startTime} + ${time.start.startFormat} + ${time.end.endTime} + ${time.end.endFormat}`}
                              onChange={(e) => setSelectSlot(e.target.value)}
                            />
                            <div className="flex flex-row bg-gray-600 p-2 rounded-md text-xs">
                              <p>{time.start.startTime}</p>
                              <p>{time.start.startFormat}</p> -
                              <p>{time.end.endTime}</p>
                              <p>{time.end.endFormat}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-1/3 flex flex-col justify-start">
                      <button
                        type="submit"
                        className="flex mx-8 justify-center items-center text-sm font-display text-white bg-green-800 h-10  p-2 rounded-md"
                        onClick={() =>
                          setData({
                            pay: props.workerData.pay,
                            services: props.workerData.services,
                            workerId: props.workerData.user._id,
                          })
                        }
                      >
                        Hire Me!
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default NearbyModal;
