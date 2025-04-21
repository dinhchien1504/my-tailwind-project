"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind, faDroplet } from "@fortawesome/free-solid-svg-icons";
import CardWeather from "./CardWeather";
import {
  findMaxNumber,
  HandleTemperature,
} from "../utils/handle-temperature";
import {
  capitalizeEachWord,
  formatDayName,
  handleBeforeDay,
} from "../utils/handle-day-time";
import { findMostFrequentElement } from "../utils/handle-icon";
import type { SimplifiedForecast } from "../types"; // <-- nhập type mới

interface IProps {
  dataForecast?: ForecastResponse;
  dataWeather?: WeatherResponse;
}

const MainContent = (props: IProps) => {
  const { dataForecast, dataWeather } = props;
  const [forecasts, setForecasts] = useState<SimplifiedForecast[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState("--");

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // Đảm bảo hiện AM/PM thay vì CH/SA
          timeZone: "Asia/Ho_Chi_Minh", // bạn có thể đổi theo local
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isMounted || !dataForecast?.list) return;

    const processForecastData = () => {
      const groupedByDate: { [key: string]: ForecastItemResponse[] } = {};

      dataForecast.list.forEach((forec) => {
        const dateStr = forec.dt_txt?.split(" ")[0] || "";
        const forecastDate = new Date(dateStr + "T00:00:00Z");

        if (dateStr && !handleBeforeDay(dateStr)) {
          groupedByDate[dateStr] = groupedByDate[dateStr] || [];
          groupedByDate[dateStr].push(forec);
        }
      });

      const processedData: SimplifiedForecast[] = Object.values(groupedByDate)
        .filter((dayTime) => dayTime.length > 0)
        .map((dayTime) => {
          const descriptions = dayTime.map(
            (fo) => fo.weather?.[0]?.description || ""
          );

          return {
            date: formatDayName(dayTime[0]?.dt_txt?.split(" ")[0] || ""),
            tempMax: findMaxNumber(dayTime),
            description: descriptions[0] || "--",
          };
        });

      setForecasts(processedData.slice(0, 7)); 
    };

    processForecastData();
  }, [dataForecast, isMounted]);

  return (
    <div className="flex flex-col justify-center items-center gap-y-18">
      <div className="flex flex-row justify-around m-4 text-lg w-full">
        <div className="text-black">Location</div>
        <div className="text-black">{isMounted ? currentTime : "--"}</div>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-9xl font-bold text-gray-700">
          {dataWeather?.main?.temp !== undefined
            ? HandleTemperature(dataWeather.main.temp)
            : "--"}
        </div>

        <div className="flex flex-row gap-4">
          <div className="text-2xl text-gray-600 flex items-center gap-2">
            <FontAwesomeIcon icon={faWind} />
            {dataWeather?.wind?.speed ?? "--"} m/s
          </div>
          <div className="text-2xl text-gray-600 flex items-center gap-2">
            <FontAwesomeIcon icon={faDroplet} />
            {dataWeather?.main?.humidity ?? "--"}%
          </div>
        </div>

        <div className="text-3xl text-gray-700 p-2">
          {dataWeather?.weather?.[0]?.description
            ? capitalizeEachWord(dataWeather.weather[0].description)
            : "--"}
        </div>
      </div>

      <div className="flex flex-row justify-center items-center overflow-x-auto w-3/4 ">
        {forecasts.map((forecast, index) => (
          <CardWeather
            key={`${forecast.date}-${index}`}
            dateLabel={forecast.date}
            temperature={forecast.tempMax}
            description={forecast.description}
            isToday={index === 0}
          />
        ))}
      </div>
    </div>
  );

};

export default MainContent;
