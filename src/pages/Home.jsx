import React, { useCallback, useEffect } from "react";
import {
  Counter,
  DataTab,
  MantraCard,
} from "../components/index";
import useNaamContext from "../context/naamContext";
import {
  BEADS_PER_MAALA,
  STORAGE_KEY,
  DEFAULT_DATA,
} from "../constant";

const getLocalDate = () => new Date().toLocaleDateString("en-CA");

function Home() {
  const { data, setData } = useNaamContext();

  const handleData = useCallback(() => {
    setData((prev) => {
      const completed = prev.naam_count + 1 === BEADS_PER_MAALA;
      return {
        ...prev,
        naam_count: completed ? 0 : prev.naam_count + 1,
        totalNaamJapa: prev.totalNaamJapa + 1,
        todayNaamJapa: prev.todayNaamJapa + 1,
        totalMaala: prev.totalMaala + (completed ? 1 : 0),
        todayMaala: prev.todayMaala + (completed ? 1 : 0),
      };
    });

    // Light tap feedback, longer pattern when a mala completes
    navigator.vibrate?.(
      data.naam_count + 1 === BEADS_PER_MAALA ? [100, 50, 100] : 10,
    );
  }, [setData, data.naam_count]);

  useEffect(() => {
    const rollOverIfNewDay = () => {
      const today = getLocalDate();
      setData((prev) =>
        prev.last_active_date === today
          ? prev // same object = no re-render
          : {
              ...prev,
              todayMaala: 0,
              todayNaamJapa: 0,
              naam_count: 0,
              last_active_date: today,
            },
      );
    };

    rollOverIfNewDay();

    document.addEventListener("visibilitychange", rollOverIfNewDay);
    return () =>
      document.removeEventListener("visibilitychange", rollOverIfNewDay);
  }, [setData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // storage full or blocked (private mode), app still works in memory
    }
  }, [data]);
  return (
    <>
      <MantraCard />
      <DataTab />
      <Counter />
      <button
        onClick={handleData}
        className="glassCard px-10 py-2 bg-purple-600 text-xl font-semibold text-white rounded-full transition duration-75 ease-out hover:bg-purple-700 hover:[box-shadow:0_0_30px_2px_#8819ffb3] hover:scale-105 active:translate-y-0.5 cursor-pointer"
      >
        {data.chant_name || DEFAULT_DATA.chant_name}
      </button>
    </>
  );
}

export default Home;
