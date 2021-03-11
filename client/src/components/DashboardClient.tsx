import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";

function DashboardClient () {

    const [logout, setLogout] = useState(false);
    const history = useHistory();

    const logoutHandler = () => {
      
        fetch("http://localhost:5000/logout", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
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

    return(
        <div>
            Dashboard Client
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={logoutHandler}>
              Logout
            </button>
        </div>
    )
}

export default DashboardClient