const compression = require('compression');
const express = require('express');

const config = require('./config.json');
const mongo = require('./middleware/mongo');
const limiter = require('./middleware/limiter');
const routeAuth = require('./middleware/auth/routeAuth');

const app = express();

app.listen(config.port, () => {
  app.use(compression());
  app.use(mongo);
  app.use(limiter);

  require('./routes/public.routes.js')(app);
  require('./routes/private.routes.js')(app, routeAuth);
});