import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = React.useState<any[]>(['']);
  const [age, setAge] = React.useState<any[]>(['']);
  const [password, setPassword] = React.useState<any[]>(['']);
  const [gender, setGender] = React.useState<any[]>(['']);
  const [residence, setResidence] = React.useState<any[]>(['']);
  const [role, setRole] = React.useState<any[]>(['']);
  const [about, setAbout] = React.useState<any[]>(['']);

  let history = useHistory();

  const handleChangeRole = (event: any) => {
    setRole(event.target.value);
  };

  const handleChangeGender = (event: any) => {
    setGender(event.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
      age: age,
      gender: gender,
      about: about,
      role: role,
      residence: residence,
    };

    axios
      .post("http://localhost:3000/register/client", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then((response) => {
        const { data } = response;
        console.log(data);
        console.log(response);
      });
  };
  return (
    <div>
      <div className="mt-10 sm:mt-10 sm:ml-16">
        <div className="md:grid md:grid-cols-2 md:gap-2">
          <div className="md:col-span-1">
            <form action="#" method="POST" onSubmit={handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md ">
                <div className="px-4 py-5 bg-white sm:p-6 border-r-2 border-indigo-400">
                  <div className="grid grid-cols-6 gap-10">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-indigo-700"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        
                        autoComplete="given-name"
                        className="mt-1 h-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-500 border-b-2  rounded-md"
                      ></input>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-indigo-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        value={password}
                        name="password"
                        id="password"
          
                        className="mt-1 h-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-500 border-b-2 rounded-md"
                      ></input>
                      <p className="mt-2 text-sm text-indigo-700">
                        Use atleast 6-8 characters, include numbers and
                        uppercase.
                      </p>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label className="block text-sm font-medium text-indigo-700">
                        Age
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          value={age}
                          className="mt-1 h-10 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-500 border-b-2 rounded-md"
                        ></input>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-indigo-700"
                      >
                        Gender
                      </label>
                      <div className="mt-1">
                        <select
                          className="mt-1 h-10 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-500 border-b-2 rounded-md"
                          value={gender}
                          onChange={handleChangeGender}
                        >
                          <option value="none" selected hidden>
                            Gender
                          </option>
                          <option className="select" value="Male">
                            Male
                          </option>
                          <option className="select" value="Female">
                            Female
                          </option>
                          <option className="select" value="Other">
                            Other
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-indigo-700"
                      >
                        Residence/Area
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="area"
                          id="area"                    
                          className="mt-1 h-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-500 border-b-2  rounded-md"
                        ></input>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <legend className="block text-sm font-medium text-indigo-700">
                        Role
                      </legend>
                      <div className="mt-1 space-y-4">
                        <select
                          className="mt-1 h-10 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-500 border-b-2 rounded-md"
                          value={role}
                          onChange={handleChangeRole}
                        >
                          <option value="none" selected hidden>
                            Role
                          </option>
                          <option className="select" value="Male">
                            Utility Helper
                          </option>
                          <option className="select" value="Female">
                            User
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-indigo-700"
                      >
                        About
                      </label>
                      <div className="mt-1">
                        <textarea
                          value={about}
                          name="about"
                          id="about"
                          className="mt-1 h-20 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-500 border-b-2 rounded-md"
                          placeholder="Short Introduction"
                        ></textarea>
                      </div>
                      <p className="mt-2 text-sm text-indigo-700">
                        Let us know something about you.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className=" ml-16 mb-5 mt-5 h-56 w-full sm:h-72 md:h-30 lg:w-5/6 lg:h-5/6 rounded-2xl"
          src="https://images.unsplash.com/photo-1605106325682-3482f7c1c9c4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjN8fHBhdHRlcm5zfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
          alt=""
        ></img>
      </div>
    </div>
  );
}

export default Signup;
