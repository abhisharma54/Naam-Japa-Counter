import { useCallback, useEffect } from "react";
import { Counter, DataTab, Navbar, MantraCard, ChantUpdateCard } from "./components/index";
import useNaamContext from "./context/naamContext";
import { BEADS_PER_MAALA, STORAGE_KEY } from './context/naamConstants';

const getLocalDate = () => new Date().toLocaleDateString("en-CA");

function App() {
  const { data, setData } = useNaamContext();

  const handleData = useCallback(() => {
    setData((prev) => {
      const completed = prev.naam + 1 === BEADS_PER_MAALA;
      return {
        ...prev,
        naam: completed ? 0 : prev.naam + 1,
        totalNaamJapa: prev.totalNaamJapa + 1,
        todayNaamJapa: prev.todayNaamJapa + 1,
        totalMaala: prev.totalMaala + (completed ? 1 : 0),
        todayMaala: prev.todayMaala + (completed ? 1 : 0),
      };
    });
 
    // Light tap feedback, longer pattern when a mala completes
    navigator.vibrate?.(data.naam + 1 === BEADS_PER_MAALA ? [100, 50, 100] : 10);
  }, [setData, data.naam]);

  useEffect(() => {
    const rollOverIfNewDay = () => {
      const today = getLocalDate();
      setData((prev) =>
        prev.lastActiveDate === today
          ? prev // same object = no re-render
          : { ...prev, todayMaala: 0, todayNaamJapa: 0, lastActiveDate: today }
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
    <div className="w-full flex flex-col px-4 py-8 gap-8 relative min-h-dvh sm:px-8 overflow-hidden">
      {/* Decorative background, hidden from screen readers and not clickable */}
      <div className="absolute inset-0 box pointer-events-none" aria-hidden="true" />
      <div className="mesh-gradientBox1 pointer-events-none" aria-hidden="true" />
      <div className="mesh-gradientBox2 pointer-events-none" aria-hidden="true" />

      <Navbar />

      <main className="glassCard min-h-[80vh] py-8 px-8 flex flex-col items-center gap-10">
        <MantraCard />
        <DataTab />
        <ChantUpdateCard />
        <Counter />
        <button
          onClick={handleData}
          className="glassCard px-10 py-2 bg-purple-600 text-xl font-semibold text-white rounded-full transition duration-75 ease-out hover:bg-purple-700 hover:[box-shadow:0_0_30px_2px_#8819ffb3] hover:scale-105 active:translate-y-0.5 cursor-pointer"
        >
          {data.chantName || "Radha Radha"}
        </button>
      </main>
    </div>
  );
}

export default App;
