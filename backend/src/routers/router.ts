import express from "express";

import { Teachers, Students, Classes, Subjects } from "../models";
import HealthcheckController from "../controllers/HealthcheckController";
import { ValidateRegistrationInputMiddleware } from "../middleware/InputValidationMiddleware";
import { RegistrationController } from "../controllers/RegistrationController";

const router = express.Router();
router.use("/", HealthcheckController);

router.post(
  "/register",
  ValidateRegistrationInputMiddleware,
  RegistrationController
);

export default router;
