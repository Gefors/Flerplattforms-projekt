import React, { useState, useEffect } from "react";
import type {
  FormData,
  Goal,
  Experience,
  Duration,
  Equipment,
  MuscleGroup,
} from "../enums/FormDataType";

const WorkoutForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    goal: "strength",
    experience: "beginner",
    duration: "short",
    equipment: [],
    muscleGroup: [],
  });

  const handeSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEquipmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setForm((prevData) => {
      const currentList = prevData.equipment;
      const updatedList = checked
        ? [...currentList, value as Equipment]
        : currentList.filter((equip) => equip !== value);

      return {
        ...prevData,
        equipment: updatedList,
      };
    });
  };
  const handleMuscleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setForm((prevData) => {
      const currentList = prevData.muscleGroup;
      const updatedList = checked
        ? [...currentList, value as MuscleGroup]
        : currentList.filter((muscleGroup) => muscleGroup !== value);

      return {
        ...prevData,
        muscleGroup: updatedList,
      };
    });
  };

  const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(form);
  };

  const equipmentGroupOptions: Equipment[] = [
    "dumbbell",
    "barbell",
    "kettlebell",
    "bodyweight",
    "machine",
    "band",
    "cable-machine",
  ];
  const muscleGroupOptions: MuscleGroup[] = [
    "chest",
    "back",
    "legs",
    "arms",
    "shoulders",
    "core",
  ];

  return (
    <form action=""
      className="mx-auto bg-white rounded-xl overflow-hidden w-full ">
        {/* Goal */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-400 px-8 py-6">
            <h2 className="text-white text-xl font-bold">Create your workout</h2>
        </div>
      <div>
        <label className="block font-medium">Goal</label>
        <select
          name="goal"
          id=""
          className="w-full border rounded px-3 py-2"
          onChange={handeSelectChange}
          value={form.goal}
        >
          <option value="strength">Strength</option>
          <option value="weight-loss">Weight Loss</option>
          <option value="muscle-growth">Muscle Growth</option>
        </select>
      </div>

      {/*Experience  */}
      <div>
        <label className="">Experience</label>
        <select
          name="experience"
          id=""
          className="w-full border rounded px-3 py-2"
          onChange={handeSelectChange}
          value={form.experience}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/*Duratioon */}  
      <div>
        <label className="">Duration</label>
        <select
          name="duration"
          id=""
          className="w-full border rounded px-3 py-2"
          onChange={handeSelectChange}
          value={form.duration}
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
      </div>

    <div className=" flex flex-col md:flex-row justify-between gap-16 my-10 p-4 border rounded-lg w-84">
        {/* Equipment */}
      <div className="flex flex-col gap-4">
        <label>Equipment</label>
        <div>
          {equipmentGroupOptions.map((equipment) => (
            <div key={equipment} className="flex flex-row items-center gap-2 w-full">
              <input
                type="checkbox"
                checked={form.equipment.includes(equipment)}
                name="equipment"
                id=""
                value={equipment}
                onChange={handleEquipmentChange}
              />
              <label>{equipment}</label>
            </div>
          ))}
        </div>
      </div>

      {/*Muscle Groups  */}
      <div className="flex flex-col gap-4">
        <label className="text-nowrap">Muscle Groups</label>
        <div className="h-full">
          {muscleGroupOptions.map((muscle) => (
            <div key={muscle} className="flex flex-row items-center gap-2 w-full">
              <input
                type="checkbox"
                checked={form.muscleGroup.includes(muscle)}
                name="muscleGroup"
                id=""
                value={muscle}
                onChange={handleMuscleGroupChange}
              />
              <label>{muscle}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
      
      <div>
          <button
            className="p-3 bg-blue-500 hover:cursor-pointer text-white"
            onClick={submitForm}
          >
            Submit!
          </button>
        </div>
    </form>
  );
};

export default WorkoutForm;
