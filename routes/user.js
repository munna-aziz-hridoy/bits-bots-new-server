import { Router } from "express";
import {
  registerNewUserController,
  createUserController,
  updateUserController,
  checkUserController,
} from "../controller/userController.js";

import verifyUserAuthToken from "../middleware/verifyUserAuthToken.js";

const router = Router();

router.route("/register-user").post(registerNewUserController);
router.route("/create-user").post(createUserController);
router.patch("/update-user", verifyUserAuthToken, updateUserController);
router.post("/check-user", verifyUserAuthToken, checkUserController);

export default router;
