import React from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from '../constant'
import { IoHome } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";

const icons = {
  home: IoHome,
  edit: MdEdit,
  fire: FaFire,
  chart: IoBarChart,
};

function Navbar() {
  return (
    <div className="glassCard w-full relative py-5 fjalla-one-regular flex justify-center items-center">
      <div className="flex flex-col gap-5">
        <p className="text-xl text-nowrap sm:text-[1.6rem] logo">
          Naam Japa Counter
        </p>
        <ul className="flex items-center justify-between gap-10 max-sm:hidden">
          {navLinks.map(({ key, label, path, icon }) => {
            const Icon = icons[icon];

            return (
            <li key={key}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `glassCard flex items-center gap-3 px-4 py-2 ${isActive ? "bg-purple-600 text-white rounded-full" : "text-blue-900"} text-sm font-semibold transition duration-75 ease-out hover:bg-purple-700 hover:text-white hover:scale-105 active:translate-y-0.5 cursor-pointer`
                }
              >
                <Icon size={18} className="shrink-0" />
                <span className="truncate">{label}</span>
              </NavLink>
            </li>
          )
          })}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
