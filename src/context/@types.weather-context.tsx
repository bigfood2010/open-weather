export type WeatherContextType = {
  // Variable Type
  city: string;
  searchHistory: Array<string>;
  // Set State Action Type
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>;
};
