import getModifiedData from "./getModifiedData.js";

const isPropertyMatched = (game, id, property) => {
  const gamePlatforms = game[property];
  if (!gamePlatforms) return false;
  const exists = gamePlatforms.find((platform) => platform.id === id);
  if (exists) {
    return true;
  }
  return false;
};

const getPropertyGames = (arr, id, property, limit = 0, offset = 0) => {
  const newArr = [];

  for (let i = 0; i < arr.length; i++) {
    // const exists = newArr.find((item) => item.id === allGames[i].id);
    const checkPlatform = isPropertyMatched(arr[i], id, property);
    if (checkPlatform) {
      newArr.push(arr[i]);
    }
  }

  if (limit === 0) {
    return newArr;
  } else {
    const paginatedData = newArr.splice(offset, limit);
    return paginatedData;
  }
};

export default getPropertyGames;
