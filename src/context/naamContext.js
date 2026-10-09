import { createContext, useContext } from "react";

export const NaamContext = createContext(null);

export default function useNaamContext() {
  const context = useContext(NaamContext);
  if (context === null) {
    throw new Error("useNaamContext must be used inside <NaamProvider>");
  }
  return context;
}