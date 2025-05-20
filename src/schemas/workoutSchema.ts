import { Muscles } from "../enums/MuscleEnum";
const workoutSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    duration_minutes: { type: "integer" },
    difficulty: {
      type: "string",
      enum: ["beginner", "intermediate", "advanced"],
    },
    exercises: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          sets: { type: "integer" },
          reps: { type: "integer" },
          rest_seconds: { type: "integer" },
          notes: { type: "string" },
          muscles: {
            type: "array",
            items: {
              type: "object",
              properties: {
                muscle: { type: "string", enum: Object.values(Muscles) },
                activation: {
                  type: "string",
                  enum: ["primary", "secondary", "tertiary"],
                },
              },
              required: ["muscle", "activation"],
              additionalProperties: false,
            },
          },
        },
        required: ["name", "sets", "reps", "rest_seconds", "notes", "muscles"],
        additionalProperties: false,
      },
    },
  },
  required: ["title", "duration_minutes", "difficulty", "exercises"],
  additionalProperties: false,
};
export default workoutSchema;
