import React, { useState } from "react";
import type { Workout, Exercise } from "../interfaces/IWorkout";
import MuscleGroupFront from "./MuscleGroupFront";
import MuscleGroupBack from "./MuscleGroupBack";

interface SavedWorkoutProps {
  savedWorkout: Workout[];
  onDelete: (index: number) => void;
}

const SavedWorkouts: React.FC<SavedWorkoutProps> = ({
  savedWorkout,
  onDelete,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const displayMuscle = (exercise: Exercise) => {
    return exercise.muscles.map((muscle) => ({
      name: muscle.muscle,
      activation: muscle.activation,
    }));
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden w-full mt-10 shadow-lg">
      <div className="bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-6">
        <h2 className="text-white text-xl font-bold">Saved workout</h2>
      </div>
      <div className="flex item-center justify-between mb-4">
        <div>
          <ul>
            {savedWorkout.map((workout, index) => (
              <li key={index} className="border-b py-2 cursor-pointer group">
                <div
                  className="flex items-center justify-between p-2"
                  onClick={() => handleToggleExpand(index)}
                >
                  <span>
                    <strong>{workout.title}</strong> - {workout.difficulty} -{" "}
                    {workout.duration_minutes} min
                  </span>
                  <button
                    className="ml-4 px-2 py-1 bg-gradient-to-r from-violet-500 to-pink-500 p-3 hover:cursor-pointer rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
                {expandedIndex === index && (
                  <div className="mt-2 ml-4">
                    <h4 className="font-semibold">Exercises:</h4>
                    <ul className="list-disc ml-4">
                      {workout.exercises.map((exercise, i) => (
                        <li key={i}>
                          <strong>{exercise.name}</strong>:{" "}
                          {exercise.instructions} <br />
                          Reps: {exercise.reps}, Sets: {exercise.sets}, Rest:{" "}
                          {exercise.rest_seconds}s
                          <div className="flex flex-row p-2 h-full gap-2 w-1/2 rounded-lg mt-2 items-start justify-center bg-zinc-50 overflow-hidden">
                            <MuscleGroupFront
                              muscleActivations={displayMuscle(exercise)}
                            />
                            <MuscleGroupBack
                              muscleActivations={displayMuscle(exercise)}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SavedWorkouts;
