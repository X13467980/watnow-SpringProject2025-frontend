'use client';
import { useState, useEffect } from 'react';
import { getMuscleGroups } from './MuscleGroups';
import { MuscleGroups } from '@/types/muscleGroups';

export function useMuscleGroups(): MuscleGroups[] {
  const [groups, setGroups] = useState<MuscleGroups[]>([]);

  useEffect(() => {
    async function fetchGroups() {
      const data = await getMuscleGroups();
      setGroups(data);
    }

    fetchGroups();
  }, []);

  return groups;
}
