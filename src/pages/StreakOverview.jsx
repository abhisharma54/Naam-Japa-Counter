import React, { useState } from "react";
import useNaamContext from "../context/naamContext";
import { streakMilestones, weekDayLabels } from "../constants/data";
import { chantAchievements } from "../constants/achievements";
import { FaFire, FaRegCircleCheck, CiLock, icons } from "../constants/icons";
import ActivityTabs from "../components/ActivityTabs";

function StreakOverview() {
  const { data } = useNaamContext();

  const [activeType, setActiveType] = useState("japa");

  const isJapa = activeType === "japa";

  const currentStreak = Number(
    isJapa ? data.japa_current_streak : data.mala_current_streak,
  );

  const bestStreak = Number(
    isJapa ? data.japa_best_streak : data.mala_best_streak,
  );

  const dailyTarget = Number(
    isJapa ? data.japa_daily_target : data.mala_daily_target,
  );

  const nextMilestone = Number(
    isJapa ? data.japa_milestone : data.mala_milestone,
  );

  const progress =
    nextMilestone > 0
      ? Math.min(100, Math.max(0, (currentStreak / nextMilestone) * 100))
      : 0;

  return (
    <>
      <div className="glassCard flex w-full min-w-0 sm:w-125 flex-col gap-5 rounded-(--boxRadius) bg-blue-300 p-4 text-blue-900 sm:gap-6 sm:p-6">
        <h1 className="text-xl font-semibold sm:text-2xl">Your streak</h1>

        <ActivityTabs activeType={activeType} onActiveType={setActiveType} />

        {/* Current and best streak */}
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-4xl font-semibold sm:text-5xl">
                {currentStreak}
              </span>

              <span className="text-base sm:text-lg">day streak</span>
            </div>

            <p className="mt-1 text-xs text-left leading-relaxed sm:text-sm">
              A day counts after{" "}
              <span className="text-sm font-semibold sm:text-base">
                {dailyTarget.toLocaleString("en-IN")}
              </span>{" "}
              {isJapa ? "japa" : "mala"}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1 text-sm sm:text-base">
            <FaFire className="shrink-0" size={20} />

            <span className="font-semibold">Best:</span>

            <span className="whitespace-nowrap">
              {bestStreak} {bestStreak === 1 ? "day" : "days"}
            </span>
          </div>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {weekDayLabels.map((day, index) => {
            const isToday = new Date().getDay() === index;

            return (
              <div
                key={`${day}-${index}`}
                className={`glassCard flex h-8 w-8 items-center justify-center rounded-full ${isToday ? "bg-purple-600 text-white" : "bg-blue-200"} text-xs font-semibold sm:h-12 sm:w-12 sm:text-sm`}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Next milestone progress */}
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm sm:text-base">
              Next milestone: {nextMilestone}{" "}
              {nextMilestone === 1 ? "day" : "days"}
            </p>

            <p className="shrink-0 text-sm font-semibold sm:text-base">
              {currentStreak}/{nextMilestone}
            </p>
          </div>

          {/* Progress bar */}
          <div
            className="glassCard h-3 w-full overflow-hidden rounded-full bg-blue-200"
            role="progressbar"
            aria-label={`${isJapa ? "Japa" : "Mala"} milestone progress`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="glassCard h-full rounded-full bg-purple-600 transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Streak milestones */}
        <div className="flex flex-wrap items-center gap-2">
          {streakMilestones.map((day) => {
            const isAchieved = Number(currentStreak) >= Number(day);

            return (
              <div
                key={day}
                className={`glassCard flex items-center gap-1.5 rounded-full px-3 py-2 text-xs sm:text-sm ${
                  isAchieved ? "bg-purple-600 text-white" : "bg-blue-200"
                }`}
              >
                {isAchieved ? (
                  <FaRegCircleCheck size={14} />
                ) : (
                  <CiLock size={14} />
                )}

                <span>{day}</span>
                <span>days</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chant achievements */}
      <div className="glassCard flex w-full min-w-0 flex-col gap-6 p-6 bg-blue-300 rounded-(--boxRadius) sm:w-125">
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
                  Number(data.today_japa_count) >= Number(requiredChantCount);

                return (
                  <div
                    key={level}
                    className={`glassCard p-4 flex flex-col items-center justify-between gap-2 ${isAchieved ? "bg-purple-600 text-white" : "bg-blue-200 text-blue-900"} ${isLast ? "col-span-1 sm:col-span-3" : ""} rounded-md`}
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
    </>
  );
}

export default React.memo(StreakOverview);
