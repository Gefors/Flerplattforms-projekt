import { useState, useEffect } from "react";
import Button from "./components/Button";
import Alert from "./components/Alert";

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
    <div>
      {showAlert && (
        <Alert
          text="Your workout have been saved"
          className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
        ></Alert>
      )}
      <h1 className="text-cyan-950">Welcome to GymTime</h1>
      <p>Form for adding workout</p>
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
    //  </>
  );
}

export default App;
