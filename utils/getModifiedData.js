const getModifiedData = (data) => {
  const { cover, first_release_date, screenshots, ...rest } = data;

  const generatePrice = () => {
    return Math.floor(Math.random() * (60 - 40 + 1) + 40);
  };

  const randomPrice = generatePrice();

  const modifiedData = {
    ...rest,
    cover:
      (cover &&
        `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${cover?.image_id}.jpg`) ||
      null,
    screenshots:
      screenshots &&
      screenshots?.map((screenshot) => {
        return (
          `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${screenshot?.image_id}.jpg` ||
          null
        );
      }),
    first_release_date: new Date(first_release_date * 1000),
    price: randomPrice,
  };

  return modifiedData;
};

export default getModifiedData;
