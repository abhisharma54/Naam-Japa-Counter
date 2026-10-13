import React, { useState } from "react";
import useNaamContext from "../context/naamContext";
import { DEFAULT_DATA, MAX_CHANT_LENGTH, chantQuickPicks } from "../constant";

function RenameChant() {
  const { data, setData } = useNaamContext();

  const [chant, setChant] = useState("");
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

    setData((prev) => ({ ...prev, chant_name: chant }));
    setSuccess("Chant renamed");
    setChant("");
    setError("");

    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <div className="glassCard flex flex-col gap-5 p-6 bg-blue-300 rounded-(--boxRadius) sm:w-125">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-left text-base sm:text-xl font-semibold text-blue-900">
            Customize your chant
          </h1>
          <p className="mt-1 text-white text-xs text-left sm:text-sm">
            Choose the name you chant. It appears on your counter button.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 items-start">
        <p className="text-blue-900 font-semibold">Current Chant</p>
        <p className="glassCard px-5 py-2 text-sm tracking-wider bg-blue-500 text-white rounded-lg">
          {data.chant_name || DEFAULT_DATA.chant_name}
        </p>
      </div>

      {/* Quick picks chant suggestions */}
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

      {/* counter button preview */}
      {chant && <div className="glassCard flex flex-col gap-2 p-3 bg-blue-300 rounded-(--boxRadius)">
        <p className="text-sm text-blue-900 text-center">
          Counter button preview
        </p>
        <div className="flex justify-center">
          <button
            aria-hidden="true"
            className="glassCard max-w-max px-4 py-2 bg-purple-600 text-lg font-semibold text-white rounded-full"
            disabled
          >
            {chant}
          </button>
        </div>
      </div>}

      <button
        onClick={handleRenameChant}
        className="glassCard px-5 py-2 bg-purple-600 font-semibold text-white rounded-full transition duration-75 ease-out hover:scale-105 active:translate-y-0.5 cursor-pointer"
      >
        Rename chant
      </button>
      {success && (
        <p className="glassCard px-5 py-2 text-sm tracking-wider bg-blue-500 text-white rounded-lg">
          {success}
        </p>
      )}
    </div>
  );
}

export default React.memo(RenameChant);
