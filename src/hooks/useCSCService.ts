import getCitiesByStateCountry, {
  CityData,
} from "@dapp/services/getCitiesByStateCountry";
import getCountries, { CountryData } from "@dapp/services/getCountries";
import getStatesByCountry, {
  StateData,
} from "@dapp/services/getStatesByCountry";
import { useEffect, useState } from "react";

const STORAGE_KEY = "csc_service_countries";

/**
 * Country State City API Service
 */
const useCSCService = (
  selected_country_iso2?: string,
  selected_state?: string
) => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [states, setStates] = useState<StateData[]>([]);
  const [cities, setCities] = useState<CityData[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setCitiesStates] = useState(false);

  useEffect(() => {
    (async () => {
      const previousData = localStorage.getItem(STORAGE_KEY);
      if (previousData) {
        setCountries(JSON.parse(previousData));
        return;
      }
      const data = await getCountries();
      // store values into localstorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setCountries(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (selected_country_iso2) {
        setLoadingStates(true);
        const statesData = await getStatesByCountry(selected_country_iso2);
        setStates(statesData);
        setLoadingStates(false);
      }
    })();
  }, [selected_country_iso2]);

  useEffect(() => {
    (async () => {
      if (selected_country_iso2 && selected_state) {
        setCitiesStates(true);
        const citiesData = await getCitiesByStateCountry(
          selected_country_iso2,
          selected_state
        );
        setCities(citiesData);
        setCitiesStates(false);
      }
    })();
  }, [selected_country_iso2, selected_state]);

  return { countries, states, loadingStates, cities, loadingCities };
};

export default useCSCService;
