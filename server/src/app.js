require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const { PORT } = process.env;

const logger = require("morgan");
const swaggerUI = require("swagger-ui-express");

const swaggerConfig = require("./config/swagger.config");
const corsConfig = require("./config/cors.config");
const morganConfig = require("./config/morgan.config");

const { routeNotFoundHandler, errorHandler } = require('./middleware/error.handler');


app
  .use(cors(corsConfig)) // enable cors
  .use(logger("combined", morganConfig)) // log all incoming network ruquests
  .use(express.json()) // parse incoming requests with JSON payloads
  .use("/api/posts", require("./router/posts.router")) // health check route
  .use("/api", swaggerUI.serve, swaggerUI.setup(swaggerConfig)) // swagger api docs (must come after routers)
  .use(routeNotFoundHandler) // fires if route does not exist
  .use(errorHandler); // handles all errors

  // TODO https://www.youtube.com/watch?v=EnMQm365t_s

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
