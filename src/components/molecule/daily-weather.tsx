import React from "react";
import HourlyWeather, { HourlyWeatherProps } from "../atom/hourly-weather";

export type DailyWeatherProps = {
  date: string;
  hourlyData: HourlyWeatherProps[];
};

const DailyWeather: React.FC<DailyWeatherProps> = ({
  date = "N/A",
  hourlyData,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <span className="lg:text-xl text-gray-500 font-medium">{date}</span>
      <div className="list-weather-item">
        {hourlyData.map((data, index) => (
          <HourlyWeather
            key={index}
            time={data.time}
            iconSrc={data.iconSrc}
            temperature={data.temperature}
            description={data.description}
          />
        ))}
      </div>
    </div>
  );
};

export default DailyWeather;
