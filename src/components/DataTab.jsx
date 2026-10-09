import React, { useState } from "react";
import { flowerIcon, downArrowIcon, naamIcon } from "../assets/index";
import useNaamContext from "../context/naamContext";

const STATS = [
  { field: "totalMaala", label: "Total Mala", icon: flowerIcon },
  { field: "todayMaala", label: "Today's Mala" },
  { field: "totalNaamJapa", label: "Total Naam Japa", icon: naamIcon },
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
          dateTime={data.lastActiveDate}
          className="glassCard dateTab inline-flex items-center px-5 py-1 text-sm tracking-wider bg-blue-600 text-white rounded-lg"
        >
          {formatDate(data.lastActiveDate)}
        </time>
        <button
          className="z-50"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
        >
          <img
            className={`w-8.75 h-8.75 transition duration-100 ease-in hover:scale-105 cursor-pointer ${
              isOpen ? "rotate-0" : "-rotate-180"
            }`}
            src={downArrowIcon}
            alt="down arrow icon"
            loading="lazy"
          />
        </button>
      </div>
      <div className="flex flex-col gap-4 ">
        {STATS.map(({ field, label, icon }) => (
          <div
            key={field}
            className="glassCard flex sm:flex-row flex-col px-6 py-2.5 bg-blue-300 rounded-(--boxRadius) items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <p className="text-lg text-nowrap sm:text-xl text-blue-900 font-semibold">
                {label}
              </p>
              {icon && (
                <img
                  className="w-7 h-7 rotate-0"
                  src={icon}
                  alt=""
                  loading="lazy"
                />
              )}
            </div>
            <div>
              <p className="text-xl font-medium text-white">
                {formatNumber(data[field])}
              </p>
            </div>
          </div>
        ))}
        {isOpen && <div className="tab-gradient"></div>}
      </div>
    </section>
  );
}

export default React.memo(DataTab);
