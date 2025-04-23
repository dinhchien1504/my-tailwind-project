"use client";
import React from 'react';
import { HandleTemperature } from '../utils/handle-temperature';
import { formatTo12HourTime } from '../utils/handle-day-time';



interface IProps {
  forecast?: ForecastItemResponse;
}

const CardWeather = ({ forecast }: IProps) => {
  if (!forecast) return null;

  return (
    <div className='flex flex-col justify-between text-center gap-2 rounded-xl border-2 border-solid border-transparent 
     hover:border-[#E1E1E1] p-4 transition duration-200 w-28'>
      
      <div className="font-semibold text-sm text-gray-700">
        {formatTo12HourTime(forecast.dt_txt)}
      </div>

      <div className="text-xl font-bold text-blue-600">
        {HandleTemperature(forecast.main.temp)}
      </div>

      <div className="text-xs text-gray-500 capitalize">
        {forecast.weather?.[0]?.description ?? '--'}
      </div>
    </div>
  );
};

export default CardWeather;
