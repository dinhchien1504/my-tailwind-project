"use client";
import Image from "next/image";
import MainContent from "./Component/MainContent";
import NavRight from "./Component/NavRight";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


export default function Home() {
  
  const [dataWeather, setDataWeather] = useState<WeatherResponse | undefined>(undefined);
  const [city, setCity] = useState<string>("Ho chi minh")
  const [dataForecast, setDataForecast] = useState<ForecastResponse | undefined>(undefined);


  const handleCityChange = (city: string) => {
    setCity(city);
  };

  useEffect(() => {

    const fetchWeatherCity = async () => {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=vi&appid=d26b87ca6c882f50c297a6fed54d2ecf`, {
        method: "GET",
        headers: {
          'Accept': 'application/json' // Thêm tiêu đề để yêu cầu JSON
        },
      });

      const data = await res.json();
      if (data.cod == 200) {
        setDataWeather(data)
      } else {
        toast.error("Không tìm thấy tỉnh / thành phố")
      }
    }

    const fetchForecastCity = async () => {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=vi&appid=d26b87ca6c882f50c297a6fed54d2ecf`, {
        method: "GET",
        headers: {
          'Accept': 'application/json' // Thêm tiêu đề để yêu cầu JSON
        },
      });

      const data = await res.json();
      if (data.cod == 200) {
        setDataForecast(data)
      }
    }



    fetchWeatherCity()
    fetchForecastCity()

  }, [city])
  
  
  return (
    <div className="bg-[#EAEAEA] w-full h-screen flex items-center justify-center">
      <div className="bg-[#FAFAFA] w-4/5 h-4/5 grid grid-cols-10 gap-4 rounded-3xl shadow-lg overflow-hidden border">
        <div className="col-span-7 bg-[#FAFAFA] p-4 ">
        <MainContent dataWeather={dataWeather} dataForecast={dataForecast} onCityChange={handleCityChange}  />
          </div>
        <div className="col-span-3 bg-[#F6F6F6] opacity-80 p-4">
          <NavRight dataWeather={dataWeather} dataForecast={dataForecast}/>
        </div>
      </div>
    </div>
  );
}
