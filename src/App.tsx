import { useEffect, useState } from "react";
import "./App.css";
import DailyWeather, {
  DailyWeatherProps,
} from "./components/molecule/daily-weather";
import CurrentWeather, {
  CurrentWeatherProps,
} from "./components/organism/current-weather";
import { HourlyWeatherProps } from "./components/atom/hourly-weather";
import { useWeatherProvider } from "./context/weather-context";
import Spinner from "./components/atom/spinner";

function App() {
  const [currentWeatherData, setCurrentWeatherData] =
    useState<CurrentWeatherProps>({
      date: "",
      temp: 0,
      description: "",
      icon: "",
      humidity: 0,
      wind: 0,
      visibility: 0,
    });
  const [forecastData, setForecastData] = useState<DailyWeatherProps[]>();
  const [currentWeatherLoading, setCurrentWeatherLoading] = useState(false);
  const [forecastWeatherLoading, setForecastWeatherLoading] = useState(false);

  const { city } = useWeatherProvider();

  function transformWeatherData(data: any): CurrentWeatherProps {
    return {
      date: new Date(data?.dt * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      temp: Math.round(data?.main.temp),
      description: data?.weather[0].description,
      icon: data?.weather[0].icon,
      humidity: data?.main.humidity,
      wind: data?.wind.speed,
      visibility: data?.visibility / 1000,
    };
  }

  function transformForecastData(jsonData: any): DailyWeatherProps[] {
    const dailyWeather: { [key: string]: HourlyWeatherProps[] } = {};

    jsonData?.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const time = new Date(item.dt * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const hourlyData: HourlyWeatherProps = {
        time,
        iconSrc: item.weather[0].icon,
        temperature: {
          min: Math.round(item.main.temp_min),
          max: Math.round(item.main.temp_max),
        },
        description: item.weather[0].description,
      };

      if (!dailyWeather[date]) {
        dailyWeather[date] = [];
      }
      dailyWeather[date].push(hourlyData);
    });

    return Object.entries(dailyWeather).map(([date, hourlyData]) => ({
      date,
      hourlyData,
    }));
  }

  const fetchCurrentWeather = async () => {
    const apiKey = import.meta.env.VITE_API_OPEN_WEATHER;
    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

    const params = new URLSearchParams({
      q: city,
      units: "metric",
      appid: apiKey,
    });

    try {
      setCurrentWeatherLoading(true);
      const response = await fetch(`${baseUrl}?${params}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCurrentWeatherLoading(false);
      const formatedCurrentWeatherData = transformWeatherData(data);
      setCurrentWeatherData(formatedCurrentWeatherData);
    } catch (error) {
      setCurrentWeatherLoading(true);
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const fetchForcastWeather = async () => {
    const apiKey = import.meta.env.VITE_API_OPEN_WEATHER;
    const baseUrl = "https://api.openweathermap.org/data/2.5/forecast";

    const params = new URLSearchParams({
      q: city,
      units: "metric",
      appid: apiKey,
    });

    try {
      setForecastWeatherLoading(true);
      const response = await fetch(`${baseUrl}?${params}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setForecastWeatherLoading(false);

      const formatedForecastData = transformForecastData(data);
      setForecastData(formatedForecastData);
    } catch (error) {
      setForecastWeatherLoading(false);
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchCurrentWeather();
    fetchForcastWeather();
  }, [city]);

  return (
    <div className="w-[40vw] mx-auto pt-4">
      <div className="flex gap-5 flex-col">
        {currentWeatherLoading ? (
          <Spinner />
        ) : (
          <CurrentWeather {...currentWeatherData} />
        )}
        <div className="lg:text-2xl font-medium">5 day Forecast (3 Hours)</div>
        <section className="bg-white min-h-[250px] w-auto rounded-2xl border border-gray-200 shadow-xl p-5 flex flex-col gap-5">
          {forecastWeatherLoading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col gap-10">
              {forecastData?.map((data, index) => (
                <DailyWeather
                  key={index}
                  date={index === 0 ? "Today" : data.date}
                  hourlyData={data.hourlyData}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
