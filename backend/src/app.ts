import express from "express";
import compression from "compression";
import cors from "cors";
import router from "./routers/router";
import globalErrorHandler from "./config/globalErrorHandler";
import sequelize from "./config/database";

const app = express();

//used by test only
if (process.env.NODE_ENV === "test") {
  sequelize.sync({ alter: true });
}

// uncomment the following code to sync the database for the first time
// sequelize.sync({ alter: true });

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(globalErrorHandler);

export default app;
