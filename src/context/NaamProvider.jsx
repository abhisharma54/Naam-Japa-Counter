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
      total_mala: toCount(saved.total_mala, 0),
      today_mala: toCount(saved.today_mala, 0),
      total_naam_japa: toCount(saved.total_naam_japa, 0),
      today_naam_japa: toCount(saved.today_naam_japa, 0),
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
