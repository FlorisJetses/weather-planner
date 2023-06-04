import { component$ } from "@builder.io/qwik";
import type { Activity } from "~/types/activities";
import { Image } from "@unpic/qwik";

type ActivityCardProps = { activity: Activity };

export const ActivityCard = component$(({ activity }: ActivityCardProps) => (
  <div class="flex flex-col sm:flex-row sm:gap-3">
    {activity.imageUrl.startsWith("https") ? (
      <div class="h-[130px] w-full max-w-[335px] sm:min-w-[335px] lg:h-[109px] lg:w-[109px] lg:min-w-[109px] object-contain">
        <Image
          src={activity.imageUrl}
          background="#D9D9D9"
          class="h-[130px] w-[335px] lg:h-[109px] lg:w-[109px]"
          layout="fullWidth"
          alt="Activity image"
        />
      </div>
    ) : (
      <div class="h-[130px] w-[335px] min-w-[335px] lg:h-[109px] lg:w-[109px] lg:min-w-[109px] bg-gray200 "></div>
    )}
    <div>
      <h6 class="mt-5 mb-[5px] sm:mt-0">{activity.title}</h6>
      <p class="border-b-[1px] pb-5 border-[#E5E5E5]">{activity.description}</p>
    </div>
  </div>
));
