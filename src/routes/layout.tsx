import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { Activities } from '~/types/activities';
import { Weather } from '~/types/weather';
import { fahrenheitToCelsius } from '~/utils/fahrenheit-to-celsius';

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
  return { ...activities, errorMessage: null };
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
    return {
      ...weather,
      temperature: {
        temp: fahrenheitToCelsius(weather.temperature.temp),
        metric: "CELSIUS",
      },
      errorMessage: null,
    };
  }
  return { ...weather, errorMessage: null };
});

export default component$(() => {
  return (
    <main>
      <Slot />
    </main>
  );
});
