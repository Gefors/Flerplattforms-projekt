import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
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
    toast.success("Workout created successfully!");
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
    <div className="rounded-xl overflow-hidden w-full mt-10 shadow-lg">
      <div className="bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-6">
        <h2 className="text-white text-xl font-bold">Create your workout</h2>
      </div>
      <form action="" className="mx-auto bg-white  overflow-hidden w-full p-8">
        {/* Goal */}
        <div>
          <label className="block font-medium">Goal</label>
          <select
            name="goal"
            id=""
            className="w-full border rounded px-3 py-2 "
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

        {/*Duration */}
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

        <div className="justify-between gap-16 my-10 p-4  rounded-lg w-84 ">
          {/* Equipment */}
           <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Available Equipment</h3>
            <div className="grid grid-cols-2 gap-x-8">
              <div className="space-y-2">
                {equipmentGroupOptions.slice(0, Math.ceil(equipmentGroupOptions.length / 2)).map((equipment) => (
                  <div key={equipment} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`equipment-${equipment}`}
                      name="equipment"
                      value={equipment}
                      checked={form.equipment.includes(equipment)}
                      onChange={handleEquipmentChange}
                      className="h-4 w-4 text-indigo-600 border-indigo-500 rounded focus:ring-indigo-500"
                    />
                    <label className="ml-2 capitalize">{equipment}</label>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                {equipmentGroupOptions.slice(Math.ceil(equipmentGroupOptions.length / 2)).map((equipment) => (
                  <div key={equipment} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`equipment-${equipment}`}
                      name="equipment"
                      value={equipment}
                      checked={form.equipment.includes(equipment)}
                      onChange={handleEquipmentChange}
                      className="h-4 w-4 text-indigo-600 border-indigo-500 rounded focus:ring-indigo-500"
                    />
                    <label className="ml-2 capitalize">{equipment}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/*Muscle Groups  */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Focus Areas</h3>
            <div className="grid grid-cols-2 gap-x-8">
              <div className="space-y-2">
                {muscleGroupOptions.slice(0, Math.ceil(muscleGroupOptions.length / 2)).map((muscle) => (
                  <div key={muscle} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`muscle-${muscle}`}
                      name="muscleGroup"
                      value={muscle}
                      checked={form.muscleGroup.includes(muscle)}
                      onChange={handleMuscleGroupChange}
                      className="h-4 w-4 text-indigo-600 border-indigo-500 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor={`muscle-${muscle}`} className="ml-2 capitalize">{muscle}</label>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                {muscleGroupOptions.slice(Math.ceil(muscleGroupOptions.length / 2)).map((muscle) => (
                  <div key={muscle} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`muscle-${muscle}`}
                      name="muscleGroup"
                      value={muscle}
                      checked={form.muscleGroup.includes(muscle)}
                      onChange={handleMuscleGroupChange}
                      className="h-4 w-4 text-indigo-600 border-indigo-500 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor={`muscle-${muscle}`} className="ml-2 capitalize">{muscle}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            className="p-3 bg-blue-500 hover:cursor-pointer rounded-xl text-white"
            onClick={submitForm}
          >
            Submit!
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkoutForm;
