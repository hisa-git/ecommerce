import React from "react";

export default function ProductItemSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-white w-full animate-pulse">
      <div className="relative w-full aspect-square bg-gray-200 flex items-center justify-center">
        <div className="absolute top-3 left-3 w-12 h-4 bg-gray-300 rounded"></div>
        <div className="absolute top-3 right-3 w-10 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="flex flex-col justify-between p-4 flex-grow">
        <div className="flex-grow space-y-2 mb-3">
          <div className="h-5 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-300 rounded w-16"></div>
            <div className="h-5 bg-gray-400 rounded w-20"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}
