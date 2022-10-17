import axios from "axios";
import { config } from "dotenv";
import getData from "../utils/getData.js";
import getModifiedData from "../utils/getModifiedData.js";
import getPropertyGames from "../utils/getPropertyGames.js";
config();

// get all games controller

export const allGamesController = async (req, res) => {
  const token = res.accessToken;
  const offset = parseFloat(req.query.offset) || 0;
  const limit = parseFloat(req.query.limit) || 0;

  try {
    const games = await getData("games", token, limit, offset);

    const data = games?.map((game) => {
      const data = getModifiedData(game);

      return data;
    });

    res.status(200).send(data);
  } catch (error) {
    res.status(501).send({ message: "internel server error", error });
  }
};

// get game by id

export const singleGameController = async (req, res) => {
  const id = req.query.id;
  const token = res.accessToken;

  try {
    const singleGame = await getData("games", token, 0, 0, id);

    if (singleGame) {
      const data = getModifiedData(singleGame[0]);

      res.status(200).send(data);
    }
  } catch (error) {
    res.status(501).send({ message: "internel server error", error });
  }
};

// get games from perticular platform

export const platformGamesController = async (req, res) => {
  const token = res.accessToken;
  const platformID = parseFloat(req.query.id);
  const offset = parseFloat(req.query.offset) || 0;
  const limit = parseFloat(req.query.limit) || 0;

  try {
    const allGames = await getData("games", token, 500, 0);

    const platformGames = getPropertyGames(
      allGames,
      platformID,
      "platforms",
      limit,
      offset
    );

    const modifiedData = platformGames.map((game) => {
      const data = getModifiedData(game);
      return data;
    });

    res.status(201).send(modifiedData);
  } catch (error) {
    res.status(501).send({ message: "internel server error", error });
  }
};

// get genres wise game data

export const genresGamesController = async (req, res) => {
  const token = res.accessToken;
  const platfromId = parseFloat(req.query.id);
  const gernresId = parseFloat(req.query.genresId);
  const offset = parseFloat(req.query.offset) || 0;
  const limit = parseFloat(req.query.limit) || 0;

  try {
    const allGames = await getData("games", token, 500, 0);

    const platformGames = getPropertyGames(
      allGames,
      platfromId,
      "platforms",
      0,
      0
    );

    const genresGames = getPropertyGames(
      platformGames,
      gernresId,
      "genres",
      limit,
      offset
    );

    const modifiedData = genresGames.map((game) => {
      const data = getModifiedData(game);
      return data;
    });
    res.status(201).send(modifiedData);
  } catch (error) {
    res.status(501).send({ message: "internel server error", error });
  }
};
