import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useForm } from "react-hook-form";
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

export default function HireModal() {

  const [hire, setHire] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/worker/get", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setHire(response.data);
      });
  });

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, errors } = useForm({
    criteriaMode: "all",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    alert("yov poda");
  };
  return (
    <div>
      <button
        className="w-14 h-8 mt-24 mr-8 -ml-8 shadow-lg flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        onClick={handleOpen}
      >
        Hire!
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
          <div className="bg-gray-200 w-3/4 h-1/3 py-2 px-3 rounded shadow-xl text-gray-800">
            <div className="flex justify-between items-center">
              <h4 className="text-lg mt-3 ml-5 font-bold font-display">
                Select required timeslots:
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
                </div>
              </div>

              <input
                type="submit"
                className="cursor-pointer h-12 w-24 shadow-lg items-center justify-center mb-5 ml-5 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
              />
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
