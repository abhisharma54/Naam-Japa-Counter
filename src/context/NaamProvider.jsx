import { createContext, useContext, useState } from "react";

export const NaamContext = createContext();

export const NaamProvider = ({ children }) => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("naamJapaData")) || {
      totalMaala: 0,
      todayMaala: 0,
      totalNaamJapa: 0,
      todayNaamJapa: 0,
      lastActiveDate: "",
      naam: 0,
    }
  );

  return (
    <NaamContext.Provider value={{ data, setData }}>
      {children}
    </NaamContext.Provider>
  );
};

export default function useNaamContext() {
  return useContext(NaamContext);
}
