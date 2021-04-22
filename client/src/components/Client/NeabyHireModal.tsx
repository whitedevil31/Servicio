import React, { useState, useEffect, useContext } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useForm } from "react-hook-form";
import axios from "axios";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
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
      padding: theme.spacing(2, 4, 3),
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
        <i className="far fa-check-circle" onClick={handleOpen}></i>
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
              <div className="bg-gray-800 w-2/4 h-5/7 py-2 px-3 rounded shadow-xl text-gray-800">
                <div className="flex justify-between items-center">
                  <h4 className="text-white mt-3 mb-5 font-bold font-display">
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
                  <h1 className="text-white text-md h-1/5 w-full p-2 bg-gray-600 border-2 border-gray-400 rounded-md">
                    Name: {props.workerData.user.username}
                  </h1>
                  <div className="flex">
                    <h3 className="mt-3 mr-3 text-white w-full p-2 bg-gray-600 border-2 border-gray-400 rounded-md">
                      Pay: {props.workerData.pay}
                    </h3>
                    <h3 className="mt-3 text-white w-full p-2 bg-gray-600 border-2 border-gray-400 rounded-md">
                      Age: {props.workerData.user.age}
                    </h3>
                  </div>
                  <h5 className="mt-3 text-xs text-white w-full p-2 bg-gray-600 border-2 border-gray-400 rounded-md">
                    About: {props.workerData.user.about}
                  </h5>
                  <div className="text-white text-xs mt-5 h-1/5 w-full p-2 bg-gray-600 border-2 border-gray-400 rounded-md">
                    Timeslots
                    {props.workerData.timeslots.map((time: any) => (
                      <div className="flex mb-2 mr-3 mt-5 text-sm text-white">
                        <input
                          className=" mr-3 bg-white"
                          type="radio"
                          name="time"
                          ref={register}
                          value={`${time.start.startTime} + ${time.start.startFormat} + ${time.end.endTime} + ${time.end.endFormat}`}
                          onChange={(e) => setSelectSlot(e.target.value)}
                        />
                        <div className="flex flex-row bg-gray-600 rounded-full text-xs">
                          <p>{time.start.startTime} </p>
                          <p>{time.start.startFormat}</p> -
                          <p>{time.end.endTime}</p>
                          <p>{time.end.endFormat}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs flex h-full mt-5">
                    {props.workerData.services.map((item: any) => (
                      <p
                        className="mt-3 mr-3 w-32 bg-gray-300 text-gray-700 shadow-2xl p-2 rounded-full text-xs flex-row 
                            hover:scale-125"
                            >
                              {item}
                            </p>
                          ))}
                          </div>
                          <button
                  type="submit"
                  className="text-sm float-right text-white bg-gray-700 h-10  p-2 rounded-full"
                  onClick={() =>
                    setData({
                      pay: props.workerData.pay,
                      services: props.workerData.services,
                      workerId: props.workerData.user._id,
                    })
                  }
                >Hire Me!</button>
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
