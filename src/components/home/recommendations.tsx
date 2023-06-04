import { component$ } from "@builder.io/qwik";
import { useActivities, useWeather } from "~/routes/layout";
import type { Activity } from "~/types/activities";
import { isCorrectTemperature } from "~/utils/is-correct-temperature";
import { ActivityCard } from "./activity-card";

export const Recommendations = component$(() => {
    const weatherSignal = useWeather();
    const actitivtiesSignal = useActivities();

    if (
        weatherSignal.value.errorMessage &&
        actitivtiesSignal.value.errorMessage
    ) {
        return <p>{actitivtiesSignal.value.errorMessage}</p>;
    }

    const shouldPerformActivity: { yes: Activity[]; no: Activity[] } = {
        yes: [],
        no: [],
    };
    actitivtiesSignal.value.activities.forEach((activity: Activity) => {
        if (isCorrectTemperature(activity, weatherSignal.value.temperature.temp)) {
            shouldPerformActivity.yes.push(activity);
        } else {
            shouldPerformActivity.no.push(activity);
        }
    });

    return (
        <div>
            <h5 class="mb-[10px] self-start">Some things you could do:</h5>
            <div class="flex flex-col gap-[30px] mb-[30px]">
                {shouldPerformActivity.yes.length > 0 ? shouldPerformActivity.yes.map((activity) => (
                    <ActivityCard key={activity.title} activity={activity} />
                )) : <p>There is no activity to recommend doing at this temperature.</p>}
            </div>

            <h5 class="mb-[10px] self-start">Some things you should not do:</h5>
            <div class="flex flex-col gap-[30px]">
            {shouldPerformActivity.no.length > 0 ? shouldPerformActivity.no.map((activity) => (
                    <ActivityCard key={activity.title} activity={activity} />
                )) : <p>There is no activity to discourage doing at this temperature.</p>}
            </div>
        </div>
    );
});


