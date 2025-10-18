"use client";
import * as Slider from "@radix-ui/react-slider";

type PriceRangeProps = {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

export default function PriceRange({
  min,
  max,
  step = 1,
  value,
  onChange,
}: PriceRangeProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-slate-600 mb-2">
        <span>From ${value[0]}</span>
        <span>To ${value[1]}</span>
      </div>

      <Slider.Root
        className="relative flex items-center w-full h-5"
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(val) => onChange(val as [number, number])}
      >
        <Slider.Track className="bg-gray-200 relative grow h-1 rounded-full">
          <Slider.Range className="absolute bg-shop_dark_green h-full rounded-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-4 h-4 bg-shop_light_green rounded-full shadow-sm hover:scale-110 transition-transform" />
        <Slider.Thumb className="block w-4 h-4 bg-shop_light_green rounded-full shadow-sm hover:scale-110 transition-transform" />
      </Slider.Root>
    </div>
  );
}
