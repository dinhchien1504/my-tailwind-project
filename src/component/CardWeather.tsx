"use client";
import React from 'react';
import { HandleTemperature } from "@/utils/handle-temperature";



interface IProps {
  dateLabel: string;
  temperature: number;
  description: string;
  isToday?: boolean;
}
const CardWeather = ({ dateLabel, temperature, description, isToday }: IProps) => {

  return (
    <div className='flex flex-col  text-center  rounded-xl border-2 border-solid border-transparent 
     hover:border-[#E1E1E1] py-4 transition duration-200  min-h-[20vh] w-full '>
      <div className="text-lg font-semibold text-gray-700  mb-4"> 
      {isToday && !/^\d{1,2}(:\d{2})?\s?(AM|PM)?$/i.test(dateLabel) ? 'Today' : dateLabel}
      </div>

      <div className="text-xl font-bold text-blue-600 mb-4">
        {HandleTemperature(temperature)}C
      </div>

      <div className="text-sm text-gray-500 capitalize ">
        {description}
      </div>
    </div>
  );
};

export default CardWeather;
