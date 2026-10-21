import React from "react";
import { icons } from "../constants/icons";

const Icon = icons['chart'];

function Stats() {
  return (
    <div className="glassCard flex flex-col gap-5 p-6 bg-blue-300 rounded-(--boxRadius) sm:w-125">
      <h1 className="text-xl font-semibold text-center text-blue-900">
        Coming soon!
      </h1>
      <div className="flex gap-4">
        <Icon size={60} className="text-blue-900" />
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-lg font-semibold text-blue-900">Stats page</h1>
          <h3 className="text-base -mt-2 text-blue-900">
            Your Journey in Numbers
          </h3>
          <p className="text-sm text-white text-left">
            I'm working on daily and weekly chanting insights to help you
            reflect on your Naam Japa journey, one day at a time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
