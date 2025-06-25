import { MuscleGroups } from "@/types/muscleGroups";

// fetchとかもここでやると予想してここにダミー置いとくね
export function getMuscleGroups(): MuscleGroups[] {
  return [
    {
      name: "Chest",
      exercises: [
        "Bench Press",
        "Pec Fly",
        "Chest Press",
        "Dumbbell Fly",
        "Incline Bench Press",
      ],
    },
    {
      name: "Back",
      exercises: [
        "Deadlift",
        "Lat Pulldown",
        "Pulley Row",
        "Bent-over Row",
        "Chin-up",
      ],
    },
    {
      name: "Legs",
      exercises: [
        "Squat",
        "Leg Press",
        "Lunge",
        "Leg Curl",
        "Leg Extension",
      ],
    },
    {
      name: "Shoulders",
      exercises: [
        "Shoulder Press",
        "Side Raise",
        "Rear Raise",
        "Front Raise",
        "Arnold Press",
      ],
    },
    {
      name: "Arms",
      exercises: [
        "Barbell Curl",
        "Dumbbell Curl",
        "Triceps Pressdown",
        "French Press",
        "Concentration Curl",
      ],
    },
    {
      name: "Abs",
      exercises: [
        "Crunch",
        "Leg Raise",
        "Plank",
        "Russian Twist",
        "Sit-up",
      ],
    },
  ];
}