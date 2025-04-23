"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind, faDroplet } from "@fortawesome/free-solid-svg-icons";
import CardWeather from "./CardWeather";
import Select from "react-select";
import { findMaxNumber, HandleTemperature } from "../utils/handle-temperature";
import {
  capitalizeEachWord,
  formatDayName,
  handleBeforeDay,
} from "../utils/handle-day-time";
import { findMostFrequentElement } from "../utils/handle-icon";
import { tinhThanh } from "../utils/tinhthanh"; // <-- danh sách tỉnh thành

import type { SimplifiedForecast } from "../Types/processed-data";
// import type { ForecastResponse, ForecastItemResponse, WeatherResponse } from "../Types/"; // thêm nếu chưa có
interface IProps {
  dataForecast?: ForecastResponse;
  dataWeather?: WeatherResponse;
  onCityChange?: (city: string) => void; // <-- optional callback
}

const MainContent = ({ dataForecast, dataWeather, onCityChange }: IProps) => {
  const [forecasts, setForecasts] = useState<SimplifiedForecast[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState("--");

  const [cityList, setCityList] = useState<{ value: string; label: string }[]>(
    []
  );
  const [selectedCity, setSelectedCity] = useState("Quận 4");

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Ho_Chi_Minh",
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const cities = tinhThanh();
    setCityList(cities);
  }, []);

  useEffect(() => {
    if (!isMounted || !dataForecast?.list) return;

    const groupedByDate: { [key: string]: ForecastItemResponse[] } = {};

    dataForecast.list.forEach((forec) => {
      const dateStr = forec.dt_txt?.split(" ")[0] || "";
      if (dateStr && !handleBeforeDay(dateStr)) {
        groupedByDate[dateStr] = groupedByDate[dateStr] || [];
        groupedByDate[dateStr].push(forec);
      }
    });

    const processedData: SimplifiedForecast[] = Object.values(groupedByDate)
      .filter((day) => day.length > 0)
      .map((day) => {
        const descriptions = day.map((f) => f.weather?.[0]?.description || "");
        return {
          date: formatDayName(day[0]?.dt_txt?.split(" ")[0] || ""),
          tempMax: findMaxNumber(day),
          description: descriptions[0] || "--",
        };
      });

    setForecasts(processedData.slice(0, 7));
  }, [dataForecast, isMounted]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCity(value);
    if (onCityChange) {
      onCityChange(value); // truyền ra component cha nếu có
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-y-16">
      <div className="flex flex-row justify-around m-4 text-lg w-full">
        <div className=" flex flex-row w-3/4 ">
          {isMounted && (
            <Select
              inputId="city-select"
              options={cityList}
              value={cityList.find((c) => c.value === selectedCity)}
              onChange={(option) => {
                if (option) {
                  setSelectedCity(option.value);
                  onCityChange?.(option.value);
                }
              }}
              placeholder="Chọn tỉnh/thành"
              className="w-full border-0 text-black bg-transparent "
              isSearchable
            />
          )}
        </div>
        <div className="text-black font-medium text-xl flex items-center">
          {isMounted ? currentTime : "--"}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-9xl font-bold text-gray-700">
          {dataWeather?.main?.temp !== undefined
            ? HandleTemperature(dataWeather.main.temp)
            : "--"}
        </div>

        <div className="flex flex-row gap-4 mt-2">
          <div className="text-2xl text-gray-600 flex items-center gap-2">
            <FontAwesomeIcon icon={faWind} />
            {dataWeather?.wind?.speed ?? "--"} m/s
          </div>
          <div className="text-2xl text-gray-600 flex items-center gap-2">
            <FontAwesomeIcon icon={faDroplet} />
            {dataWeather?.main?.humidity ?? "--"}%
          </div>
        </div>

        <div className="text-3xl text-gray-700 p-2 mt-2">
          {dataWeather?.weather?.[0]?.description
            ? capitalizeEachWord(dataWeather.weather[0].description)
            : "--"}
        </div>
      </div>

      <div className="flex flex-row justify-center items-center overflow-x-auto w-3/4 mt-4">
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
