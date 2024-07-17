import React, { ReactNode } from "react";

interface CurrentWeatherDetailProps {
  label: string;
  value: number;
  unit?: string;
  leftIcon?: ReactNode;
}

const CurrentWeatherDetail: React.FC<CurrentWeatherDetailProps> = ({
  label,
  value,
  unit,
  leftIcon,
}) => {
  const renderLeftIcon = () => {
    return leftIcon ? leftIcon : null;
  };

  const renderUnit = () => {
    return unit ? <span className="text-gray-600">{unit}</span> : null;
  };

  return (
    <>
      <div className="grid grid-rows-2 align-middle justify-center gap-1">
        <div className="text-lg text-gray-500 font-medium text-center">
          {label}
        </div>
        <div className="text-lg font-semibold text-center flex gap-1 items-center justify-center">
          {renderLeftIcon()}
          <span>{value}</span>
          {renderUnit()}
        </div>
      </div>
    </>
  );
};

export default CurrentWeatherDetail;
