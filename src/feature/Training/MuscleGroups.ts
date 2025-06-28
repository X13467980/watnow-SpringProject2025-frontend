import { MuscleGroups } from '@/types/muscleGroups';

export async function getMuscleGroups(): Promise<MuscleGroups[]> {
  try {
    const res = await fetch(
      'https://watnow-springproject2025-backend.onrender.com/api/v1/menus/grouped_by_part',
    );

    if (!res.ok) {
      console.error('API fetch failed:', res.status, res.statusText);
      return [];
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error('Invalid data format:', data);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}
