"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import StarsBackground from "../../components/StarsBackground";
import { Satellite } from "../../components/Table";

export default function SelectedPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Satellite[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("selected");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSelected(parsed);
        }
      } catch (e) {
        console.error("Failed to parse selected satellites:", e);
      }
    }
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white ">
      <StarsBackground />

      <Header title="Selected Satellites" />

      <button
        onClick={() => router.push("/")}
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        ← Back to Home
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">
        Selected Satellites
      </h2>

      {selected.length === 0 ? (
        <p className="text-center text-gray-500">No satellites selected.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selected.map((item) => (
            <div
              key={item.noradCatId}
              className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p>
                <span className="font-semibold">NORAD ID:</span>{" "}
                {item.noradCatId}
              </p>
              <p>
                <span className="font-semibold">Object Type:</span>{" "}
                {item.objectType}
              </p>
              <p>
                <span className="font-semibold">Orbit Code:</span>{" "}
                {item.orbitCode}
              </p>
              <p>
                <span className="font-semibold">Country Code:</span>{" "}
                {item.countryCode}
              </p>
              <p>
                <span className="font-semibold">Launch Date:</span>{" "}
                {item.launchDate}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
