const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const connectDB = require("./db/db.connect");
connectDB();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hey, working.");
});

app.post("/ussd", (req, res) => {
  // console.log(req.body)
  const text = req.body.text;
  const contactNumber = req.body.phoneNumber;
  let message;

  switch (text) {
    case "":
      res.send(
        "CON Hey there! Greetings from Servicio. \n\n Click below to accept or reject your job. \n1.Accept my job. \n2.Naah, reject it."
      );

    case "1":
      res.send("END Good luck on your new Job!");
      app.post();
      break;

    case "2":
      res.send(
        "END Cools, we will ping back to the user who has required for your needs and let them know you won't be able to make it."
      );
      break;

    default:
      res.send("END Option ah select pannu da dai venna");
      break;
  }
  console.log(text);
  console.log(contactNumber);
});

app.listen(port, () => {
  console.log("Wakey Wakey kk, Server is running on " + port);
});
