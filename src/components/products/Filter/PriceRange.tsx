"use client";

import * as Slider from "@radix-ui/react-slider";
import { useState, useEffect } from "react";

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
  const [localValue, setLocalValue] = useState<[number, number]>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleInputChange = (index: number, newVal: string) => {
    const num = Number(newVal);
    if (isNaN(num)) return;

    const clamped = Math.min(Math.max(num, min), max);
    const newRange: [number, number] =
      index === 0
        ? [Math.min(clamped, localValue[1]), localValue[1]]
        : [localValue[0], Math.max(clamped, localValue[0])];

    setLocalValue(newRange);
  };

  const handleSliderCommit = (val: [number, number]) => {
    setLocalValue(val);
    onChange(val);
  };

  const handleSliderChange = (val: [number, number]) => {
    setLocalValue(val);
  };

  const handleInputBlur = () => {
    onChange(localValue);
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-1 text-sm text-slate-700">
          <span>$</span>
          <input
            type="number"
            value={localValue[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            onBlur={handleInputBlur}
            className="w-20 border rounded-md px-2 py-1 text-sm text-slate-700 focus:border-shop_dark_green focus:outline-none"
          />
        </div>
        <span className="text-slate-500">—</span>
        <div className="flex items-center gap-1 text-sm text-slate-700">
          <span>$</span>
          <input
            type="number"
            value={localValue[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            onBlur={handleInputBlur}
            className="w-20 border rounded-md px-2 py-1 text-sm text-slate-700 focus:border-shop_dark_green focus:outline-none"
          />
        </div>
      </div>

      <Slider.Root
        className="relative flex items-center w-full h-5"
        min={min}
        max={max}
        step={step}
        value={localValue}
        onValueChange={handleSliderChange}
        onValueCommit={handleSliderCommit}
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
