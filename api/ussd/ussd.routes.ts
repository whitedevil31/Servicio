import { Router, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
const router: Router = Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.post("/ussd", (req: Request, res: Response) => {
  //console.log(req.body)
  const text = req.body.text;
  const contactNumber = req.body.phoneNumber;
  let message;

  switch (text) {
    case "":
      res.send(
        "CON Hey there! Greetings from Servicio. \nPlease enter your application number to continue"
      );

    case "1":
      res.send("END Good luck on your new Job!");
      break;

    case "2":
      res.send(
        "END Cools, we will ping back to the user who has required for your needs and let them know you won't be able to make it."
      );
      break;

    default:
      res.send("");
      break;
  }
  console.log(text);
  console.log(contactNumber);
});
export default router;
