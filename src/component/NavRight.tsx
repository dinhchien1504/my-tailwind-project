"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind, faDroplet } from "@fortawesome/free-solid-svg-icons";
import { HandleTemperature } from "@/utils/handle-temperature";
import { capitalizeEachWord, formatTo12HourTime } from "@/utils/handle-day-time";
import { ForecastResponse } from "@/types/forecast-response.d";
import { WeatherResponse } from "@/types/weather-response.d";
import { ForecastItemResponse } from "@/types/forecast-item-response.d";
import CardWeather from "@/component/CardWeather";

interface IProps {
  dataForecast: ForecastResponse | undefined;
  dataWeather: WeatherResponse | undefined;
}

const NavRight = ({ dataForecast, dataWeather }: IProps) => {
  const [forecasts, setForecasts] = useState<ForecastItemResponse[]>([]);
  const [currentTime, setCurrentTime] = useState("--");
  const [greeting, setGreeting] = useState("Good Morning");

  // Xử lý forecast (lọc 6 forecast tiếp theo)
  useEffect(() => {
    const now = new Date();
    const list: ForecastItemResponse[] = [];

    dataForecast?.list.forEach((forecast) => {
      const inputDate = new Date(forecast.dt_txt);
      if (inputDate > now && list.length < 6) {
        list.push(forecast);
      }
    });

    setForecasts(list);
  }, [dataForecast]);

  // Cập nhật thời gian & lời chào liên tục
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );

      const hour = now.getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting("Good Morning 🌅");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good Afternoon ☀️");
      } else {
        setGreeting("Good Evening 🌙");
      }
    };

    updateTime(); // chạy lần đầu
    const interval = setInterval(updateTime, 1000); // cập nhật mỗi giây
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center text-center text-black">
      <div className="text-2xl pt-4 font-bold">{greeting}</div>

      <div className="text-2xl p-6 font-bold">
        {currentTime}
      </div>

      <div className="pt-4 flex flex-row justify-center gap-4">
        <div className="text-5xl font-semibold text-gray-700 justify-center flex items-center">
          {dataWeather?.main?.feels_like !== undefined
            ? HandleTemperature(dataWeather.main.temp)
            : "--"}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xs text-gray-600 flex items-center gap-2">
            <FontAwesomeIcon icon={faWind} />
            {dataWeather?.wind?.speed ?? "--"} m/s
          </div>
          <div className="text-xs text-gray-600 flex items-center gap-2">
            <FontAwesomeIcon icon={faDroplet} />
            {dataWeather?.main?.humidity ?? "--"}%
          </div>
        </div>
      </div>

      <div className="text-md pb-8 font-semibold text-gray-700">
        {dataWeather?.weather?.[0]?.description
          ? capitalizeEachWord(dataWeather.weather[0].description)
          : "--"}
      </div>

      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hourly Forecast</h2>
        <div className="grid grid-cols-3 grid-rows-2 gap-2">
          {forecasts.map((forecast, index) => (
            <CardWeather
              key={index}
              dateLabel={formatTo12HourTime(forecast.dt_txt)}
              temperature={forecast.main.temp}
              description={forecast.weather[0].description}
              isToday={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavRight;
