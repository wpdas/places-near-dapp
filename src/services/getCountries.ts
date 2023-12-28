import { api } from "./api";

export type CountryData = {
  id: number;
  name: string;
  iso2: string;
};

const getCountries = async () => {
  const res = await api().get<CountryData[]>(
    "https://api.countrystatecity.in/v1/countries"
  );
  return res.data;
};

export default getCountries;
