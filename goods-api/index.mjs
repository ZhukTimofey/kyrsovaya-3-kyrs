import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import { auth } from './auth.mjs';
import { loginRoutes } from './routers/login.mjs';
import { goodsRoutes } from './routers/goods.mjs';
import { usersRoutes } from './routers/users.mjs';
import { initDataBase } from './initDataBase.mjs';
import {signupRoutes} from "./routers/signup.mjs";

const app = express();
app.use(
  bodyParser.urlencoded({
    limit:"100mb",
    parameterLimit:"500000",
    extended: false,
  })
);
app.use(bodyParser.json({limit:"100mb",
  parameterLimit:"500000",

}));
app.use(bodyParser.raw({limit:"100mb",
  parameterLimit:"500000",
}));
app.use(morgan('dev'));

app.use(
  session({
    secret: 'this is the default passphrase',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

const db = await initDataBase();

auth(db.data.users);

app.use(function (err, req, res, next) {
  console.log('====== ERROR =======');
  console.error(err.stack);
  res.status(500);
});

app.use('/api', loginRoutes);
app.use('/api/signup', signupRoutes(db));
app.use('/api/users', usersRoutes(db));
app.use('/api/goods', goodsRoutes(db));

app.listen(3000, () => {
  console.log('Api server is up.');
  console.log('listening on port 3000');
});