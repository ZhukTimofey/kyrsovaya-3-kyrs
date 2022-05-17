import express from "express";
import { ensureAuthenticated } from "../ensureAthenticated.mjs";
import faker from "faker";
import { isDateValid } from "../utils.mjs";
import { compareDates } from "../utils.mjs";

export const signupRoutes = (db) => {
  const signupRouter = express.Router();

  signupRouter.post("/", async (req, res) => {
    //TODO: validate model data
    try {
      const response = {
        id: faker.datatype.uuid(),
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        surname: req.body.surname,
        roles: "USER"
        // id: faker.datatype.uuid(),
        // modified: req.body.modified,
        // start: req.body.start,
        // finish: req.body.finish,
        // author: {
        //     id: req.body.author.id,
        //     name: req.body.author.name,
        //     surname: req.body.author.surname,
        // },
        // speakers: req.body.speakers.map((s) => ({
        //     id: faker.datatype.uuid(),
        //     name: s.name,
        //     surname: s.surname,
        // })),
        // subject: req.body.subject,
        // excerpt: req.body.excerpt,
        // place: req.body.place,
        // goCount: 0,
        // status: "REQUEST",
        // isOver: false,
        // image: req.body.image,
      };
      if (db.data.users.find((user) => user.email === req.body.email)) {
        res
          .status(501)
          .send(
            "User already exist"
          );
      } else {
        const user = db.data.users.push(response);
        await db.write();
        res.send(response);
      }
    } catch (err) {
      console.log("catch err", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  return signupRouter;

};