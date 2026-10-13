import React, { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Navbar } from "./components/index";
import { navLinks } from "./constant";
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

function Layout() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setShowNavbar(
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 10,
      );

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="w-full flex flex-col px-4 py-8 pb-24 gap-8 relative min-h-dvh sm:px-8 overflow-hidden">
      {/* Decorative background, hidden from screen readers and not clickable */}
      <div
        className="absolute inset-0 box pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="mesh-gradientBox1 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="mesh-gradientBox2 pointer-events-none"
        aria-hidden="true"
      />

      <Navbar />

      <main className="glassCard min-h-[80vh] py-8 px-5 flex flex-col items-center gap-10 sm:px-8">
        <Outlet />
      </main>
      {/* Mobile bottom navigation */}
      <nav
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 glassCard max-w-lg w-full rounded-2xl px-2 py-3 sm:hidden transition-all duration-500 ease-in-out ${
          showNavbar
            ? "translate-y-0 opacity-100"
            : "translate-y-[150%] opacity-0 pointer-events-none"
        }`}
      >
        <ul className="mx-auto flex w-full items-center justify-between gap-5">
          {navLinks.map(({ key, path, label, icon }) => {
            const Icon = icons[icon];

            return (
              <li key={key} className="min-w-0 flex-1">
                <NavLink
                title={label}
                  to={path}
                  className={({ isActive }) =>
                    `glassCard flex justify-center items-center p-3 ${isActive ? "bg-purple-600 text-white rounded-full" : "text-blue-900"} transition duration-75 ease-out hover:bg-purple-700 hover:text-white hover:scale-105 active:translate-y-0.5 cursor-pointer`
                  }
                >
                  <Icon size={20} className="shrink-0" />
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Layout;
