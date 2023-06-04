import type { QwikJSX } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { Slot } from "@builder.io/qwik";

type ButtonProps = { className?: string } & QwikJSX.IntrinsicElements["button"];

export const Button = component$(({ className, ...props }: ButtonProps) => (
  <button
    class={
      "bg-black text-white py-4 px-5 font-medium text-sm leading-[16px] rounded-full hover:opacity-90 transition-all opacity-100 " +
      className
    }
    {...props}
  >
    <Slot />
  </button>
));
