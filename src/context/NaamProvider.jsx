import { useMemo, useState } from "react";
import { NaamContext } from "./naamContext";
import {
  STORAGE_KEY,
  DEFAULT_DATA,
  BEADS_PER_MAALA,
} from "./naamConstants";
 
// Accept only valid non-negative whole numbers, otherwise use the default
const toCount = (value, fallback) =>
  Number.isInteger(value) && value >= 0 ? value : fallback;

const loadData = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return DEFAULT_DATA;
 
    const naam = toCount(saved.naam, 0);
 
    return {
      totalMaala: toCount(saved.totalMaala, 0),
      todayMaala: toCount(saved.todayMaala, 0),
      totalNaamJapa: toCount(saved.totalNaamJapa, 0),
      todayNaamJapa: toCount(saved.todayNaamJapa, 0),
      lastActiveDate:
        typeof saved.lastActiveDate === "string" ? saved.lastActiveDate : "",
      naam: naam < BEADS_PER_MAALA ? naam : 0,
      chantName: saved.chantName ?? "Radha Radha"
    };
  } catch {
    return DEFAULT_DATA;
  }
};

 
export const NaamProvider = ({ children }) => {
  const [data, setData] = useState(loadData);
 
  const value = useMemo(() => ({ data, setData }), [data]);
 
  return <NaamContext.Provider value={value}>{children}</NaamContext.Provider>;
};
