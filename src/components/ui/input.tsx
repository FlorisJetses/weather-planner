import type { QwikJSX } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

export const Input = component$((props: QwikJSX.IntrinsicElements["input"]) => (
  <input
    class="border-black border-[1px] p-4 rounded-full bg-[#F2F2F2] text-black placeholder-black font-medium text-sm leading-[16px] text-center"
    {...props}
  />
));
