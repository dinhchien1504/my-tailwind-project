"use client";

import MainContent from "@/component/MainContent";
import NavRight from "@/component/NavRight";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { WeatherResponse } from "@/types/weather-response.d";
import { ForecastResponse } from "@/types/forecast-response.d";
import { useMyContext } from "./MyContext";

export default function Home() {
  const [dataWeather, setDataWeather] = useState<WeatherResponse>();
  const [dataForecast, setDataForecast] = useState<ForecastResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const { city, sharedVar } = useMyContext();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // <== Đặt loading nhưng không xoá dataWeather / dataForecast
  
        const [weatherRes, forecastRes] = await Promise.all([
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=vi&appid=d26b87ca6c882f50c297a6fed54d2ecf`),
          fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=vi&appid=d26b87ca6c882f50c297a6fed54d2ecf`)
        ]);
  
        const weatherData = await weatherRes.json();
        const forecastData = await forecastRes.json();
  
        if (weatherData.cod === 200) {
          setDataWeather(weatherData);
        } else {
          toast.error("Không tìm thấy tỉnh / thành phố");
        }
  
        if (forecastData.cod === "200") {
          setDataForecast(forecastData);
        }
  
      } catch (err) {
        console.log(err);
        toast.error("Lỗi kết nối server");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [city]);
  

  if (!isMounted) return null;
  
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url('/${sharedVar}.jpg')` }}
    >
      {/* Overlay loader */}
    {isLoading && (
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
      </div>
    )}
    
      <div className="bg-gray-400/30 gap-4 flex w-4/5 flex-col md:flex-row justify-center items-center shadow-2xl rounded-3xl overflow-hidden my-2 p-4">
        <div className="flex-4 flex-col ">
          <MainContent
            dataWeather={dataWeather}
            dataForecast={dataForecast}
          />
        </div>
        <div className="flex-3 opacity-80">
          <NavRight
            dataWeather={dataWeather}
            dataForecast={dataForecast}
          />
        </div>
      </div>
    </div>
  );
  
}
