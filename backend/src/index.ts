import express, { NextFunction, Response } from 'express';
import {
  checkIfDefaultAccountExists, checkIfExistsTables, createDefaultAccounts, createTables, dbClient,
} from '@main/db/database.setup.ts';
import { expressjwt, Request } from 'express-jwt';
import { JWT_SECRET } from '@main/security/jwtToken.service.ts';
import SecuredLoginService from '@main/security/securedLogin.service.ts';
import cookieParser from 'cookie-parser';
import SecuredDatabaseService from '@main/db/secured/securedDatabase.service.ts';
import session from 'express-session';
import sanitizeHtml from 'sanitize-html';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if using HTTPS
}));

app.use((err: Error, _req: Request, res: Response, next: NextFunction): any => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  } else {
    next(err);
  }
});

app.use(
  expressjwt({
    algorithms: ['HS256'],
    secret: JWT_SECRET,
    credentialsRequired: true,
    getToken: (req) => req.cookies['SHOP-JWT'],
  })
    .unless({ path: [/\/unsecured*/, '/secured/login', '/secured/logout', '/secured/register'] }),
);

app.listen(8085, async () => {
  console.log('Server started working');

  dbClient.connect()
    .then(() => {
      console.log('Database connected');
      return checkIfExistsTables();
    })
    .then((isExist) => {
      console.log(`Database ${isExist ? 'exists' : 'doesn\'t exist'}`);

      if (isExist) {
        return undefined;
      }

      return createTables();
    })
    .then(() => {
      console.log('Created all tables');
      return undefined;
    })
    .then(() => checkIfDefaultAccountExists())
    .then((isExist) => {
      console.log(`Default accounts ${isExist ? 'exists' : 'doesn\'t exists'}`);
      if (isExist) {
        return undefined;
      }
      return createDefaultAccounts();
    })
    .then(() => {
      console.log('Created default accounts');
      return undefined;
    })
    .catch((e) => {
      console.error("Couldn't connect databse", e);
    });
});

// SECURED
app.post('/secured/login', async (req, res) => {
  try {
    const request = req.body;
    const token = await SecuredLoginService.loginUser(request.login, request.password);
    res.cookie('SHOP-JWT', token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      secure: true,
      sameSite: 'none',
    });
    res.status(200);
    res.send(sanitizeHtml(`Cookie has been set with token! ${request.login}`));
  } catch (e) {
    console.error('Failed to login', e);
    res.status(400);
    res.send(sanitizeHtml(`Cookie couldnt be set! ${req.body?.login}`));
  }
});

app.post('/secured/logout', (_req, res) => {
  res.clearCookie('SHOP-JWT');
  res.send('Cookie has been removed');
});

app.post('/secured/register', async (req, res) => {
  try {
    await SecuredDatabaseService.registerUser({ ...req.body, account_type: 'USER' });
    res.status(200);
    res.send('Register user successfully');
    console.log(`Registered user ${req.body}`);
  } catch (e) {
    console.error('Failed to register', e);
    res.status(400);
    res.send(JSON.stringify(e));
  }
});
