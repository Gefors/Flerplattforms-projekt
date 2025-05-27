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
    <div className="w-full rounded-xl overflow-hidden  mt-10 shadow-lg">
      <div className="flex justify-between bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-6">
        <h2 className="text-white text-xl font-bold">Saved workout</h2>
        <span className="bg-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center">
          {savedWorkout.length}
        </span>
      </div>
      <div className="flex item-center justify-between mb-4 px-8">
        <div className="w-full ">
          {savedWorkout.length === 0 ? (
            <div
              id="Infobox"
              className="bg-white p-4 rounded-lg shadow-md my-4"
            >
              <h2 className="font-semibold text-lg mb-2">How it works:</h2>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Fill out your fitness preferences and available equipment
                </li>
                <li>Get a personalized workout plan generated just for you</li>
                <li>
                  Save the entire workout or select specific exercises to save
                </li>
                <li>
                  Access your saved workouts anytime
                  <br />
                  <span className="text-gray-500 text-sm">
                    (Your saved workouts are stored locally in your browser
                    using <b>localStorage</b>.)
                  </span>
                </li>
              </ol>
            </div>
          ) : (
            <ul>
              {savedWorkout.map((workout, index) => (
                <li key={index} className=" py-2 cursor-pointer group">
                  <div
                    className="flex items-center justify-between p-2 mx-auto"
                    onClick={() => handleToggleExpand(index)}
                  >
                    <span>
                      <strong>{workout.title}</strong> - {workout.difficulty} -{" "}
                      {workout.duration_minutes} min
                    </span>

                    <span className="text-gray-500 ml-auto">
                      {workout.exercises.length} exercises
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
                  <hr className=" border-t border-gray-300" />
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
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedWorkouts;
