import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

import WorkoutForm from "./components/WorkoutForm";
import SavedWorkouts from "./components/SavedWorkouts";
import GeneratedWorkout from "./components/GeneratedWorkout";

import type { Workout } from "./interfaces/IWorkout";
import { getWorkoutPlan } from "./services/openAi";

import type { FormData } from "./enums/FormDataType";
import Logo from "./assets/GymLogo.png";

function App() {
  const [form, setForm] = useState<FormData>({
    goal: "strength",
    experience: "beginner",
    duration: "short",
    equipment: [],
    muscleGroup: [],
  });
  const [workoutPlan, setWorkoutPlan] = useState<Workout>();
  const [loading, setLoading] = useState(false);

  const [savedWorkout, setSavedWorkout] = useState<Workout[]>([]);

  useEffect(() => {
    const storedWorkouts = localStorage.getItem("savedWorkout");
    if (storedWorkouts) {
      setSavedWorkout(JSON.parse(storedWorkouts));
      console.log(
        "Loaded saved workouts from localStorage:",
        JSON.parse(storedWorkouts)
      );
    }
  }, []);

  useEffect(() => {
    if (savedWorkout.length > 0) {
      localStorage.setItem("savedWorkout", JSON.stringify(savedWorkout));
      console.log("Saved workouts updated:", savedWorkout);
    }
    else if (savedWorkout.length === 0) {
      localStorage.removeItem("savedWorkout");
      console.log("All workouts deleted, localStorage cleared.");
    }
  }, [savedWorkout]);

  const handleDeleteWorkout = (index: number) => {
    setSavedWorkout((prev) => prev.filter((_, i) => i !== index));
    toast.success("Workout deleted!");
  };

  const handleSavedWorout = (workout: Workout) => {
    setSavedWorkout((prev) => [...prev, workout]);
    setTimeout(() => {
      const savedWorkoutElement = document.getElementById("saved-workout");
      if (savedWorkoutElement) {
        savedWorkoutElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const submitWorkout = () => {
    setWorkoutPlan(undefined);
    fetchWorkoutPlan();
  };

  const fetchWorkoutPlan = async () => {
    setLoading(true);
    const loadingToastId = toast.loading("Creating workout...");
    try {
      const workout = await getWorkoutPlan(JSON.stringify(form));
      toast.success("Workout created successfully!", {
        id: loadingToastId,
      });
      setWorkoutPlan(workout);
      setLoading(false);
      setTimeout(() => {
        const generatedWorkoutElement =
          document.getElementById("generated-workout");
        if (generatedWorkoutElement) {
          generatedWorkoutElement.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      setForm({
        goal: "strength",
        experience: "beginner",
        duration: "short",
        equipment: [],
        muscleGroup: [],
      });
    } catch (error) {
      toast.error("Failed to create workout.", {
        id: loadingToastId,
      });
      console.error("Error creating workout:", error);
    }
  };

  return (
    <div className="bg-gray-50">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="flex items-center w-full py-4 bg-gradient-to-r from-violet-500 to-blue-500">
        <div className="flex flex-row items-center mx-10  gap-6">
          <img
            src={Logo}
            alt="A logotype for the website"
            className="h-20 rounded-full"
          />
          <h1 className="text-center text-3xl tracking-wider font-bold text-white">
            Gymtime
          </h1>
        </div>
      </div>

      {/* content */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="w-full max-w-2xl lg:max-w-full mx-auto  ">
          <WorkoutForm
            loading={loading}
            form={form}
            setForm={setForm}
            submitWorkout={submitWorkout}
          />
        </div>

        <div id="saved-workout" className="w-full max-w-2xl lg:max-w-full mx-auto ">
          <SavedWorkouts
            savedWorkout={savedWorkout}
            onDelete={handleDeleteWorkout}
          />
        </div>

        <div
          id="generated-workout"
          className="container w-full lg:col-span-2 max-w-2xl lg:max-w-full mx-auto "
        >
          {workoutPlan && (
            <GeneratedWorkout
              workoutPlan={workoutPlan}
              onSave={handleSavedWorout}
              setWorkoutPlan={setWorkoutPlan}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
