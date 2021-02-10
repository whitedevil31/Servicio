import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import axios from "axios";

const DashboardClient = () => {
  var item;
  const [profile, getProfile] = useState({});
  const [logout, setLogout] = useState(false);
  const [redmi, setRedmi] = useState(false);
  const [result, setResult] = useState([]);

  const history = useHistory();
  useEffect(async () => {
    try {
      const response = await fetch("http://localhost:3000/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      const res = await response.json();
      console.log("wkrng");
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const logoutHandler = () => {
    fetch("http://localhost:3000/logout", {
      method: "GET",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response.status);
      setLogout(true);
      setTimeout(() => {
        if (response.status === 200) {
          history.push("/");
        }
      }, 800);
    });
  };

  return (
    <div className="dashboardContainer">
      <div className="dashboardHeader">
        <div className="navContent">
          <i id="logo" class="fas fa-shopping-cart"></i>
          <Link className="headerTitle" to="/dashboard">
            <h1>Servicio</h1>
          </Link>
          <button
            id="logoutButton"
            className="fas fa-sign-out-alt"
            onClick={logoutHandler}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
