import React, {
  useMemo,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import useNaamContext from "../context/naamContext";
import { CHART_HEIGHT_PX, MIN_BAR_HEIGHT_PX } from "../constants/stats";
import ActivityTabs from "../components/ActivityTabs";
import { ChantAchievements } from "../components/index";

const formatLabel = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
  });

function Stats() {
  const { data } = useNaamContext();

  const scrollRef = useRef(null);
  const hasAutoScrolled = useRef(false);

  const [activeType, setActiveType] = useState("japa");
  const [isScrollable, setIsScrollable] = useState(false);

  const dailyActivity = data?.daily_activity;

  const statsData = useMemo(() => {
    return Object.entries(dailyActivity ?? {})
      .sort(([a], [b]) => a.localeCompare(b)) // oldest -> newest
      .map(([date, activity]) => ({
        key: date,
        label: formatLabel(date),
        value: Number(activity?.[activeType] ?? 0),
      }));
  }, [dailyActivity, activeType]);

  const maxValue = useMemo(
    () => Math.max(1, ...statsData.map((item) => item.value)),
    [statsData],
  );

  const hasData = statsData.length > 0;

  // Jump to the latest day once, before paint
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el || hasAutoScrolled.current) return;
    el.scrollLeft = el.scrollWidth;
    hasAutoScrolled.current = true;
  }, [hasData]);

  // Show the swipe hint only when content overflows
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const check = () => setIsScrollable(el.scrollWidth > el.clientWidth);
    check();

    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [statsData.length]);

  return (
    <>
      <div className="glass-card flex w-full min-w-0 min-h-100 flex-col gap-5 rounded-xl p-4 sm:w-125 sm:gap-6 sm:p-6">
        <h1 className="text-xl font-semibold sm:text-2xl">Your stats</h1>

        <ActivityTabs activeType={activeType} onActiveType={setActiveType} />

        {!hasData ? (
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
              <div className="flex w-max min-w-full gap-4 rounded-md px-3 py-2">
                {statsData.map(({ key, label, value }) => {
                  const barHeight =
                    value > 0
                      ? Math.max(
                          (value / maxValue) * CHART_HEIGHT_PX,
                          MIN_BAR_HEIGHT_PX,
                        )
                      : 0;

                  return (
                    <div
                      key={key}
                      className="flex w-12 shrink-0 flex-col items-center gap-2"
                    >
                      <span className="text-xs font-medium">
                        {value.toLocaleString("en-IN")}
                      </span>

                      {/* fixed height keeps every date label on the same line */}
                      <div
                        className="flex w-10 items-end justify-center"
                        style={{ height: `${CHART_HEIGHT_PX}px` }}
                      >
                        <div
                          className="w-full rounded-t-md bg-purple-600 transition-all duration-300"
                          style={{ height: `${barHeight}px` }}
                          title={`${key}: ${value.toLocaleString("en-IN")} ${activeType}`}
                        />
                      </div>

                      <span className="whitespace-nowrap text-xs">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {isScrollable && (
              <p className="-mt-2 text-center text-xs opacity-80">
                ← Swipe or scroll left to see your previous {activeType} history
              </p>
            )}
          </>
        )}
      </div>

      <ChantAchievements />
    </>
  );
}

export default Stats;
