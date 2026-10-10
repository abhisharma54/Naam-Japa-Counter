import React, { useState } from "react";
import useNaamContext from "../context/naamContext";
import { FaRegEdit } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

const MAX_CHANT_LENGTH = 30;

const chantQuickPicks = [
  "Ram Ram",
  "Radha Radha",
  "Samb Sadashiv",
  "Shri Radha",
  "Hare Krishna",
];

function ChantUpdateCard() {
  const { data, setData } = useNaamContext();

  const [chant, setChant] = useState("");
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChantInput = (e) => {
    const value = e.target.value;

    if (value.length > MAX_CHANT_LENGTH) {
      setError("Chant limit is 30 characters!");
      return;
    }

    setChant(value);
    setError("");
  };

  const handleRenameChant = () => {
    if (!chant.trim()) {
      setError("Chant is required!");
      return;
    }

    setData((prev) => ({ ...prev, chantName: chant }));
    setSuccess("Chant renamed");
    setChant("");
    setOpen(false);

    setTimeout(() => setSuccess(""), 2000);
  };

  return !open ? (
    <div className="glassCard w-full flex flex-col gap-5 p-6 bg-blue-300 rounded-(--boxRadius) sm:w-125">
      <div className="flex flex-col items-start">
        <div className="w-full flex items-center justify-between gap-2 sm:gap-4">
          <h1 className="min-w-0 text-left text-base sm:text-xl font-semibold text-blue-900">
            Customize your chant
          </h1>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="glassCard flex shrink-0 items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 text-white bg-blue-500 cursor-pointer transition-transform hover:scale-105 active:scale-100"
          >
            <span>Edit</span>
            <FaRegEdit className="shrink-0" />
          </button>
        </div>
        <p className="text-blue-500 text-xs text-left sm:text-sm">
          Choose the name you chant. It appears on your counter button.
        </p>
      </div>
      {success && (
        <p className="glassCard px-5 py-2 text-sm tracking-wider bg-blue-500 text-white rounded-lg">
          {success || "Chant renamed"}
        </p>
      )}
    </div>
  ) : (
    <div className="glassCard flex flex-col gap-5 p-6 bg-blue-300 rounded-(--boxRadius) sm:w-125">
      <div className="flex flex-col items-start">
        <div className="w-full flex gap-4 items-center justify-between">
          <h1 className="text-blue-900 text-lg text-left font-semibold sm:text-xl">
            Customize your chant
          </h1>
          <button onClick={() => setOpen(false)}>
            <IoIosCloseCircle className="glassCard text-3xl text-blue-500 cursor-pointer hover:scale-110 active:scale-100" />
          </button>
        </div>
        <p className="text-blue-500 text-xs text-left sm:text-sm">
          Choose the name you chant. It appears on your counter button.
        </p>
      </div>
      <div className="flex flex-col gap-1 items-start">
        <p className="text-blue-900 font-semibold">Current Chant</p>
        <p className="glassCard px-5 py-2 text-sm tracking-wider bg-blue-500 text-white rounded-lg">
          {data.chantName || "Radha Radha"}
        </p>
      </div>
      <div className="flex flex-col gap-1 items-start">
        <p className="text-blue-900 font-semibold">Quick picks</p>
        <div className="flex flex-wrap gap-2">
          {chantQuickPicks.map((chant, i) => (
            <button
              key={i}
              onClick={() => setChant(chant)}
              className="glassCard px-5 py-1 bg-blue-300 rounded-(--boxRadius) text-blue-900 font-medium text-sm cursor-pointer hover:scale-105 active:scale-100"
            >
              {chant}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1 items-start">
        <p className="text-blue-900 font-semibold">Chant Name</p>
        <div className="w-full flex flex-col gap-1 z-10">
          <input
            type="text"
            placeholder="Enter your chant name (e.g.Radha Radha, Ram Ram)"
            className="w-full px-3 py-2 bg-blue-200 rounded-full"
            value={chant}
            onChange={handleChantInput}
          />
          <div className="flex justify-between">
            <p className="text-sm text-blue-800">{error}</p>
            <p className="text-blue-900">
              {chant.length}/{MAX_CHANT_LENGTH}
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={handleRenameChant}
        className="glassCard px-5 py-2 bg-purple-600 font-semibold text-white rounded-full transition duration-75 ease-out hover:scale-105 active:translate-y-0.5 cursor-pointer"
      >
        Rename chant
      </button>
    </div>
  );
}

export default React.memo(ChantUpdateCard);
