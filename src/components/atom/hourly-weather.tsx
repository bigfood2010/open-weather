import React from "react";

export type HourlyWeatherProps = {
  time: string;
  iconSrc: string;
  temperature: {
    min: number;
    max: number;
  };
  description: string;
};

const HourlyWeather: React.FC<HourlyWeatherProps> = ({
  time = "N/A",
  iconSrc,
  temperature,
  description = "N/A",
}) => {
  return (
    <div className="grid grid-cols-5 align-middle items-center">
      <div className="col-span-1 lg:text-xl font-semibold">{time}</div>
      <div className="flex gap-2 items-center justify-start col-span-2">
        <img
          src={`../../../public/${iconSrc}.png`}
          alt="icon"
          width={80}
          height={80}
        />
        <div className="text-gray-500 lg:text-xl">
          {temperature.min} / {temperature.max}°C
        </div>
      </div>
      <div className="col-span-2 col-start-4 lg:text-xl font-semibold text-end">
        {description}
      </div>
    </div>
  );
};

export default HourlyWeather;
