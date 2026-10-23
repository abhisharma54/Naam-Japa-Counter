import React from "react";
import useNaamContext from "../context/naamContext";
import { chantAchievements } from "../constants/achievements";
import { icons } from "../constants/icons";

function ChantAchievements() {
  const { data } = useNaamContext();

  return (
    <div className="glass-card flex w-full min-w-0 flex-col gap-6 p-6 bg-blue-300 rounded-(--border) sm:w-125">
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold text-blue-900 sm:text-2xl">
          Chant Achievements
        </h3>
        <div className="grid grid-cols-2 gap-3 text-blue-900 sm:grid-cols-3">
          {chantAchievements.map(
            ({ name, level, requiredChantCount, iconKey }, i) => {
              const Icon = icons[iconKey];
              const isLast = i === chantAchievements.length - 1;
              const isAchieved =
                Number(data.total_japa_count) >= Number(requiredChantCount);

              return (
                <div
                  key={level}
                  className={`glass-card p-4 flex flex-col items-center justify-between gap-2 ${isAchieved ? "bg-purple-600 text-white" : "bg-blue-200 text-blue-900"} ${isLast ? "col-span-1 sm:col-span-3" : ""} rounded-md`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon size={40} />
                    <span className="text-lg font-semibold text-white leading-none">
                      {name}
                    </span>
                  </div>
                  <span>{requiredChantCount.toLocaleString("en-IN")}</span>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ChantAchievements);
