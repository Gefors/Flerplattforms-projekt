import { useState } from "react";
import Button from "./components/Button";

function App() {
  return (
    // <>
    <div>
      <p className="text-green-500">Hello World!</p>
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-20"
        onClick={() => console.log("Clicked")}
      >
        Search
      </Button>
      <hr />
      <Button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-35"
        onClick={() => console.log("Clicked")}
      >
        Save workout
      </Button>
    </div>
    //  </>
  );
}

export default App;
