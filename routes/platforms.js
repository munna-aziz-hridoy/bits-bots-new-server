import { Router } from "express";

import { getAllPlatformController } from "../controller/platformController.js";

const router = Router();

router.route("/all-platforms").get(getAllPlatformController);

export default router;
