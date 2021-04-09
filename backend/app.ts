import express from "express";
import compression from "compression";
import cors from "cors";
import router from "./routers/router";
import globalErrorHandler from "./config/globalErrorHandler";

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(globalErrorHandler);

export default app;
