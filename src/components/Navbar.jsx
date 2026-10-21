import React from "react";
import { NavLink } from "react-router-dom";
import { icons } from "../constants/icons";

const navLinks = [
  {
    key: "home",
    label: "Home",
    path: "/",
    icon: "home",
  },
  {
    key: "rename",
    label: "Rename Chant",
    path: "/rename",
    icon: "edit",
  },
  {
    key: "streak",
    label: "Streak",
    path: "/streak",
    icon: "fire",
  },
  {
    key: "stats",
    label: "Stats",
    path: "/stats",
    icon: "chart",
  },
];

const NavItems = ({ mobile = false }) => {
  return (
    <ul
      className={`flex items-center justify-between ${mobile ? "mx-auto w-full gap-5" : "gap-4 lg:gap-10"}`}
    >
      {navLinks.map(({ key, label, path, icon }) => {
        const Icon = icons?.[icon];

        return (
          <li key={key} className={mobile ? "min-w-0 flex-1" : undefined}>
            <NavLink
              to={path}
              end={path === "/"}
              title={label}
              aria-label={label}
              className={({ isActive }) =>
                `glassCard flex items-center justify-center text-white transition duration-150 ease-out hover:bg-purple-700 hover:text-white hover:scale-105 active:translate-y-0.5 ${
                  isActive
                    ? "bg-purple-600"
                    : undefined
                } ${
                  mobile
                    ? "w-full p-3"
                    : "gap-2 px-3 py-2 text-sm font-semibold sm:gap-3 sm:px-4"
                }`
              }
            >
              <Icon
                size={mobile ? 20 : 18}
                className="shrink-0"
                aria-hidden="true"
              />
              {!mobile && <span className="truncate">{label}</span>}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

function Navbar({ showMobileNavbar = false }) {
  return (
    <>
      {/* Desktop Navbar */}
      <header className="glassCard relative w-full py-5 flex justify-center items-center fjalla-one-regular">
        <div className="flex flex-col items-center gap-5">
          <p className="text-xl text-nowrap sm:text-[1.6rem] logo">
            Naam Japa Counter
          </p>
          <nav aria-label="Main navigation" className="hidden sm:block">
            <NavItems />
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navbar */}
      <nav
        aria-label="Mobile navigation"
        aria-hidden={!showMobileNavbar}
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] glassCard max-w-lg px-2 py-3 transition-all duration-500 ease-in-out sm:hidden ${
          showMobileNavbar
            ? "translate-y-0 opacity-100"
            : "translate-y-[150%] opacity-0 pointer-events-none"
        }`}
      >
        <NavItems mobile />
      </nav>
    </>
  );
}

export default React.memo(Navbar);
