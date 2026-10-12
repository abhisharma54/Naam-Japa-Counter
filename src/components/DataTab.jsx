import React, { useState } from "react";
import useNaamContext from "../context/naamContext";
import { IoIosArrowDropdown } from "react-icons/io";

const STATS = [
  { field: "totalMaala", label: "Total Mala" },
  { field: "todayMaala", label: "Today's Mala" },
  { field: "totalNaamJapa", label: "Total Naam Japa" },
  { field: "todayNaamJapa", label: "Today's Naam Japa" },
];

const formatNumber = (n) => n.toLocaleString("en-IN");

const formatDate = (iso) => iso.split("-").reverse().join("-");

function DataTab() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useNaamContext();

  return (
    <section
      aria-label="Japa statistics"
      className={`glassCard w-full relative ${
        isOpen && "h-30 border-b-zinc-300 overflow-hidden"
      } pt-4 pb-8 px-4 sm:px-6 bg-blue-300 sm:w-125`}
    >
      <div className="flex justify-between pb-4">
        <time
          dateTime={data.last_active_date}
          className="glassCard dateTab inline-flex items-center px-5 py-1 text-sm tracking-wider bg-blue-600 text-white rounded-lg"
        >
          {formatDate(data.last_active_date)}
        </time>
        <button
          className="z-50"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
        >
          <IoIosArrowDropdown
            className={`text-3xl text-blue-900 transition duration-100 ease-in hover:scale-105 cursor-pointer ${
              isOpen ? "rotate-0" : "-rotate-180"
            }`}
          />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        {STATS.map(({ field, label }) => (
          <div
            key={field}
            className="glassCard min-h-20 flex flex-col px-6 py-2.5 bg-blue-300 rounded-(--boxRadius) items-center justify-between"
          >
            <p className="text-lg text-nowrap text-blue-900 font-semibold">
                {label}
              </p>
              <p className="text-2xl font-medium text-white">
                {formatNumber(data[field])}
              </p>
          </div>
        ))}
        {isOpen && <div className="tab-gradient"></div>}
      </div>
    </section>
  );
}

export default React.memo(DataTab);
