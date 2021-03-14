import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link, Redirect } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

function DashboardClient() {
  const [Logout, setLogout] = useState(false);
  const history = useHistory();

  const { logout, loggedIn } = React.useContext(GlobalContext);
  const logoutHandler = () => {
    fetch("http://localhost:5000/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response.status);
      setLogout(true);
      setTimeout(() => {
        if (response.status === 200) {
          logout!();
          history.push("/", {});
          console.log("logout" + loggedIn);
        }
      }, 800);
    });
  };
  const x = () => {
    setTimeout(() => {
      console.log("hi");
      history.push("/");
    }, 3500);
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <h1> Dashboard Client</h1>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center h-screen">
          <div className="bg-red-600 rounded-lg flex items-center flex-col justify-center w-1/2 h-1/3">
            <h1 className="text-yellow-300 text-xl">
              You are not Authenticated ma{" "}
            </h1>
            <h3 className="text-yellow-300 text-xl">Go back</h3>
          </div>
          {x()}
        </div>
      )}
    </div>
  );
}

export default DashboardClient;
