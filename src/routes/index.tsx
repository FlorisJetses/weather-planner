import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Recommendations } from "~/components/home/recommendations";
import logo from "../../public/logo/dept.svg";
import { Forecast } from "~/components/home/forecast";
import { Subscribe } from "~/components/home/subscribe";


export default component$(() => {
  const isCollapsed = useSignal(true);

  return (
    <div class="flex flex-col xl:flex-row xl:gap-[3%] mb-12">
      <div class="flex flex-col xl:flex-1 xl:sticky xl:top-0 xl:left-0">
        <div class="bg-purple px-5 pt-5 text-white md:flex xl:items-end md:flex-col md:items-center card xl:h-[min(100vh,_950px)] min-h-screen xl:min-h-0">
          <div class="max-w-[600px]">
            <img src={logo} alt="Logo" width={88} height={25} />
            <h1 class="mt-[70px] mb-[30px] ">DEPT® weather planner</h1>

            <p class="text-white">
              Picture this: an application that doesn't just tell you the
              weather, but also helps you plan your activities around it.
              Imagine knowing exactly the perfect day to plan that hike, or when
              to avoid the outdoor concert due to an unexpected shower. That's
              exactly what the Dept Weather Planner offers you.
            </p>
            <p
              aria-hidden={isCollapsed.value}
              class={`transition-all text-white ${isCollapsed.value
                  ? "opacity-0 h-0 my-4 overflow-hidden"
                  : "opacity-100 h-auto my-8"
                }`}
            >
              Built with cutting-edge technologies, our weather planner brings
              you accurate, real-time weather data with a slick and
              user-friendly interface. But it's not just a weather app; it's an
              intuitive daily planner that syncs with the weather. With a range
              of activities to choose from, it suggests the best options based
              on current and forecasted weather conditions.
            </p>
            <button
              class="border-b-[1px] select-none cursor-pointer lg:border-0 font-light text-base leading-[30px] mb-8"
              onClick$={() => {
                isCollapsed.value = !isCollapsed.value;
              }}
            >
              Read {isCollapsed.value ? "more" : "less"}
            </button>
          </div>
        </div>
        <Subscribe />
      </div>
      <div class="flex flex-col p-5 items-center xl:flex-1 xl:items-start">
        <div class="max-w-[600px] flex flex-col gap-[30px]">
          <Forecast />
          <Recommendations />
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "DEPT® weather planner",
  meta: [
    {
      name: "description",
      content: "Plan your activities with the Dept weather planner.",
    },
  ],
};
