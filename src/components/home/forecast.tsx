import { component$ } from "@builder.io/qwik";
import { useWeather } from "~/routes/layout";
import type { WeatherInfo } from "~/types/weather";
import { isCorrectTemperature } from "~/utils/is-correct-temperature";

export const Forecast = component$(() => {
  const weatherSignal = useWeather();

  if (weatherSignal.value.errorMessage) {
    return <p>{weatherSignal.value.errorMessage}</p>;
  }

  const temperature = weatherSignal.value.temperature.temp;

  return (
    <div class="bg-rose flex flex-col p-5 rounded-md sm:flex-row sm:items-center sm:gap-6">
      <p class="font-medium text-[90px] leading-[108px] text-black">{temperature}˚</p>
      <div>
        <h6>It's currently around {temperature}˚ in the Netherlands</h6>
        <p>
          {
            weatherSignal.value.weatherInfo.find((info: WeatherInfo) => {
              return isCorrectTemperature(info, temperature);
            }).description
          }
        </p>
      </div>
    </div>
  );
});
