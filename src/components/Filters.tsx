"use client";

import { useState } from "react";

const OBJECT_TYPES = ["ROCKET BODY", "DEBRIS", "UNKNOWN", "PAYLOAD"] as const;
const ORBIT_CODES = [
  "LEO", "LEO1", "LEO2", "LEO3", "LEO4", "MEO", "GEO", "HEO", "IGO", "EGO",
  "NSO", "GTO", "GHO", "HAO", "MGO", "LMO", "UFO", "ESO", "UNKNOWN",
] as const;

type FilterParams = {
  objectTypes?: string[];
  orbitCodes?: string[];
};

interface FiltersProps {
  filters: FilterParams;
  setFilters: React.Dispatch<React.SetStateAction<FilterParams>>;
}

export default function Filters({ filters, setFilters }: FiltersProps) {
  const [selectedObjects, setSelectedObjects] = useState<string[]>(
    filters.objectTypes || []
  );
  const [selectedOrbits, setSelectedOrbits] = useState<string[]>(
    filters.orbitCodes || []
  );

  const toggleSelection = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const applyFilters = () => {
    setFilters({
      objectTypes: selectedObjects,
      orbitCodes: selectedOrbits,
    });
  };

  return (
    <div className="space-y-4 p-4 rounded-lg shadow">
      <div>
        <h2 className="font-bold mb-2">Object Types</h2>
       <div className="flex flex-wrap gap-2">
          {OBJECT_TYPES.map((type) => (
            <button
              key={type}
              onClick={() =>
                toggleSelection(selectedObjects, setSelectedObjects, type)
              }
              className={`px-4 py-2 rounded-full font-semibold shadow-md transition-all duration-200
                ${
                  selectedObjects.includes(type)
                    ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg scale-105"
                    : "bg-gray-700 text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-cyan-300 hover:text-white"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-300`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-bold mb-2">Orbit Codes</h2>
         <div className="flex flex-wrap gap-2">
          {ORBIT_CODES.map((code) => (
            <button
              key={code}
              onClick={() =>
                toggleSelection(selectedOrbits, setSelectedOrbits, code)
              }
              className={`px-4 py-2 rounded-full font-semibold shadow-md transition-all duration-200
                ${
                  selectedOrbits.includes(code)
                    ? "bg-gradient-to-r from-green-500 to-lime-400 text-white shadow-lg scale-105"
                    : "bg-gray-700 text-white hover:bg-gradient-to-r hover:from-green-400 hover:to-lime-300 hover:text-white"
                }
                focus:outline-none focus:ring-2 focus:ring-green-300`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={applyFilters}
        className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all duration-200 hover:from-purple-600 hover:to-indigo-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        Apply Filters
      </button>
    </div>
  );
}
