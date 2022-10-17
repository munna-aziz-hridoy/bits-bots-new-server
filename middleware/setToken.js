import axios from "axios";
import { config } from "dotenv";
config();

const setToken = async (req, res, next) => {
  const url = process.env.GET_TOKEN_URL;
  const body = {
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
    grant_type: "client_credentials",
  };

  try {
    const { data } = await axios.post(url, body);

    res.accessToken = data.access_token;
    next();
  } catch (error) {
    res.status(501).send({ message: "internel server error", error });
  }
};

export default setToken;
