import workoutSchema from "../schemas/workoutSchema";
import exerciseSchema from "../schemas/exerciseSchema";
import type { Exercise, Workout } from "../interfaces/IWorkout";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Notera att nyckel krävs för att kunna använda OpenAI API:et
  dangerouslyAllowBrowser: true,
});

/**
 * A function to get a workout plan based on the user's goal.
 * @param userGoal The input from the user, which is a string describing the user's goal for the workout plan.
 * @returns A JSON object representing the workout plan, which includes the title, difficulty, duration, and exercises.
 */
export async function getWorkoutPlan(userGoal: string) {
  const response = await client.responses.create({
    model: "gpt-4o-mini", // Modellen som det skickas till, denna får vi experimentera med.
    input: [
      {
        role: "system", // Denna som representerar systemet. Här definierar vi systemets roll och ger instruktioner.
        content:
          "You are a personal trainer. You will help the user create a workout plan, make sure to include a sufficient amount of exercises to match the requested workout duration. You will only respond with the workout plan in valid JSON format as defined by the provided schema. Do not include any extra explanation or text.",
      },
      {
        role: "user", // Denna som representerar användaren
        content: userGoal,
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "workout_schema",
        strict: true,
        schema: workoutSchema,
      },
    },
  });
  return JSON.parse(response.output_text) as Workout;
}

export async function getMoreExercises(currentExercises: string[]) {
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: [
      {
        role: "system",
        content:
          "You are a personal trainer. You will help the user create a workout plan, make sure to include a sufficient amount of exercises to match the requested workout duration. You will only respond with the workout plan in valid JSON format as defined by the provided schema. Do not include any extra explanation or text.",
      },
      {
        role: "user",
        content: `The user has already selected these exercises: ${currentExercises.join(
          ", "
        )}. Now the user wants more exercises within the same theme.`,
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "exercise_schema",
        strict: true,
        schema: exerciseSchema,
      },
    },
  });
  return JSON.parse(response.output_text).exercises as Exercise[];
}
