import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalState";
import { useContext } from "react";
import { FilterData } from "../../types/types";
import Select from "react-select";

export default function FilterService() {
  const myArray = [
    { value: "plumber", label: "plumber" },
    { value: "cooking", label: "cook" },
    { value: "Carpenter", label: "carpentry" },
    { value: "driver", label: "Driver" },
  ];
  interface SEARCH {
    value: string;
    label: string;
  }
  const { addFilter, workerData } = useContext(GlobalContext);
  const [hiredworker, setHiredWorker] = useState<any[]>([]);
  const [search, setSearch] = useState<SEARCH | null>({
    value: "",
    label: "",
  });
  const handleChange = (selectedOption: any) => {
    setSearch(selectedOption);
  };

  const { register, handleSubmit, errors } = useForm({
    criteriaMode: "all",
  });

  const filterData: FilterData = {
    services: [],
  };

  useEffect(() => {
    // console.log(filterData);
    axios
      .post(
        "http://localhost:5000/api/worker/filter",
        filterData,

        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        addFilter(response.data);
      });
  }, []);

  const filterServiceSubmit = (data: FilterData) => {
    var selected = new Array();
    var service = document.getElementById("service");

    if (service) {
      var ticks = service.getElementsByTagName("input");

      for (var i = 0; i < ticks.length; i++) {
        if (ticks[i].checked) {
          selected.push(ticks[i].value);
        }
      }
    }

    let config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const filterData: FilterData = {
      services: [search!.value],
    };
    console.log(filterData);
    axios
      .post("http://localhost:5000/api/worker/filter", filterData, config)
      .then((response) => {
        addFilter(response.data);
        console.log(response.data);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        axios
          .get(
            `http://localhost:5000/api/client/get/${response.data.username}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          )
          .then((response) => {
            setHiredWorker(response.data);
          });
      });
  }, []);
  return (
    <div className="w-1/5 pl-6 py-3 font-bold  bg-gray-200 shadow-2xl rounded-2xl h-full ml-2 mr-2 mt-5">
      <div className="mb-3">Select the service: </div>
      <div className="mb-5 w-3/4">
        <form onSubmit={handleSubmit(filterServiceSubmit)} id="service">
          <div className="flex items-center mb-2">
            {/* <Select
        onFocus={() => setSearch(null)}
        isMulti
        name="services"
        options={myArray}
        ref={register}
        className="w-32 basic-multi-select"
        classNamePrefix="select"
        placeholder="Services"
        openMenuOnClick={false}
  /> */}
            <Select
              value={search}
              options={myArray}
              onChange={handleChange}
              ref={register}
              placeholder="Services"
              openMenuOnClick={false}
              className="w-44 py-2 h-12"
            />
            {/* <input
              type="text"
              placeholder="Search"
              className="mt-1 mb-5 h-8 px-2 py-2 block w-full shadow-sm text-black sm:text-sm bg-gray-300 rounded-md"
            ></input> */}
            <button
              className="w-8 h-8 mt-1 cursor-pointer h-7 w-5 flex ml-3 shadow-lg justify-center items-center px-3  border border-transparent text-xs rounded-md text-white bg-gray-600 hover:bg-grey-900"
              type="submit"
            >
              <i className="fas fa-search-plus"></i>
            </button>
          </div>
          {/* <div className="flex items-center mb-2">
            <input
              name="plumber"
              type="radio"
              value="plumber"
              ref={register}
              className="focus:ring-gray-800 h-3 w-3 text-gray-800 border-gray-300 mr-5"
            />
            <label>Plumber</label>
          </div>

          <div className="flex items-center mb-2">
            <input
              name="Chef"
              type="radio"
              value="cooking"
              ref={register}
              className="focus:ring-gray-800 h-3 w-3 text-gray-800 border-gray-300 mr-5"
            />
            <label>Cook</label>
          </div> */}

          {/* <div className="flex items-center mb-2">
            <input
              name="Electrician"
              type="radio"
              value="electrician"
              ref={register}
              className="focus:ring-gray-800 h-3 w-3 text-gray-800 border-gray-300 mr-5"
            />
            <label>Electrician</label>
          </div> */}

          {/* <div className="flex items-center mb-2">
            <input
              type="radio"
              name="Driver"
              value="driver"
              ref={register}
              className="focus:ring-gray-800 h-3 w-3 text-gray-800 border-gray-300 mr-5"
            />
            <label>Driver</label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              name="Cleaning"
              value="cleaning"
              ref={register}
              className="focus:ring-gray-800 h-3 w-3 text-gray-800 border-gray-300 mr-5"
            />
            <label>House Keeper</label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              name="Carpenter"
              value="carpenter"
              ref={register}
              className="focus:ring-gray-800 text-gray-800 border-gray-300 mr-5"
            />
            <label>Carpenter</label>
          </div> */}
        </form>
      </div>
      Hired workers:
      {hiredworker.map((obj) => (
        <div className="flex-row px-5 py-5 bg-indigo-100 rounded-xl mt-6 w-full h-full hover:bg-indigo-200 shadow-inner">
          <div className="text-black">{obj.assign.worker}</div>
        </div>
      ))}
    </div>
  );
}
