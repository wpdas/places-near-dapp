import axios from "axios";

export const api = () => {
  const CSC_API_KEY = process.env.NEXT_PUBLIC_COUNTRY_STATE_CITY_API_KEY;

  return axios.create({
    headers: {
      "Content-Type": "application/json",
      "X-CSCAPI-KEY": CSC_API_KEY,
    },
  });
};
