import React, { useCallback, useEffect } from "react";
import { Counter, DataTab, MantraCard } from "../components/index";
import useNaamContext from "../context/naamContext";
import { BEADS_PER_MALA, STORAGE_KEY, DEFAULT_DATA } from "../constant";
import { applyRollover, creditStreakIfReached } from "../utils/streak";
import { getLocalDate } from "../utils/date";

function Home() {
  const { data, setData } = useNaamContext();

  const handleData = useCallback(() => {
    // Detect mala completion from current state for haptics
    const willComplete = data.chant_count + 1 === BEADS_PER_MALA;
    navigator.vibrate?.(willComplete ? [100, 50, 100] : 10);

    setData((current) => {
      const prev = applyRollover(current, getLocalDate());

      const completed = prev.chant_count + 1 >= BEADS_PER_MALA;
      const next = {
        ...prev,
        chant_count: completed ? 0 : prev.chant_count + 1,
        total_mala_count: prev.total_mala_count + (completed ? 1 : 0),
        today_mala_count: prev.today_mala_count + (completed ? 1 : 0),
        total_japa_count: prev.total_japa_count + 1,
        today_japa_count: prev.today_japa_count + 1,
      };

      return creditStreakIfReached(prev, next);
    });
  }, [setData, data.chant_count]);

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
