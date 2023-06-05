import { component$, useContext } from "@builder.io/qwik";
import {
  ActivitiesContext,
  WeatherContext,
  useActivities,
  useWeather,
} from "~/routes/layout";
import type { Activity } from "~/types/activities";
import { isCorrectTemperature } from "~/utils/is-correct-temperature";
import { ActivityCard } from "./activity-card";

export const Recommendations = component$(() => {
  const weather = useWeather();
  const weatherCache = useContext(WeatherContext);
  const weatherSignal =
    Object.keys(weatherCache.value).length === 0 ? weather : weatherCache;

  const activities = useActivities();
  const activitiesCache = useContext(ActivitiesContext);
  const activitiesSignal =
    Object.keys(activitiesCache.value).length === 0
      ? activities
      : activitiesCache;

  if (weatherSignal.value.errorMessage !== null || activitiesSignal.value.errorMessage !== null) {
    return <p>{activitiesSignal.value.errorMessage}</p>;
  }

  const shouldPerformActivity: { yes: Activity[]; no: Activity[] } = {
    yes: [],
    no: [],
  };
  activitiesSignal.value.activities.forEach((activity: Activity) => {
    // Added another check for errorMessage because of a bug with typescript in function parameters
    if (weatherSignal.value.errorMessage === null && isCorrectTemperature(activity, weatherSignal.value.temperature.temp)) {
      shouldPerformActivity.yes.push(activity);
    } else {
      shouldPerformActivity.no.push(activity);
    }
  });

  return (
    <div>
      <h5 class="mb-[10px] self-start">Some things you could do:</h5>
      <div class="flex flex-col gap-[30px] mb-[30px]">
        {shouldPerformActivity.yes.length > 0 ? (
          shouldPerformActivity.yes.map((activity) => (
            <ActivityCard key={activity.title} activity={activity} />
          ))
        ) : (
          <p>There is no activity to recommend doing at this temperature.</p>
        )}
      </div>

      <h5 class="mb-[10px] self-start">Some things you should not do:</h5>
      <div class="flex flex-col gap-[30px]">
        {shouldPerformActivity.no.length > 0 ? (
          shouldPerformActivity.no.map((activity) => (
            <ActivityCard key={activity.title} activity={activity} />
          ))
        ) : (
          <p>There is no activity to discourage doing at this temperature.</p>
        )}
      </div>
    </div>
  );
});
