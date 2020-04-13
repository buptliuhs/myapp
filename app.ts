import * as express from "express";
import * as passport from "passport";
import {BasicStrategy} from "passport-http";
import * as db from "./db/users";

passport.use(new BasicStrategy(
  function (username: string, password: string, cb: (error: any, user?: any) => void) {
    db.findByUsername(username, function (error: any, user?: any) {
      if (error) {
        return cb(error);
      }
      if (!user) {
        console.debug("User not found");
        return cb(null, false);
      }
      if (user.password !== password) {
        console.debug("Password incorrect");
        return cb(null, false);
      }
      console.debug("All good");
      return cb(null, user);
    });
  }));

const app = express();
const port = 3000;

app.get('/',
  passport.authenticate('basic', {session: false}),
  function (req: any, res) {
    res.json({username: req.user.username, email: req.user.emails[0].value});
  });

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
