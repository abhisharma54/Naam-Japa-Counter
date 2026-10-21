import React, { useMemo, useEffect, useRef, useState } from "react";
import useNaamContext from "../context/naamContext";
import { CHART_HEIGHT_PX, MIN_BAR_HEIGHT_PX } from "../constants/stats";
import ActivityTabs from "../components/ActivityTabs";

function Stats() {
  const { data } = useNaamContext();

  const scrollRef = useRef(null);
  const hasAutoScrolled = useRef(false);

  const [activeType, setActiveType] = useState("japa");
  const [isScrollable, setIsScrollable] = useState(false);

  const dailyActivity = data?.daily_activity;
  const isJapa = activeType === "japa";

  const statsData = useMemo(() => {
    return Object.entries(dailyActivity ?? {})
      .sort(([a], [b]) => a.localeCompare(b)) // oldest -> newest
      .map(([date, activity]) => ({
        key: date,
        label: new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
        }),
        type: Number(isJapa ? (activity?.japa ?? 0) : (activity?.mala ?? 0)),
      }));
  }, [dailyActivity, isJapa]);

  const maxJapa = Math.max(1, ...statsData.map((item) => item.japa));

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Scroll to the latest day only once, so later data updates
    // don't pull the user away from older history
    if (!hasAutoScrolled.current) {
      el.scrollLeft = el.scrollWidth;
      hasAutoScrolled.current = true;
    }

    const checkScrollable = () => {
      setIsScrollable(el.scrollWidth > el.clientWidth);
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [statsData]);

  return (
    <div className="glassCard flex w-full min-w-0 flex-col gap-5 rounded-(--boxRadius) bg-blue-300 p-4 text-blue-900 sm:w-125 sm:gap-6 sm:p-6">
      <h1 className="text-xl font-semibold sm:text-2xl">Your stats</h1>

      <ActivityTabs activeType={activeType} onActiveType={setActiveType} />

      {statsData.length === 0 ? (
        <p className="text-center text-sm">
          No {activeType} activity available yet.
        </p>
      ) : (
        <>
          <div
            ref={scrollRef}
            className="w-full min-w-0 overflow-x-auto overflow-y-hidden pb-3 touch-pan-x"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex w-max min-w-full items-end gap-4 rounded-md px-3 py-2">
              {statsData.map(({ key, label, type }) => {
                const barHeight = (type / maxJapa) * CHART_HEIGHT_PX;

                return (
                  <div
                    key={key}
                    className="flex w-12 shrink-0 flex-col items-center gap-2"
                  >
                    <span className="text-xs font-medium">
                      {type.toLocaleString("en-IN")}
                    </span>

                    <div className="flex w-10 items-end justify-center">
                      <div
                        className="w-full rounded-t-md bg-purple-600 transition-all duration-300"
                        style={{
                          height: `${barHeight}px`,
                          minHeight:
                            type > 0 ? `${MIN_BAR_HEIGHT_PX}px` : "0px",
                        }}
                        title={`${activeType}: ${type}`}
                      />
                    </div>

                    <span className="whitespace-nowrap text-xs">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {isScrollable && (
            <p className="-mt-2 text-center text-xs text-blue-900/80">
              ← Swipe or scroll left to see your previous japa history
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default Stats;
