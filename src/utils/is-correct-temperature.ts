import type { Activity } from "~/types/activities";
import type { WeatherInfo } from "~/types/weather";

export const isCorrectTemperature = (activity: Activity | WeatherInfo, temp: number) => {
    if (activity.maxTemp !== null && activity.minTemp !== null) {
      return temp >= activity.minTemp && temp <= activity.maxTemp;
    } else if (activity.maxTemp !== null) {
      return temp <= activity.maxTemp;
    } else if (activity.minTemp !== null) {
      return temp >= activity.minTemp;
    }
    return true;
  };