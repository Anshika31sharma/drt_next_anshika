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
              className={`px-2 py-1 border rounded ${
                selectedObjects.includes(type)
                  ? "bg-blue-500 text-white"
                  : " bg-gray-600 text-white"
              }`}
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
              className={`px-2 py-1 border rounded ${
                selectedOrbits.includes(code)
                  ? "bg-green-500 text-white"
                  : "bg-gray-600 text-white"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={applyFilters}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Apply Filters
      </button>
    </div>
  );
}
