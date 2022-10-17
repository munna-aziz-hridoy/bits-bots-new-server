import getPlatformData from "../utils/getPlatformData.js";

// get all platform data

export const getAllPlatformController = async (req, res) => {
  const token = res.accessToken;

  try {
    const platforms = await getPlatformData(token);
    res.status(201).send(platforms);
  } catch (error) {
    res.status(501).send({ message: "internel server error", error });
  }
};
