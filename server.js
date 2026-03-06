require("dotenv").config();

const express = require("express");
const sequelize = require("./config/db");

const identifyRoutes = require("./routes/identifyRoutes");

const app = express();

app.use(express.json());

app.use("/identify", identifyRoutes);

sequelize.authenticate()
  .then(() => {

    console.log("Database connected");

    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running on port 3000");
    });

  })
  .catch(err => {
    console.error("Database connection error:", err);
  });