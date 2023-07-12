const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Route files
const auth = require("./routes/auth");
const users = require("./routes/users");
const companies = require("./routes/companies");
const makes = require("./routes/makes");
const models = require("./routes/models");
const colors = require("./routes/colors");
const vehicles = require("./routes/vehicles");
const reservations = require("./routes/reservations");
const payment_received = require("./routes/payment_received");

// load env vars
dotenv.config({ path: "./config/.env" });

// connect to database
connectDB();

const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// body parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// loging middleware
app.use(logger);

// file uploading
app.use(fileupload());

// sanitize data
app.use(mongoSanitize());

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// set security headers
app.use(helmet());

// prevent xss attacks
app.use(xss());

// rate limiting
// const limiter = rateLimit({
//     windowMs: 10 * 60 * 1000, // 10 mins
//     max: 100
// });

// app.use(limiter);

// prevent http param pollution
app.use(hpp());

// enable CORS
app.use(cors());

// Mount routers
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/companies", companies);
app.use("/api/v1/makes", makes);
app.use("/api/v1/models", models);
app.use("/api/v1/colors", colors);
app.use("/api/v1/vehicles", vehicles);
app.use("/api/v1/reservations", reservations);
app.use("/api/v1/payment-received", payment_received);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // close server & exit process
  server.close(() => process.exit(1));
});
