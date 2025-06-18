"use client";

import React from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export interface Satellite {
  name: string;
  noradCatId: string;
  orbitCode: string;
  objectType: string;
  countryCode: string;
  launchDate: string;
  [key: string]: any;
}

interface TableProps {
  data: Satellite[];
  selected: Satellite[];
  setSelected: React.Dispatch<React.SetStateAction<Satellite[]>>;
  sortKey: string;
  setSortKey: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: "asc" | "desc";
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}

export default function Table({
  data,
  selected,
  setSelected,
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
}: TableProps) {
  const headers = [
    { key: "name", label: "Name" },
    { key: "noradCatId", label: "NORAD ID" },
    { key: "orbitCode", label: "Orbit Code" },
    { key: "objectType", label: "Object Type" },
    { key: "countryCode", label: "Country Code" },
    { key: "launchDate", label: "Launch Date" },
  ];

  const toggleSelection = (item: Satellite) => {
    const alreadySelected = selected.find((s) => s.noradCatId === item.noradCatId);
    if (alreadySelected) {
      setSelected(selected.filter((s) => s.noradCatId !== item.noradCatId));
    } else {
      if (selected.length >= 10) {
        alert("You can only select up to 10 objects.");
        return;
      }
      setSelected([...selected, item]);
    }
  };

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Only sort by selected column
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const getSortIcon = (key: string) => {
    const isActive = sortKey === key;
    const baseStyle = "inline-block ml-1 text-xs";
    if (!isActive) return <span className={`${baseStyle} opacity-50`}>▲▼</span>;
    return (
      <span className={baseStyle}>{sortOrder === "asc" ? "▲" : "▼"}</span>
    );
  };

  return (
    <div className="mt-4 border border-gray-700 rounded shadow overflow-hidden">
      <div className="bg-gray-700 text-white grid grid-cols-7 text-sm font-medium px-2 py-3">
        <div></div>
        {headers.map((h) => (
          <div
            key={h.key}
            onClick={() => toggleSort(h.key)}
            className="cursor-pointer select-none whitespace-nowrap flex items-center gap-1"
          >
            {h.label}
            {getSortIcon(h.key)}
          </div>
        ))}
      </div>
      <div style={{ height: 400 }}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={sortedData.length}
              itemSize={50}
              width={width}
            >
              {({ index, style }) => {
                const sat = sortedData[index];
                const isChecked = selected.some(
                  (s) => s.noradCatId === sat.noradCatId
                );

                return (
                  <div
                    key={sat.noradCatId}
                    style={style}
                    className={`grid grid-cols-7 px-2 py-3 text-sm items-center border-b border-gray-700 ${
                      isChecked ? "bg-blue-900" : ""
                    }`}
                  >
                    <div className="text-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSelection(sat)}
                      />
                    </div>
                    <div>{sat.name}</div>
                    <div>{sat.noradCatId}</div>
                    <div>{sat.orbitCode}</div>
                    <div>{sat.objectType}</div>
                    <div>{sat.countryCode}</div>
                    <div>{sat.launchDate}</div>
                  </div>
                );
              }}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}
