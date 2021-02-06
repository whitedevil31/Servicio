import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";

const DashboardClient = () => {
    var item;
    const [profile, getProfile] = useState({});
    const [logout, setLogout] = useState(false);
    const [redmi, setRedmi] = useState(false);
    const [result, setResult] = useState([]);
    
    const history = useHistory();
    useEffect(() => {
        
      fetch("", {
        method: "GET",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        },
      }).then((response) => {
        response.json().then((res) => {
          getProfile(res);
        });
      });
    }, []);

    const logoutHandler = () => {
      
        fetch("", {
          method: "POST",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
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

    return(
        <div className="dashboardContainer">
            <div className="dashboardHeader">
                <div className="navContent">
                    <i id="logo" class="fas fa-shopping-cart"></i>
                    <Link className="headerTitle" to="/dashboard">
                    <h1>StudentFolio</h1>
                    </Link>
                    <button id="logoutButton" className="fas fa-sign-out-alt" onClick = {logoutHandler} ></button>
                </div>

            </div>  
            
        </div>
    )
}

export default DashboardClient