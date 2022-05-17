import passport from "passport";
import Strategy from "passport-local";

export const auth = (users) => {
  passport.use(
    new Strategy(function (email, password, cb) {
      const user = users.find((it) => it.email === email);
      if (!user) {
        return cb(null, false, { message: "Incorrect username or password." });
      }

      if (user.password !== password) {
        return cb(null, false, { message: "Incorrect username or password." });
      }

      return cb(null, user);
    })
  );

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      const { password, ...others } = user;
      cb(null, others);
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};
