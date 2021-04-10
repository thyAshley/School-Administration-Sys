import { Router } from "express";

import HealthcheckController from "../controllers/HealthcheckController";
import { ValidateRegistrationInputMiddleware } from "../middleware/InputValidationMiddleware";
import { RegistrationController } from "../controllers/RegistrationController";
import { getReport } from "../controllers/ReportController";

const router = Router();
router.use("/", HealthcheckController);

router.post(
  "/register",
  ValidateRegistrationInputMiddleware,
  RegistrationController
);

router.get("/reports/workload", getReport);

export default router;
