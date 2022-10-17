import { Router } from "express";

import {
  allGamesController,
  singleGameController,
  platformGamesController,
  genresGamesController,
} from "../controller/gamesController.js";

const router = Router();

router.route("/all-games").get(allGamesController);
router.route("/single-game").get(singleGameController);
router.route("/platforms").get(platformGamesController);
router.route("/genres").get(genresGamesController);

export default router;
