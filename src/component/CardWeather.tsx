import React from "react";
import { HandleTemperature } from "@/utils/handle-temperature";
import Image from "next/image";

interface IProps {
  dateLabel: string;
  temperature?: number; // với dữ liệu hourly
  tempMin?: number;     // với dữ liệu daily
  tempMax?: number;     // với dữ liệu daily
  description: string;
  icon: string;
  isToday?: boolean;
  type: "day" | "hour"; // <== thêm kiểu hiển thị
}

const CardWeather = ({
  dateLabel,
  temperature,
  tempMin,
  tempMax,
  description,
  icon,
  isToday,
  type,
}: IProps) => {
  const displayDate =
    isToday && !/^\d{1,2}(:\d{2})?\s?(AM|PM)?$/i.test(dateLabel) ? "Hôm nay" : dateLabel;

  const imageSrc = icon
    ? `https://openweathermap.org/img/wn/${icon}@2x.png`
    : "/default-weather-icon.png";

  const renderTemperature = () => {
    if (type === "day" && tempMin != null && tempMax != null) {
      return `${HandleTemperature(tempMin)} ~ ${HandleTemperature(tempMax)}`;
    }
    if (type === "hour" && temperature != null) {
      return `${HandleTemperature(temperature)}`;
    }
    return "--";
  };

  return (
    <div className="flex flex-col text-center rounded-xl border-2 border-solid border-transparent hover:border-[#E1E1E1] py-4 transition duration-200 min-h-[20vh] w-full">
      <div className="text-lg font-semibold text-gray-100 mb-4">{displayDate}</div>

      <div className="text-xl font-bold text-white mb-4">{renderTemperature()}</div>

      <div className="flex items-center justify-center">
        <Image
          width={60}
          height={60}
          alt={icon ? description : "Weather description"}
          className="object-cover"
          src={imageSrc}
        />
      </div>

      {!icon && <div className="text-sm text-gray-300 mt-2">{description}</div>}
    </div>
  );
};

export default CardWeather;
