import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import {
  geoPosition,
  Coordinates,
  userType,
  UserDetails,
} from "../types/types";

export default function NavBar() {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [position, setPosition] = useState<Coordinates | null>();
  useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    };

    function error(err: any) {
      window.alert("Please enable location services to continue");
    }
    navigator.geolocation.getCurrentPosition(showPosition);
    function showPosition(position: geoPosition) {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      console.log(`More or less ${position.coords.accuracy} meters.`);
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }
    navigator.geolocation.getCurrentPosition(showPosition, error, options);
  }, []);

  const onSubmit = (data: UserDetails) => {
    if (position?.latitude === undefined) {
      return window.alert("Enable location or refresh the page to continue ");
    }
    const userData: userType = {
      location: {
        latitude: position!.latitude,
        longitude: position!.longitude,
      },
      ...data,
    };
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post("http://localhost:5000/api/register ", userData, config)
      .then((response) => {
        console.log(response);
        if (response.status == 201) {
          setTimeout(() => {
            Toastify({
              text: "✨ Successfully Registered!",
              backgroundColor:
                "linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)",
              className: "info",
            }).showToast();
            //alert("Successfully Registered");
            history.push("/login");
          }, 500);
        }
      });
  };

  return (
    <div>
      <div className="float-right w-2/4 mt-10 sm:mt-3 sm:mb-3 sm:mr-28">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow-2xl overflow-hidden sm:rounded-md ">
            <div className="px-2 py-2 shadow-inner bg-white sm:p-6 border-r-2 border-l-2 border-indigo-400">
              <label
                htmlFor="first_name"
                className="block text-2xl font-cursive text-indigo-900"
              >
                Get Started, Register now!
              </label>
              <div className="flex flex-row">
                <div className="mt-10 float-left w-1/2 ml-3 mr-5">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-indigo-700"
                  >
                    Username
                  </label>
                  {errors.username && (
                    <p className="name-error text-red-700 text-sm">
                      Username is a must.
                    </p>
                  )}
                  <input
                    type="text"
                    name="username"
                    ref={register({
                      required: true,
                    })}
                    autoComplete="off"
                    className="mt-1 h-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-2xl sm:text-sm border-gray-500 border-b-2 rounded-md transition duration-500 ease-in-out hover:shadow-inner"
                  ></input>
                </div>

                <div className="mt-10 float-right w-1/2 ml-3 mr-5">
                  <label className="block text-sm font-medium text-indigo-700">
                    Password
                  </label>
                  {errors.password && (
                    <p className="name-error text-red-700 text-sm">
                      Please enter a valid password.
                    </p>
                  )}
                  <input
                    type="password"
                    name="password"
                    ref={register({
                      required: true,
                      minLength: 5,
                    })}
                    className="mt-1 h-10 focus:ring-indigo-500  focus:border-indigo-500 block w-full shadow-xl sm:text-sm border-gray-500 border-b-2 rounded-md hover:shadow-inner"
                  ></input>
                  <p className="flex-col mt-2 text-xs text-indigo-400">
                    Use atleast <b>6-8 characters</b>
                  </p>
                </div>
              </div>

              <div className="flex flex-row ">
                <div className="mt-7 float-left w-1/3 ml-3 mr-5">
                  <label className="block text-sm font-medium text-indigo-700">
                    Age
                  </label>
                  {errors.age && (
                    <p className="name-error text-red-700 text-sm">
                      Please enter an appropriate age between 18 and 40.
                    </p>
                  )}
                  <input
                    type="number"
                    name="age"
                    autoComplete="off"
                    ref={register({
                      required: true,
                      pattern: /^(1[40]|[2-9][0-9])$/,
                    })}
                    className="mt-1 h-10 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-2xl sm:text-sm border-gray-500 border-b-2 rounded-md hover:shadow-inner"
                  ></input>
                </div>
                <div className="mt-7 float-left w-1/3 ml-3 mr-5">
                  <label className="block text-sm font-medium text-indigo-700">
                    Contact
                  </label>
                  {errors.contact && (
                    <p className="name-error text-red-700 text-sm">
                      Please enter an valid phone number.
                    </p>
                  )}
                  <input
                    type="number"
                    name="contact"
                    autoComplete="off"
                    ref={register({
                      required: true,
                      minLength: 10,
                    })}
                    className="mt-1 h-10 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-2xl sm:text-sm border-gray-500 border-b-2 rounded-md hover:shadow-inner"
                  ></input>
                </div>

                <div className="mt-7 float-right w-1/3 ml-3 mr-5">
                  <label className="block text-sm font-medium text-indigo-700">
                    Gender
                  </label>
                  {errors.gender && (
                    <p className="name-error text-red-700 text-sm">
                      Please enter your gender.
                    </p>
                  )}
                  <div className="mt-1">
                    <select
                      className="mt-1 h-10 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-2xl sm:text-sm border-gray-500 border-b-2 rounded-md hover:shadow-inner"
                      required
                      ref={register({
                        required: true,
                      })}
                      name="gender"
                    >
                      <option selected hidden>
                        Gender
                      </option>
                      <option className="select" value="Male">
                        Male
                      </option>
                      <option className="select" value="Female">
                        Female
                      </option>
                      <option className="select" value="Other">
                        Would rather not say
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-row ">
                <div className="mt-10 float-left w-1/2 ml-3 mr-5">
                  <label className="block text-sm font-medium text-indigo-700">
                    Residence/Area
                  </label>
                  {errors.residence && (
                    <p className="name-error text-red-700 text-sm">
                      Please give your address.
                    </p>
                  )}
                  <input
                    type="text"
                    name="residence"
                    id="area"
                    autoComplete="off"
                    ref={register({
                      required: true,
                    })}
                    className="mt-1 h-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-2xl sm:text-sm border-gray-500 border-b-2 rounded-md hover:shadow-inner"
                  ></input>
                </div>

                <div className="mt-10 float-right w-1/2 ml-3 mr-5">
                  <legend className="block text-sm font-medium text-indigo-700">
                    Role
                  </legend>
                  <select
                    className="mt-1 h-10 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-2xl sm:text-sm border-gray-500 border-b-2 rounded-md hover:shadow-inner"
                    ref={register({
                      required: true,
                    })}
                    name="role"
                  >
                    <option value="none" selected hidden>
                      Role
                    </option>
                    <option className="select" value="Utility Helper">
                      Utility Helper
                    </option>
                    <option className="select" value="User">
                      User
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-10 w-full ml-3 mr-5">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-indigo-700"
                >
                  About
                </label>
                {errors.about && (
                  <p className="name-error text-red-700 text-sm">
                    Give a short bio
                  </p>
                )}
                <div className="mt-1">
                  <textarea
                    name="about"
                    ref={register({
                      required: true,
                    })}
                    className="mt-1 h-15 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-2xl sm:text-sm border-gray-500 border-b-2 rounded-md hover:shadow-inner"
                    placeholder="Short Introduction"
                  ></textarea>
                </div>
                <p className="mt-2 text-xs text-indigo-400">
                  Let us know something about you.
                </p>
              </div>
              <button className="float-right">
                <input
                  type="submit"
                  className="border border-transparent text-base font-medium rounded-md text-indigo-50 bg-indigo-600 hover:bg-indigo-900 mb-3 md:py-2 md:text-sm md:px-4 cursor-pointer"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
