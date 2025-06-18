export interface FetchSatelliteParams {
  objectTypes?: string[];
  orbitCodes?: string[];
  attributes?: string[];
}

export interface Satellite {
  noradCatId: string;
  intlDes: string;
  name: string;
  launchDate: string;
  decayDate: string;
  objectType: string;
  launchSiteCode: string;
  countryCode: string;
  orbitCode: string;
  [key: string]: any;
}

export const fetchSatellites = async ({
  objectTypes = [],
  orbitCodes = [],
  attributes = [
    "noradCatId",
    "intlDes",
    "name",
    "launchDate",
    "decayDate",
    "objectType",
    "launchSiteCode",
    "countryCode",
    "orbitCode",
  ],
}: FetchSatelliteParams): Promise<Satellite[]> => {
  const params = new URLSearchParams();
  if (objectTypes.length) params.append("objectTypes", objectTypes.join(","));
  if (attributes.length) params.append("attributes", attributes.join(","));
  if (orbitCodes.length) params.append("orbitCodes", orbitCodes.join(","));

  const url = `https://backend.digantara.dev/v1/satellites?${params.toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return (data?.data || []) as Satellite[];
  } catch (err: any) {
    console.error("Satellite fetch error:", err.message);
    return [];
  }
};
