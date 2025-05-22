import { useState, useEffect } from "react";
import Button from "./components/Button";
import WorkoutForm from "./components/WorkoutForm";
import SavedWorkouts from "./components/SavedWorkouts";
import { Toaster } from "react-hot-toast";

function App() {
  const [showAlert, setShowAlert] = useState(false);

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
      <div className="container mx-auto flex flex-col lg:flex-row">
        <div className="lg:w-2/3 max-w-2xl mx-auto  ">
          <WorkoutForm />
        </div>

        <div className="lg:w-1/3 mx-auto ">
          <SavedWorkouts />
        </div>
      </div>
    </div>
  );
}

export default App;
