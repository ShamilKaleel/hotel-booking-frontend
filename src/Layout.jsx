import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Layout() {
  const [headerBgColor, setHeaderBgColor] = useState("bg-green-600");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setHeaderBgColor("bg-green-600");
    } else {
      setHeaderBgColor("bg-lime-500");
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen mx-auto">
      <Header bgColor={headerBgColor} />
      <Outlet />
      <Footer />
    </div>
  );
}
