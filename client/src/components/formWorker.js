import React from "react";
import { Link, useHistory, Redirect } from "react-router-dom";

function FormWorker() {
  const [email, setEmail] = React.useState("");
  const [age, setAge] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [residence, setResidence] = React.useState("");
  const [role, setRole] = React.useState("");

  let history = useHistory();

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const handleChangeService = (event) => {
    setService(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
      age: age,
      gender: gender,
      service: service,
      residence: residence,
    };

    const response = await fetch("http://localhost:3000/register/worker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("hi maga");
    const res = await response.json();
    console.log(res);
    console.log(response);
<<<<<<< HEAD
=======

>>>>>>> 92272f1e0196624c5e74942d89f60891e1b1df1f
    if (response.status == "200") {
      history.goBack();
    }
  };
  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <div>
        <div>
          <select
            className="Rectangle-21"
            value={role}
            onChange={handleChangeRole}
          >
            <option value="none" selected hidden>
              Helper
            </option>
          </select>
        </div>
        <div className="Email">
          <label>Email</label>
        </div>

        <input
          className="Rectangle-18"
          name="email"
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <div className="Email">
          <label>Password</label>
        </div>

        <input
          className="Rectangle-18"
          name="password"
          value={password}
          type="text"
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <div className="Age">
          <label>Age</label>
        </div>
        <input
          className="Rectangle-18"
          name="age"
          value={age}
          type="text"
          onChange={(e) => setAge(e.target.value)}
        ></input>
        <div>
          <label className="Gender">Gender</label>
        </div>
        <select
          className="Rectangle-21"
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
<<<<<<< HEAD
        </select>      
=======
        </select>
        <div>
          <label className="Services">Services</label>
        </div>
        <select
          className="Rectangle-21"
          value={service}
          onChange={handleChangeService}
        >
          <option value="none" selected hidden>
            Service
          </option>
          <option className="select" value="Chef">
            Chef
          </option>
          <option className="select" value="House Helper">
            House Helper
          </option>
          <option className="select" value="Laundry">
            Laundry
          </option>
          <option className="select" value="Plumber">
            Plumber
          </option>
          <option className="select" value="Electrical">
            Electrical
          </option>
        </select>

>>>>>>> 92272f1e0196624c5e74942d89f60891e1b1df1f
        <div className="Residence">
          <label>Residence</label>
        </div>
        <input
          className="Rectangle-18"
          name="residence"
          value={residence}
          type="text"
          onChange={(e) => setResidence(e.target.value)}
        ></input>
      </div>

      <button className="Submit" type="submit">
        Submit
      </button>
    </form>
  );
}

export default FormWorker;
