import { useEffect, useMemo, useState } from "react";
import { NaamContext } from "./naamContext";
import { STORAGE_KEY, DEFAULT_DATA, BEADS_PER_MALA } from "../constant";
import { applyRollover } from "../utils/streak";
import { getLocalDate } from "../utils/date";

const COUNT_KEYS = [
  "total_mala_count",
  "today_mala_count",
  "total_japa_count",
  "today_japa_count",
  "japa_current_streak",
  "japa_best_streak",
  "japa_daily_target",
  "japa_milestone",
  "mala_current_streak",
  "mala_best_streak",
  "mala_daily_target",
  "mala_milestone",
];

const toCount = (value, fallback) =>
  Number.isInteger(value) && value >= 0 ? value : fallback;

const isPlainObject = (v) =>
  v !== null && typeof v === "object" && !Array.isArray(v);

const freshDefaults = () => ({ ...DEFAULT_DATA, daily_activity: {} });

const loadData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return applyRollover(freshDefaults(), getLocalDate());

    const saved = JSON.parse(raw);
    if (!isPlainObject(saved))
      return applyRollover(freshDefaults(), getLocalDate());

    const data = freshDefaults();

    for (const key of COUNT_KEYS) {
      data[key] = toCount(saved[key], DEFAULT_DATA[key]);
    }

    const chant = toCount(saved.chant_count, 0);
    data.chant_count = chant < BEADS_PER_MALA ? chant : 0;

    data.chant_name =
      typeof saved.chant_name === "string" && saved.chant_name.trim()
        ? saved.chant_name
        : DEFAULT_DATA.chant_name;

    data.last_active_date =
      typeof saved.last_active_date === "string" ? saved.last_active_date : "";

    data.daily_activity = isPlainObject(saved.daily_activity)
      ? saved.daily_activity
      : {};

    // roll over immediately so every page sees correct "today" values
    return applyRollover(data, getLocalDate());
  } catch {
    return freshDefaults();
  }
};

export const NaamProvider = ({ children }) => {
  const [data, setData] = useState(loadData);

  // Persist on every change (works on every page now)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // storage full / blocked: app still works in memory
    }
  }, [data]);

  // Re-check date when app returns to foreground (e.g. phone left open overnight)
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState !== "visible") return;
      setData((prev) => applyRollover(prev, getLocalDate()));
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  const value = useMemo(() => ({ data, setData }), [data]);

  return <NaamContext.Provider value={value}>{children}</NaamContext.Provider>;
};
