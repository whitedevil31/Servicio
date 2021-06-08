import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AssignedClient } from "../../types/types";

export default function AssignedClientBar() {
  const [assignee, setAssignee] = useState<AssignedClient[]>([]);
  useEffect(() => {
    const workerId = Cookies.get("user");
    axios
      .get(`http://localhost:5000/api/worker/get/assigned/${workerId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setAssignee(response.data);
        //console.log(response.data);
      });
  }, []);

  return (
    <div className="font-display w-1/5 mb-3 mt-4 ml-48 bg-gray-100 rounded-md h-full shadow-2xl transition duration-400 ease-in-out hover:scale-y-125 hover:bg-gray-200 ">
      <div className="px-5 py-5">
        Assigned To:
        {assignee.length > 0 ? (
          assignee.map((obj) => (
            <div className="flex px-5 py-2 bg-indigo-100 rounded-xl mt-6 w-full hover:bg-indigo-200 shadow-inner">
              <div className="text-sm">
                <div className="text-sm flex-col">
                  <b>{obj.client.username}</b>
                  <div className="text-sm">{obj.client.residence}</div>
                </div>{" "}
                <div className="text-xs flex">
                  <div className="mt-4 flex flex-row text-white bg-gray-600 rounded-md p-2">
                    <p>{obj.timeslots.start.startTime} </p>
                    <p>{obj.timeslots.start.startFormat}</p> -
                    <p>{obj.timeslots.end.endTime}</p>
                    <p>{obj.timeslots.end.endFormat}</p>
                  </div>
                </div>
              </div>

              <div className="text-xs float-right">
                <b>₹{obj.pay}</b>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-red-700 p-3 mt-5 rounded-3xl text-white text-xs">
            Hey, you do not have any jobs at the moment! Create a new job!
          </div>
        )}
      </div>
    </div>
  );
}
