import { useEffect, useMemo, useState } from "react";
import { Counter, DataTab, Navbar, MantraCard } from "./components/index";
import useNaamContext from "./context/NaamProvider";

function App() {
  const { data, setData } = useNaamContext();

  const getTodayDate = useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  const handleData = () => {
    if (data.naam == 107) {
      setData((prev) => ({
        ...prev,
        totalMaala: prev.totalMaala + 1,
        todayMaala: prev.todayMaala + 1,
        totalNaamJapa: prev.totalNaamJapa + 1,
        todayNaamJapa: prev.todayNaamJapa + 1,
        naam: 0,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        totalNaamJapa: prev.totalNaamJapa + 1,
        todayNaamJapa: prev.todayNaamJapa + 1,
        naam: prev.naam + 1,
      }));
    }
  };

  useEffect(() => {
    if (data.lastActiveDate !== getTodayDate) {
      const updateData = {
        ...data,
        todayMaala: 0,
        todayNaamJapa: 0,
        lastActiveDate: getTodayDate,
        naam: 0,
      };
      setData(updateData);
      localStorage.setItem("naamJapaData", JSON.stringify(updateData));
    }
    localStorage.setItem("naamJapaData", JSON.stringify(data));
  }, [data]);

  return (
    <div className="w-full flex flex-col px-4 py-8 gap-8 relative min-h-screen h-full sm:px-8 overflow-hidden">
      <div className="absolute inset-0 box"></div>
      <div className="mesh-gradientBox1"></div>
      <div className="mesh-gradientBox2"></div>
      <Navbar />
      <section className="glassCard min-h-[80vh] py-8 px-8 flex flex-col items-center gap-10">
        <MantraCard />
        <DataTab />
        <Counter />
        <button
          onClick={handleData}
          className="glassCard px-10 py-2 bg-purple-600 text-xl font-semibold text-white rounded-full transition duration-75 ease-out hover:bg-purple-700 hover:scale-105 cursor-pointer"
        >
          राधा राधा
        </button>
      </section>
    </div>
  );
}

export default App;
