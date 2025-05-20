import { Muscles } from "../enums/MuscleEnum";

export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Activation = "primary" | "secondary" | "tertiary";

export interface MuscleActivation {
  muscle: Muscles;
  activation: Activation;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  rest_seconds: number;
  notes: string;
  muscles: MuscleActivation[];
}

export interface Workout {
  title: string;
  duration_minutes: number;
  difficulty: Difficulty;
  exercises: Exercise[];
}
