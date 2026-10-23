import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./index";

function Layout() {
  const [showNavbar, setShowNavbar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      setShowNavbar(scrollPosition >= pageHeight - 10);
    };

    // Reset scroll position when navigating to another page
    window.scrollTo(0, 0);  

    window.addEventListener("scroll", onScroll);
    requestAnimationFrame(onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [location.pathname]);

  return (
    <div className="w-full flex flex-col px-4 py-8 pb-24 gap-8 relative min-h-dvh sm:px-8 overflow-hidden">
      {/* Decorative background, hidden from screen readers and not clickable */}
      <div
        className="absolute inset-0 box pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="mesh-gradient-box-1 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="mesh-gradient-box=2 pointer-events-none"
        aria-hidden="true"
      />

      <Navbar showMobileNavbar={showNavbar} />

      <main className="glass-card min-h-[80vh] py-8 px-5 flex flex-col items-center justify-center gap-10 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
