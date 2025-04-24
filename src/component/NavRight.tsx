"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind, faDroplet, faSun, faGauge, faCloud, faMoon, faArrowUp, faArrowDown, faTemperatureHalf } from "@fortawesome/free-solid-svg-icons";
import { HandleTemperature } from "@/utils/handle-temperature";
import { formatTo12HourTime } from "@/utils/handle-day-time";
import { ForecastResponse } from "@/types/forecast-response.d";
import { WeatherResponse } from "@/types/weather-response.d";
import { ForecastItemResponse } from "@/types/forecast-item-response.d";
import CardWeather from "@/component/CardWeather";
import { useMyContext } from "@/app/MyContext";

interface IProps {
  dataForecast?: ForecastResponse;
  dataWeather?: WeatherResponse;
}

const NavRight = ({ dataForecast, dataWeather }: IProps) => {
  const [forecasts, setForecasts] = useState<ForecastItemResponse[]>([]);
  const [currentTime, setCurrentTime] = useState("--");
  const { setSharedVar } = useMyContext();

  // Cập nhật thời gian và chào hỏi
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
      if (hour >= 5 && hour < 12) setSharedVar("morning");
      else if (hour >= 12 && hour < 17) setSharedVar("afternoon");
      else setSharedVar("evening");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [setSharedVar]);

  // Lọc 6 forecast tiếp theo
  useEffect(() => {
    if (!dataForecast?.list) return;

    const now = new Date();
    const upcoming = dataForecast.list.filter(f => new Date(f.dt_txt) > now).slice(0, 6);
    setForecasts(upcoming);
  }, [dataForecast]);

  return (
    <div className="flex flex-col justify-center text-center text-white">
      <div className="text-2xl p-6 font-bold">{currentTime}</div>

      <div className="pt-4 flex flex-col items-center gap-4">
  <div className="grid grid-cols-3 gap-x-6 gap-y-3 text-sm text-left">
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faDroplet} />
      <span>Độ ẩm:</span> {dataWeather?.main?.humidity ?? "--"}%
    </div>
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faWind} />
      <span>Gió:</span> {dataWeather?.wind?.speed ?? "--"} m/s
    </div>
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faTemperatureHalf} />
      <span>Cảm giác:</span>{" "}
      {dataWeather?.main?.feels_like
        ? HandleTemperature(dataWeather.main.feels_like)
        : "--"}
    </div>
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faArrowDown} />
      <span>Thấp nhất:</span>{" "}
      {dataWeather?.main?.temp_min
        ? HandleTemperature(dataWeather.main.temp_min)
        : "--"}
    </div>
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faArrowUp} />
      <span>Cao nhất:</span>{" "}
      {dataWeather?.main?.temp_max
        ? HandleTemperature(dataWeather.main.temp_max)
        : "--"}
    </div>
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faGauge} />
      <span>Áp suất:</span> {dataWeather?.main?.pressure ?? "--"} hPa
    </div>
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faCloud} />
      <span>Mây:</span> {dataWeather?.clouds?.all ?? "--"}%
    </div>
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faSun} />
      <span>Mọc:</span>{" "}
      {dataWeather?.sys?.sunrise
        ? new Date(dataWeather.sys.sunrise * 1000).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "--"}
    </div>
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faMoon} />
      <span>Lặn:</span>{" "}
      {dataWeather?.sys?.sunset
        ? new Date(dataWeather.sys.sunset * 1000).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "--"}
    </div>
  </div>
</div>




      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Dự báo theo giờ tiếp theo</h2>
        <div className="grid grid-cols-3 grid-rows-2 gap-2">
          {forecasts.map((forecast, index) => (
            <CardWeather
              key={index}
              dateLabel={formatTo12HourTime(forecast.dt_txt)}
              temperature={forecast.main.temp}
              description={forecast.weather[0].description}
              isToday={index === 0}
              icon={forecast.weather[0].icon}
              type="hour"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavRight;
