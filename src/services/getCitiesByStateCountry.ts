import { api } from "./api";

export type CityData = {
  id: number;
  name: string;
};

const getCitiesByStateCountry = async (
  countryISO2: string,
  stateISO2: string
) => {
  const res = await api().get<CityData[]>(
    `https://api.countrystatecity.in/v1/countries/${countryISO2}/states/${stateISO2}/cities`
  );
  return res.data;
};

export default getCitiesByStateCountry;
