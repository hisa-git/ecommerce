"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import PriceRange from "./PriceRange";
import { getCategories } from "@/sanity/sanity-utils";

interface FilterAsideProps {
  onFilterChange?: (filters: Record<string, any>) => void;
}

export default function FilterAside({ onFilterChange }: FilterAsideProps) {
  const [filters, setFilters] = useState({
    category: [] as string[],
    priceRange: "",
    status: [] as string[],
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([
    "New",
    "Sale",
    "Out of stock",
  ]);

  const [minLimit, setMinLimit] = useState(0);
  const [maxLimit, setMaxLimit] = useState(10000);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  useEffect(() => {
    getCategories().then((cats) => {
      // достаём только названия
      const catTitles = cats.map((c: any) => c.title).filter(Boolean);
      setCategories(catTitles);
    });
  }, []);

  const handleCheckbox = (type: "category" | "status", value: string) => {
    setFilters((prev) => {
      const newValues = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      const updated = { ...prev, [type]: newValues };
      onFilterChange?.(updated);
      return updated;
    });
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
    setFilters((prev) => {
      const updated = { ...prev, priceRange: range };
      onFilterChange?.(updated);
      return updated;
    });
  };

  const resetFilters = () => {
    const cleared = { category: [], priceRange: "", status: [] };
    setFilters(cleared);
    setPriceRange([minLimit, maxLimit]);
    onFilterChange?.(cleared);
  };

  return (
    <aside className="lg:w-64 bg-white border rounded-lg p-5 flex flex-col gap-6 md:w-full sticky top-20">
      <h3 className="text-lg font-semibold text-slate-900">Filters</h3>

      {/* CATEGORY */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-2 uppercase">
          Category
        </h4>
        <div className="flex flex-col gap-1 text-slate-600">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category.includes(cat)}
                onChange={() => handleCheckbox("category", cat)}
                className="accent-shop_dark_green"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-2 uppercase">
          Price
        </h4>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex flex-col w-1/2">
            <label className="text-xs text-slate-500">Min</label>
            <input
              type="number"
              value={minLimit}
              onChange={(e) => {
                const val = Math.max(0, Number(e.target.value));
                setMinLimit(val);
                if (priceRange[0] < val)
                  setPriceRange([val, Math.max(val, priceRange[1])]);
              }}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="text-xs text-slate-500">Max</label>
            <input
              type="number"
              value={maxLimit}
              onChange={(e) => {
                const val = Math.max(minLimit + 1, Number(e.target.value));
                setMaxLimit(val);
                if (priceRange[1] > val)
                  setPriceRange([Math.min(priceRange[0], val - 1), val]);
              }}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            />
          </div>
        </div>

        <PriceRange
          min={minLimit}
          max={maxLimit}
          value={priceRange}
          onChange={handlePriceChange}
        />
      </div>

      {/* STATUS */}
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-2 uppercase">
          Status
        </h4>
        <div className="flex flex-col gap-1 text-slate-600">
          {statuses.map((stat) => (
            <label
              key={stat}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.status.includes(stat)}
                onChange={() => handleCheckbox("status", stat)}
                className="accent-shop_dark_green"
              />
              {stat}
            </label>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        onClick={resetFilters}
        className="mt-auto border-shop_dark_green text-shop_dark_green hover:bg-shop_light_green hover:text-white"
      >
        Reset filters
      </Button>
    </aside>
  );
}
