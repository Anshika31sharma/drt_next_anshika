"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchSatellites } from "@/utils/api";
import Filters from "@/components/Filters";
import Table from "@/components/Table";
import Header from "@/components/Header";
import StarsBackground from "@/components/StarsBackground";

interface Satellite {
  noradCatId: string;
  name: string;
  orbitCode: string;
  objectType: string;
  countryCode: string;
  launchDate: string;
}


interface FilterParams {
  objectTypes?: string[];
  orbitCodes?: string[];
  [key: string]: any;
}

export default function Home() {
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [selected, setSelected] = useState<Satellite[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("selected");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [filters, setFilters] = useState<FilterParams>({});
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchSatellites(filters);
        setSatellites(data);
      } catch {
        setSatellites([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filters]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("selected");
      if (stored) {
        setSelected(JSON.parse(stored));
      }
    }
  }, []);

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        const fresh = await fetchSatellites(filters);
        const filtered = fresh.filter(
          (s: Satellite) =>
            s.name?.toLowerCase().includes(query.toLowerCase()) ||
            s.noradCatId?.toString().includes(query)
        );
        setSatellites(filtered);
      } catch (err) {
        console.error("Search failed", err);
        setSatellites([]);
      }
    }
  };

  const handleProceed = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selected", JSON.stringify(selected));
      router.push("/selected");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#1b1f33] to-[#0a0f1c]  text-white overflow-hidden">
        <StarsBackground />
      <div className="relative z-10 p-4">
        <Header title="🛰️ Satellite Dashboard"/>
        <input
          type="text"
          placeholder="Search by name or NORAD ID..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full p-2 mb-4 rounded border bg-gray-800 text-white placeholder-gray-400"
        />
        <Filters filters={filters} setFilters={setFilters} />
        {loading ? (
          <p className="mt-6 text-center">Loading data...</p>
        ) : (
          <Table
            data={satellites}
            selected={selected}
            setSelected={setSelected}
            sortKey={sortKey}
            setSortKey={setSortKey}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        )}

        <div className="mt-4 flex justify-between items-center">
          <p>Selected: {selected.length} / 10</p>
          <button
            onClick={handleProceed}
            className="bg-cyan-500 text-white px-6 py-2 rounded hover:bg-cyan-600 shadow"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
