import { api } from "./api";

export type StateData = {
  id: number;
  name: string;
  iso2: string;
};

const getStatesByCountry = async (countryISO2: string) => {
  const res = await api().get<StateData[]>(
    `https://api.countrystatecity.in/v1/countries/${countryISO2}/states`
  );
  return res.data;
};

export default getStatesByCountry;
