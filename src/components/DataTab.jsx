import React, { useState } from "react";
import { flowerIcon, downArrowIcon, naamIcon } from "../assets/index";
import useNaamContext from "../context/NaamProvider";

function DataTab() {
  const [isOpenTab, setIsOpenTab] = useState(false);
  const { data } = useNaamContext();

  const naamData = [
    {
      id: 1,
      name: "Total Maala",
      imgSrc: flowerIcon,
      imgAlt: "flower icon",
      data: data.totalMaala,
    },
    {
      id: 2,
      name: "Today Maala",
      imgSrc: flowerIcon,
      imgAlt: "flower icon",
      data: data.todayMaala,
    },
    {
      id: 3,
      name: "Total Naam Japa",
      imgSrc: naamIcon,
      imgAlt: "naam japa icon",
      data: data.totalNaamJapa,
    },
    {
      id: 4,
      name: "Today Naam Japa",
      imgSrc: naamIcon,
      imgAlt: "naam japa icon",
      data: data.todayNaamJapa,
    },
  ];

  return (
    <div
      className={`glassCard w-full relative ${
        isOpenTab && "h-[120px] border-b-zinc-300 overflow-hidden"
      } pt-4 pb-8 px-4 sm:px-6 bg-blue-300 sm:w-[500px]`}
    >
      <div className="flex justify-between pb-4">
        <div className="glassCard dateTab px-5 flex items-center text-sm tracking-wider bg-blue-600 text-white rounded-lg">
          <p>{data.lastActiveDate.split("-").reverse().join("-")}</p>
        </div>
        <button className="z-50" onClick={() => setIsOpenTab(!isOpenTab)}>
          <img
            className={`w-[35px] h-[35px] transition duration-100 ease-in hover:scale-105 cursor-pointer ${
              isOpenTab ? "rotate-0" : "-rotate-180"
            }`}
            src={downArrowIcon}
            alt="down arrow icon"
          />
        </button>
      </div>
      <div className="flex flex-col gap-4 ">
        {naamData.map(({ id, name, imgSrc, imgAlt, data }, i) => (
          <div
            key={id}
            className="glassCard flex sm:flex-row flex-col px-6 py-2.5 bg-blue-300 rounded-[var(--boxRadius)] items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <p className="text-lg text-nowrap sm:text-xl text-blue-900 font-semibold">
                {name}
              </p>
              {i % 2 == 0 && (
                <img
                  className="w-[28px] h-[28px] rotate-0"
                  src={imgSrc}
                  alt={imgAlt}
                  loading="lazy"
                />
              )}
            </div>
            <div>
              <p className="text-xl font-medium text-white">{data}</p>
            </div>
          </div>
        ))}
        {isOpenTab && <div className="tab-gradient"></div>}
      </div>
    </div>
  );
}

export default React.memo(DataTab);
