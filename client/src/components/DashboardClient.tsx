import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link, Redirect } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

function DashboardClient() {
  const [logout, setLogout] = useState(false);
  const history = useHistory();

  const { loggedIn } = React.useContext(GlobalContext);
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
          history.push("/", {});
        }
      }, 800);
    });
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
        <Redirect to="/" />
      )}
    </div>
  );
}

export default DashboardClient;
