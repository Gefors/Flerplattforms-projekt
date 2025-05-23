import toast from "react-hot-toast";

import type { Workout, Exercise } from "../interfaces/IWorkout";
import type { IMuscleGroup } from "../interfaces/IMuscleGroup";

import MuscleGroupFront from "./MuscleGroupFront";
import MuscleGroupBack from "./MuscleGroupBack";
import Button from "./Button";

interface GeneratedWorkoutProps {
  workoutPlan: Workout | undefined;
  onSave: (workout: Workout) => void;
}
function GeneratedWorkout({ workoutPlan, onSave }: GeneratedWorkoutProps) {
  const displayMuscle = (exercise: Exercise) => {
    const muscleGroup: IMuscleGroup[] = exercise.muscles.map((muscle) => {
      return {
        name: muscle.muscle,
        activation: muscle.activation,
      };
    });
    return muscleGroup;
  };

  const saveWorkout = () => {
    if (workoutPlan) {
      onSave(workoutPlan);
      toast.success("Workout saved!");
    }
  };

  return (
    <div className="rounded-xl overflow-hidden w-full mt-10 shadow-lg mb-10">
      <div className="bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-6">
        <h2 className="text-white text-xl font-bold">Generated Workout</h2>
      </div>

      {workoutPlan && (
        <div className="mx-auto bg-white  overflow-hidden w-full p-8">
          <h3 className="font-bold text-lg">{workoutPlan.title}</h3>
          <p>Difficulty: {workoutPlan.difficulty}</p>
          <p>Duration: {workoutPlan.duration_minutes}</p>

          <h4>Exercises</h4>

          <div className="grid gap-4 pb-4 mt-4 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
            {workoutPlan.exercises.map((exercise, index) => (
              <div
                key={index}
                className="flex flex-row h-auto w-full p-4 rounded-lg shadow-lg items-start border border-zinc-100"
              >
                <div className="flex flex-col w-1/2 gap-4 p-2">
                  <h5 className="font-semibold">
                    {index + 1} - {exercise.name}
                  </h5>
                  <div className="text-sm">
                    <p>{exercise.instructions}</p>
                  </div>
                  <ul className="gap-4">
                    <li>Reps: {exercise.reps}</li>
                    <li>Sets: {exercise.sets}</li>
                    <li>Rest: {exercise.rest_seconds} sec</li>
                  </ul>
                </div>

                <div className="flex flex-row p-2 h-full gap-2 w-1/2 rounded-lg mt-2 items-start justify-center bg-zinc-50 overflow-hidden">
                  <MuscleGroupFront
                    muscleActivations={displayMuscle(exercise)}
                  />
                  <MuscleGroupBack
                    muscleActivations={displayMuscle(exercise)}
                  />
                </div>
              </div>
            ))}
          </div>

          <Button
            className=" bg-gradient-to-r from-violet-500 to-blue-500 p-3 hover:cursor-pointer rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={saveWorkout}
          >
            Save Workout
          </Button>
        </div>
      )}
    </div>
  );
}
export default GeneratedWorkout;
