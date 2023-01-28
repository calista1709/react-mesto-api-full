const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes.js/users');
const cardsRouter = require('./routes.js/cards');
const { NOT_FOUND_MESSAGE } = require('./utils/constants');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-error');
const { signInCelebrate, signUpCelebrate } = require('./utils/celebrate');
const { finalErrorHandler } = require('./utils/final-error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);
app.post('/signin', signInCelebrate, login);
app.post('/signup', signUpCelebrate, createUser);
app.use(auth);
app.use(usersRouter);
app.use(cardsRouter);
app.use(errorLogger);
app.use('*', () => {
  throw new NotFoundError(NOT_FOUND_MESSAGE);
});
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  finalErrorHandler(err, res);
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
