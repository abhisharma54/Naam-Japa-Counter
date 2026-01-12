import React from "react";
import useNaamContext from "../context/NaamProvider";

const RADIUS = 125;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function Counter() {
  const { data } = useNaamContext();

  return (
    <div className="w-full flex justify-center sm:w-[500px]">
      <div className="progress-wrapper relative ">
        <div className="outer-progress-wrapper">
          <div className="inner-progress-wrapper flex justify-center items-center">
            <div className="glassCard max-w-min px-6 py-2 text-xl font-semibold text-nowrap mt-3 bg-zinc-200 rounded-full">
              <p>
                <span className="text-blue-600">{data.naam}</span>/108
              </p>
            </div>
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="280px"
          height="280px"
        >
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stop-color="#8819ffb3" />
              <stop offset="100%" stop-color="#195aff " />
            </linearGradient>
          </defs>
          <circle
            style={{
              transition: "stroke-dashoffset 0.6s ease",
            }}
            cx="140"
            cy="140"
            r={RADIUS}
            fill="none"
            stroke="url(#GradientColor)"
            stroke-linecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeWidth="30px"
            strokeDashoffset={CIRCUMFERENCE - (CIRCUMFERENCE * data.naam) / 108}
          />
        </svg>
      </div>
    </div>
  );
}

export default React.memo(Counter);
