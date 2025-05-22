import { useState, useEffect } from "react";
import Button from "./components/Button";
import Alert from "./components/Alert";
import WorkoutForm from "./components/WorkoutForm";

function App() {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    // <>
    <div className="bg-gray-50">
    
    
    <div className="container mx-auto ">
      <div className=" flex flex-col">
        <WorkoutForm />
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-20"
          onClick={() => console.log("Clicked")}
        >
          Search
        </Button>
        <hr />
        <p>Display workout</p>
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-35 "
          onClick={() => setShowAlert(true)}
        >
          Save workout
        </Button>
      </div>
    </div>
    </div>
  );
}

export default App;
