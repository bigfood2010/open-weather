import React, { useContext, useState } from "react";
import { WeatherContextType } from "./@types.weather-context";

export const defaultFunc = () => {
  return;
};
const defaultStateValue: WeatherContextType = {
  // Default Variable Value
  city: "Singapore",

  searchHistory: localStorage.getItem("searchHistory")
    ? [...JSON.parse(localStorage.getItem("searchHistory") ?? "[]")]
    : ["Singapore, SG"],
  // Default Set State Action
  setCity: defaultFunc,
  setSearchHistory: defaultFunc,
};

type WeatherProviderProps = {
  children?: React.ReactNode;
};

export const WeatherContext =
  React.createContext<WeatherContextType>(defaultStateValue);

const WeatherProvider = (props: WeatherProviderProps) => {
  const [city, setCity] = useState(defaultStateValue.city);

  const [searchHistory, setSearchHistory] = useState<Array<string>>(
    defaultStateValue.searchHistory
  );
  return (
    <WeatherContext.Provider
      value={{
        //Value
        city,
        searchHistory,
        // Set State Action
        setCity,
        setSearchHistory,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export { WeatherProvider };
export const useWeatherProvider = () =>
  useContext<WeatherContextType>(WeatherContext);
