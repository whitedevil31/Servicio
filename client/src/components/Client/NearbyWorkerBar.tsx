import React, { useState, useEffect } from "react";
import axios from "axios";
import { nearbyWorker } from "../../types/types";
import NearbyHireModal from "../Client/NeabyHireModal";

// Near by workers are shown from the API endpoint and the values are passed to the REQUEST endpoint through which work requests are made


export default function NearbyWorker() {
  const [workernearby, setWorkernearby] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/nearby", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        setWorkernearby(response.data);
        // console.log(response.data);
      });
  }, []);

  return (
    <div className="bg-gray-200 shadow-2xl rounded-2xl h-full w-1/5 mt-5 mr-5">
      <div className="font-bold text-black text-mg px-5 py-7">
        Workers Near By:
        {workernearby.length > 0 ? (
          workernearby.map((obj) => (
            <div className="flex px-5 py-2 bg-indigo-100 rounded-xl mt-6 w-full hover:bg-indigo-200 shadow-inner">
              <div className="text-sm">
                <NearbyHireModal workerData={obj} />
                <div className="text-sm flex-col">{obj.user.username}</div>
                <div className="text-xs flex-row">₹{obj.pay}</div>
                <div className="text-xs flex">
                  {obj.services.map((item: any) => (
                    <p className="mt-2 mr-2 bg-gray-400 p-2 rounded-full text-xs flex-row">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-red-700 p-3 mt-5 rounded-3xl text-white text-xs">
            Sorry, there are no helpers around your location
          </div>
        )}
      </div>
    </div>
  );
}
