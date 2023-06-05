import { createContextId, useContextProvider, useSignal, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import { component$, Slot, $ } from "@builder.io/qwik";
import { routeLoader$, } from "@builder.io/qwik-city";
import type { Activities } from "~/types/activities";
import type { Weather } from "~/types/weather";
import { fahrenheitToCelsius } from "~/utils/fahrenheit-to-celsius";

export const useActivities = routeLoader$(async (requestEvent) => {
  const res = await fetch(
    "https://dtnl-frontend-internship-case.vercel.app/api/get-activities"
  );
  if (!res.ok) {
    return requestEvent.fail(res.status, {
      errorMessage:
        "An issue came up while fetching the activities. Please try again later.",
    });
  }
  const activities: Activities = await res.json();
  const returnData = { ...activities, errorMessage: null };
  return returnData;
});

export const useWeather = routeLoader$(async (requestEvent) => {

  const res = await fetch(
    "https://dtnl-frontend-internship-case.vercel.app/api/get-weather"
  );
  if (!res.ok) {
    return requestEvent.fail(res.status, {
      errorMessage:
        "An issue came up while fetching the weather. Please try again later.",
    });
  }
  const weather: Weather = await res.json();
  if (weather.temperature.metric === "FAHRENHEIT") {
    const fahrenheit = {
      ...weather,
      temperature: {
        temp: fahrenheitToCelsius(weather.temperature.temp),
        metric: "CELSIUS",
      },
      errorMessage: null,
    };
    return fahrenheit;
  }
  const returnData = { ...weather, errorMessage: null };
  return returnData;
});

export const WeatherContext = createContextId<ReturnType<typeof useWeather>>("weather");
export const ActivitiesContext = createContextId<ReturnType<typeof useActivities>>("activities");

export default component$(() => {
  const weatherCache = useSignal({})
  const activitiesCache = useSignal({})
  const weather = useWeather();
  const activities = useActivities();

  useTask$(({track}) => {
    track(() => weather.value)
    if (Object.keys(weatherCache.value).length === 0){
      weatherCache.value = weather.value
    }
  })

  useTask$(({track}) => {
    track(() => activities.value)
    if (Object.keys(activitiesCache.value).length === 0){
      activitiesCache.value = activities.value
    }
  })

  useContextProvider(WeatherContext, weatherCache)
  useContextProvider(ActivitiesContext, activitiesCache)
  const clear = $(() => {
    weatherCache.value = {}
    activitiesCache.value = {}
  })
  useVisibleTask$(() => {
    
    window.addEventListener("beforeunload", clear);

    return () => {
      window.removeEventListener("beforeunload", clear);
    };
  });
  return (
    <main>
      <Slot />
    </main>
  );
});
