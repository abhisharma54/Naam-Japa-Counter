import React from "react";
import { STAT_TYPES } from "../constants/stats";

function ActivityTabs({ activeType, onActiveType }) {
  return (
    <div className="flex w-full min-w-0 items-center gap-3 sm:gap-4">
      {STAT_TYPES.map(({ id, label }) => {
        const isActive = activeType === id;

        return (
          <button
            key={id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onActiveType(id)}
            className={`glass-card min-w-0 flex-1 rounded-full px-3 py-2 text-sm font-semibold capitalize transition duration-150 cursor-pointer hover:scale-[1.02] active:scale-100 sm:px-6 sm:text-lg ${
              isActive
                ? "bg-purple-600 text-white"
                : "bg-blue-200 text-blue-900 hover:bg-blue-100"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default React.memo(ActivityTabs);
