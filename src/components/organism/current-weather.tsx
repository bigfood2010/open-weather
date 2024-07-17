import { FiArrowDownLeft } from "react-icons/fi";
import CurrentWeatherDetail from "../atom/current-weather-detail";

export type CurrentWeatherProps = {
  date: string;
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  wind: number;
  visibility: number;
};

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  date,
  temp,
  description,
  icon,
  humidity,
  wind,
  visibility,
}) => {
  return (
    <div className="bg-white min-h-[250px] w-auto rounded-2xl border border-gray-200 shadow-xl p-5 flex flex-col gap-5">
      <section className="date text-xl">{date}</section>
      <section className="icon-and-temp grid grid-cols-2 ">
        <div className="flex justify-center">
          <img src={`./../../public/${icon}.png`} className="scale-150" />
        </div>
        <div className="flex flex-col justify-center items-start">
          <div className="temp text-5xl">{temp}</div>
          <div className="text-xl text-gray-700">{description}</div>
        </div>
      </section>
      <section className="detail grid grid-cols-3">
        <CurrentWeatherDetail label="Humidity" value={humidity} unit="%" />
        <CurrentWeatherDetail
          label="Winds"
          value={wind}
          unit="m/s"
          leftIcon={<FiArrowDownLeft />}
        />
        <CurrentWeatherDetail label="Visibility" value={visibility} unit="km" />
      </section>
    </div>
  );
};

export default CurrentWeather;
