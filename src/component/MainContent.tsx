"use client";
import React, { useState, useEffect } from "react";
import CardWeather from "@/component/CardWeather";
import Select from "react-select";
import { findMaxNumber, findMinNumber, HandleTemperature } from "@/utils/handle-temperature";
import {
  capitalizeEachWord,
  formatDayName,
  handleBeforeDay,
} from "@/utils/handle-day-time";
import { tinhThanh } from "@/utils/tinhthanh"; // <-- danh sách tỉnh thành

import { ForecastResponse } from "@/types/forecast-response.d";
import { WeatherResponse } from "@/types/weather-response.d";
import { SimplifiedForecast } from "@/types/processed-data";
import { ForecastItemResponse } from "@/types/forecast-item-response.d";
import Image from "next/image";
import { useMyContext } from "@/app/MyContext";
interface IProps {
  dataForecast?: ForecastResponse;
  dataWeather?: WeatherResponse;
}

const MainContent = ({ dataForecast, dataWeather }: IProps) => {
  const [forecasts, setForecasts] = useState<SimplifiedForecast[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const {city, setCity } = useMyContext();
  const [cityList, setCityList] = useState<{ value: string; label: string }[]>(
    []
  );
  useEffect(() => {
    setIsMounted(true);
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
    console.log("group",groupedByDate)

    const processedData: SimplifiedForecast[] = Object.values(groupedByDate)
      .filter((day) => day.length > 0)
      .map((day) => {
        const descriptions = day.map((f) => f.weather?.[0]?.description || "");
        const icons = day.map((f) => f.weather?.[0]?.icon || "");
        return {
          date: formatDayName(day[0]?.dt_txt?.split(" ")[0] || ""),
          tempMax: findMaxNumber(day),
          tempMin: findMinNumber(day),
          description: descriptions[0] || "--",
          icon: icons[0] || "",
        };
      });

    setForecasts(processedData.slice(0, 7));
  }, [dataForecast, isMounted]);

  return (
    <div className="flex flex-col justify-center items-center gap-y-10">
      <div className="flex justify-around m-4 text-lg w-full">
        <div className=" flex w-3/4 ">
          {isMounted && (
            <Select
              inputId="city-select"
              options={cityList}
              value={cityList.find((c) => c.value === city)}
              onChange={(option) => {
                if (option) {
                  setCity(option.value);
                }
              }}
              placeholder="Chọn tỉnh/thành"
              className="w-full border-0 text-black bg-transparent "
              isSearchable
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: 'white', // Bạn có thể để transparent nếu muốn dropdown cũng trong suốt
                }),
                input: (base) => ({
                  ...base,
                  color: 'white',
                }),
                placeholder: (base) => ({
                  ...base,
                  color: 'white',
                }),
                singleValue: (base) => ({
                  ...base,
                  color: 'white',
                }),
              }}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col items-center w-full gap-2">
      <div className="text-3xl font-bold text-white leading-none">{city}</div>
        <div className="text-8xl font-bold text-white">
          {dataWeather?.main?.temp !== undefined
            ? HandleTemperature(dataWeather.main.temp)
            : "--"}
        </div>
           <Image  src={`https://openweathermap.org/img/wn/${dataWeather?.weather?.[0].icon}@2x.png`} className="object-cover" alt={capitalizeEachWord(dataWeather?.weather[0]?.description || "")} height={120} width={120} /> 
      </div>

      <div className="flex flex-row justify-center items-center overflow-x-auto w-full px-6">
        {forecasts.map((forecast, index) => (
          <CardWeather
            key={`${forecast.date}-${index}`}
            dateLabel={forecast.date}
            tempMin={forecast.tempMin}
            tempMax={forecast.tempMax}
            description={forecast.description}
            icon={forecast.icon}
            isToday={index === 0}
            type="day"
          />
        ))}
      </div>
    </div>
  );
};

export default MainContent;
