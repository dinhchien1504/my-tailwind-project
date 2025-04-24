import { ReactNode } from "react";

interface WeatherInfoItemProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  unit?: string;
}

const WeatherInfoItem = ({ icon, label, value, unit }: WeatherInfoItemProps) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{label}</span>
      <span>
        {value ?? "--"}
        {value !== "--" && unit ? ` ${unit}` : ""}
      </span>
    </div>
  );
};

export default WeatherInfoItem;
