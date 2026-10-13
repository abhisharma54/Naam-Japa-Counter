import React from "react";
import { FaFire } from "react-icons/fa";

function StreakOverview() {
  return (
    <div className="glassCard flex flex-col gap-5 p-6 bg-blue-300 rounded-(--boxRadius) sm:w-125">
      <h1 className="text-xl font-semibold text-center text-blue-900">
        Coming soon!
      </h1>
      <div className="flex gap-4">
        <FaFire size={60} className="text-blue-900" />
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-lg font-semibold text-blue-900">Streak page</h1>
          <h3 className="text-base -mt-2 text-blue-900">
            Build Your Daily Rhythm
          </h3>
          <p className="text-sm text-white text-left">
            I'm preparing a way to track your consecutive days of chanting and
            Mala practice. Keep your devotion going!
          </p>
        </div>
      </div>
    </div>
  );
}

export default StreakOverview;
