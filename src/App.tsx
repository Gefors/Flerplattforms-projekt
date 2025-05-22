import { useState, useEffect } from "react";
import WorkoutForm from "./components/WorkoutForm";
import SavedWorkouts from "./components/SavedWorkouts";
import { Toaster } from "react-hot-toast";
import type { FormData } from "./enums/FormDataType";

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const [form, setForm] = useState<FormData>({
    goal: "strength",
    experience: "beginner",
    duration: "short",
    equipment: [],
    muscleGroup: [],
  });
  
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div className="bg-gray-50">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="w-full py-7 bg-gradient-to-r from-violet-500 to-blue-500">
        <h1 className="text-center text-3xl text-white font-bold">
          Gymtracker 2.0
        </h1>
      </div>

      {/* content */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="w-full max-w-2xl lg:max-w-full mx-auto  ">
          <WorkoutForm form={form} setForm={setForm} />
        </div>

        <div className="w-full max-w-2xl lg:max-w-full mx-auto ">
          <SavedWorkouts />
        </div>

        <div className="container w-full lg:col-span-2 max-w-2xl lg:max-w-full mx-auto ">
          <SavedWorkouts />
        </div>
      </div>
    </div>
  );
}

export default App;
