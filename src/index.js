const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const userRoute = require("./routes/user.route");
const accountRoute = require("./routes/account.route");
const db = require("./config/db");

const PORT = process.env.PORT || 5000;

//config parse middleware high-level
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//HTTP logger
app.use(morgan("combined"));

//use Cross-Origin-Resource-Sharing
app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Range",
  })
);

//connect database
db.connectDB();

const contentRange = require("./hooks/contentRange");
app.use(contentRange);

//routes
app.use("/", userRoute);
app.use("/account", accountRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
