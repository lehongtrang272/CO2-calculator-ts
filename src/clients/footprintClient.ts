import axios from "axios";
import { Footprint } from "../models/footprint";
import { ExternalDataError } from "../errors/ExternalDataError";

let cachedFootprintData: Footprint[] | null = null;

export async function fetchFootprintData(): Promise<Footprint[]> {
  try {
    if (cachedFootprintData) return cachedFootprintData;
    const response = await axios.get<Footprint[]>(
      "https://frankvisuals.github.io/co2-data/footprints.json"
    );
    cachedFootprintData = response.data;
    return cachedFootprintData;
  } catch (error) {
    console.error("Error fetching footprint data:", error);
    throw new ExternalDataError("Failed to fetch footprint data");
  }
}
