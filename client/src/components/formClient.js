import React from "react";
import { Link, useHistory, Redirect } from "react-router-dom";

function FormClient() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
      age: age,
      gender: gender,
      residence: residence,
    };

    const response = await fetch("http://localhost:3000/register/client", {
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
              User
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
        </select>
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

export default FormClient;