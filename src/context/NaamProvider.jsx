import { useMemo, useState } from "react";
import { NaamContext } from "./naamContext";
import {
  STORAGE_KEY,
  DEFAULT_DATA,
  BEADS_PER_MAALA,
} from "../constant";
 
// Accept only valid non-negative whole numbers, otherwise use the default
const toCount = (value, fallback) =>
  Number.isInteger(value) && value >= 0 ? value : fallback;

const loadData = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return DEFAULT_DATA;
 
    const naam = toCount(saved.naam_count, 0);
 
    return {
      totalMaala: toCount(saved.totalMaala, 0),
      todayMaala: toCount(saved.todayMaala, 0),
      totalNaamJapa: toCount(saved.totalNaamJapa, 0),
      todayNaamJapa: toCount(saved.todayNaamJapa, 0),
      last_active_date:
        typeof saved.last_active_date === "string" ? saved.last_active_date : "",
      naam_count: naam < BEADS_PER_MAALA ? naam : 0,
      chant_name: saved.chant_name ?? DEFAULT_DATA.chant_name
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
