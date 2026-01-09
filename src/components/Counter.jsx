import React from "react";
import useNaamContext from "../context/NaamProvider";

function Counter() {
  const { data } = useNaamContext();

  return (
    <div className="w-full sm:w-[500px]">
      <div className="glassCard h-[20px] bg-zinc-300 rounded-full">
        <div
          className="glassCard w-full h-full bg-blue-600 -translate-x-[100%]"
          style={{
            transform: `translateX(${(data.naam / 108) * 100}%)`,
            transition: "transform 150ms ease",
          }}
        ></div>
      </div>
      <div className="glassCard max-w-min px-6 py-2 text-xl font-semibold text-nowrap mt-3 bg-zinc-200 rounded-full">
        <p>
          <span className="text-blue-600">{data.naam}</span>/108
        </p>
      </div>
    </div>
  );
}

export default React.memo(Counter);
