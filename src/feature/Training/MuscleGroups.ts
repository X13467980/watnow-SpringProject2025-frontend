import { MuscleGroups } from "@/types/muscleGroups";

export async function getMuscleGroups(): Promise<MuscleGroups[]> {
  try {
    const res = await fetch("http://localhost:3000/api/v1/menus/grouped_by_part");

    if (!res.ok) {
      console.error("API fetch failed:", res.status, res.statusText);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("Invalid data format:", data);
      return [];
    }

    return data; // [{ name: "胸（大胸筋）", exercises: [...] }, ...]
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}