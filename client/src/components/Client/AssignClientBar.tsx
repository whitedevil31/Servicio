import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";


export default function AssignedClientBar() {

  const [assignee, setAssignee] = useState<any[]>([]);
  console.log('wprker')
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
        //setAssignee(response.data);
        console.log(response.data)
      });
  }, []);

  return (
    <div className="w-1/5 mt-10 ml-36 bg-gray-100 rounded-md h-96 shadow-2xl transition duration-400 ease-in-out hover:scale-y-125 hover:bg-gray-200 ">
      <div className="px-5 py-5">
        Assigned To:
         {assignee.map((obj) => (
        <div className="flex px-5 py-5 bg-indigo-100 rounded-xl mt-6 w-full hover:bg-indigo-200 shadow-inner">
          <div className="flex flex-col float-left"><b>{obj.client.username}</b></div>
          <a className="flex flex-col float-right ml-24 mt-2 cursor-pointer">
            <i className="far fa-comments"></i>
          </a>
        </div>
         ))} 
      </div>
    </div>
  );
}
