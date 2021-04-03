import { Router, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
const router: Router = Router();
import { acceptRequestOnUssd, rejectRequestOnUssd } from "./ussd.db";
router.use(bodyParser.urlencoded({ extended: true }));
router.post(
  "/ussd",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const text = req.body.text;
      const contactNumber = req.body.phoneNumber;
      switch (text) {
        case "":
          res.send("CON Enter 1 to accept the offer and 2 to decline it ");

        case "1":
          var acceptResponse = await acceptRequestOnUssd(contactNumber);
          if (acceptResponse.lastErrorObject.n == 1)
            res.send(
              `END Good luck on your new Job! You have been assigned to ${
                acceptResponse.value.client.username
              } for your ${acceptResponse.value.services.toString()} job(s)`
            );
          else res.send("END Something went wrong please try again later");
          break;

        case "2":
          var rejectResponse = await rejectRequestOnUssd(contactNumber);
          if (rejectResponse.result.n == 1) {
            res.send(
              "END Cools, we will ping back to the user who has required for your needs and let them know you won't be able to make it."
            );
          } else {
            res.send("END Something went wrong please try again later");
          }
          break;

        default:
          res.send("END You have entered an incorrect value");
          break;
      }
    } catch (err) {
      next(err);
    }
  }
);
export default router;
