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
    priceRange: [0, 5000] as [number, number],
    status: [] as string[],
  });

  const [categories, setCategories] = useState<
    { slug: string; title: string }[]
  >([]);
  const [statuses] = useState<string[]>(["New", "Hot", "Sale"]);
  const [minLimit, setMinLimit] = useState(0);
  const [maxLimit, setMaxLimit] = useState(10000);

  useEffect(() => {
    getCategories().then((cats) => {
      const validCats = cats
        .filter((c: any) => c.slug?.current && c.title)
        .map((c: any) => ({
          slug: c.slug.current,
          title: c.title,
        }));
      setCategories(validCats);
    });
  }, []);

  const handleCheckbox = (type: "category" | "status", value: string) => {
    setFilters((prev) => {
      const newValues = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value];
      const updated = { ...prev, [type]: newValues };
      console.log(`[FilterAside] ${type} changed:`, value);
      console.log(`[FilterAside] Updated filters:`, updated);
      onFilterChange?.(updated);
      return updated;
    });
  };

  const handlePriceChange = (range: [number, number]) => {
    setFilters((prev) => {
      const updated = { ...prev, priceRange: range };
      console.log(`[FilterAside] Price range changed:`, range);
      console.log(`[FilterAside] Updated filters:`, updated);
      onFilterChange?.(updated);
      return updated;
    });
  };

  const resetFilters = () => {
    const cleared = {
      category: [],
      priceRange: [minLimit, maxLimit] as [number, number],
      status: [],
    };
    console.log(`[FilterAside] Filters reset to:`, cleared);
    setFilters(cleared);
    onFilterChange?.(cleared);
  };

  return (
    <aside className="lg:w-64 bg-white border rounded-lg p-5 flex flex-col gap-6 md:w-full sticky top-20">
      <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-2 uppercase">
          Category
        </h4>
        <div className="flex flex-col gap-1 text-slate-600">
          {categories.map((cat) => (
            <label
              key={cat.slug}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.category.includes(cat.slug)}
                onChange={() => handleCheckbox("category", cat.slug)}
                className="accent-shop_dark_green"
              />
              {cat.title}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-slate-700 mb-2 uppercase">
          Price
        </h4>
        <PriceRange
          min={minLimit}
          max={maxLimit}
          value={filters.priceRange}
          onChange={handlePriceChange}
        />
      </div>

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
        className="mt-auto border-shop_dark_green text-shop_dark_green"
      >
        Reset filters
      </Button>
    </aside>
  );
}
