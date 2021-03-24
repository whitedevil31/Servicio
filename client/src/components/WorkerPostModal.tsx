import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useForm } from "react-hook-form";
import axios, { AxiosRequestConfig } from "axios";

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

  const { register, handleSubmit } = useForm();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
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
          <div className={classes.paper}>
            <div className="flex-row float-left px-5">
              <img
                className="h-8 w-8 mr-0 rounded-full"
                src="https://images.unsplash.com/photo-1521710696740-c8144a7eaf88?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt=""
              ></img>
              <input
                className="px-5 py-5 h-5 w-96 mt-4 rounded-md cursor-pointer "
                type="text"
                placeholder="Enter post"
                id="delete-btn"
              ></input>

              <div
                className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center"
                id="overlay"
              >
                <div className="bg-gray-200 max-w-2xl py-2 px-3 rounded shadow-xl text-gray-800">
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

                  <form onSubmit={handleSubmit(onSubmit)} id="worker" >
                  <div className="flex flex-col mt-10">
                    <div>
                      <label className="mr-3 ml-5">Pay: </label>
                      <input
                        type="number"
                        ref={register}
                        className="h-4 px-3 py-3 rounded-md w-20"
                      ></input>
                    </div>

                    <div className="mt-5">
                      <label className="mr-3 ml-5">Services: </label>
                    </div>

                    <div className="mr-4 ml-4 mt-3 flex flex-row space-x-3">
                      <input
                        id="plumbing"
                        name="plumbing"
                        ref={register}
                        type="checkbox"
                        value="plumbing"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      ></input>
                      <label className="font-medium text-gray-700">
                        Plumbing
                      </label>

                      <input
                        id="plumbing"
                        name="plumbing"
                        ref={register}
                        type="checkbox"
                        value="Driver"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      ></input>
                      <label className="font-medium text-gray-700">
                        Driver
                      </label>
                      <input
                        id="plumbing"
                        name="plumbing"
                        ref={register}
                        type="checkbox"
                        value="Carpentry"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      ></input>
                      <label className="font-medium text-gray-700">
                        Carpenter
                      </label>
                      <input
                        id="plumbing"
                        name="plumbing"
                        ref={register}
                        type="checkbox"
                        value="Cleaning"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      ></input>
                      <label className="font-medium text-gray-700">
                        Cleaning
                      </label>
                      <input
                        id="plumbing"
                        name="plumbing"
                        ref={register}
                        type="checkbox"
                        value="cooking"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      ></input>
                      <label className="font-medium text-gray-700">
                        Chef
                      </label>
                    </div>
                    

                    <button>
                    <input
                      type="submit"
                      className="w-12 h-12 mr-8 shadow-lg flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    />
                  </button>
                  </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
