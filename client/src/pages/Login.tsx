import React, { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = React.useState<string | null>("");
  const [password, setPassword] = React.useState<string | null>("");
  const [incorrectPwd, setIncorrectPwd] = useState(false);

  let history = useHistory();

  const handleSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    const data = { username: username, password: password };
    axios
      .post("http://localhost:5000/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          Cookies.set("user", response.data._id, { expires: 7 });
          if (response.data.role === "User") {
            history.push("/dashboard");
          } else {
            history.push("/worker/dashboard");
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setIncorrectPwd(true);
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-7 text-center text-4xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600"></p>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="remember" value="true"></input>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only">Username</label>
              <input
                id="email-address"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>

            <div>
              <label className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
          </div>
          <div>
            {incorrectPwd && (
              <div>
                <h4 className="mb-4 font-medium text-red-500 hover:text-red-700">
                  Incorrect credentials.
                </h4>
              </div>
            )}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="pt-2 flex text-xs">
          Not a member yet?{" "}
          <a
            className="ml-2 font-bold flex-row"
            href="http://localhost:3000/signup"
          >
            {" "}
            Sign Up Here!
          </a>
          <a
            className="font-bold flex-row flex ml-44"
            href="http://localhost:3000"
          >
            Home Page?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
