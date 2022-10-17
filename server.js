import app from "./app.js";
import dbConnection from "./config/dbConfig.js";

const port = process.env.PORT || 5000;

// connect db and listening to the server

dbConnection.then(() => {
  app.listen(port, () => console.log("server is running"));
});

// all games api = http://localhost:5000/api/v1/games/all-games this is the api to get all the games data
// all companies api = http://localhost:5000/api/v1/company/all-companies

// http://localhost:5000/api/v1/games/genres?id=8&genresId=10
// http://localhost:5000/api/v1/platforms/all-platforms
// http://localhost:5000/api/v1/games/platforms?id=8
