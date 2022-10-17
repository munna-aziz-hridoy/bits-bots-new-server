import axios from "axios";
import { config } from "dotenv";
config();

const getPlatformData = async (token) => {
  const url = `${process.env.GET_URL}/platforms`;
  const headers = {
    Accept: "application/json",
    "Client-ID": process.env.TWITCH_CLIENT_ID,
    Authorization: `Bearer ${token}`,
  };

  const { data } = await axios({
    url,
    method: "POST",
    headers,
    data: "fields abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,slug,summary,updated_at,url,versions,websites; where id = (6,39,8);",
  });

  return data;
};

export default getPlatformData;
