import { Outlet } from "react-router";
import Head from "./Head";
import { GlobalContext } from "../../context/Global-Context";
import { useEffect, useState } from "react";
import type { them } from "../../Types/general";

const AppLayout = () => {
  const [them, setThem] = useState<them>("Light");

  const toggleThem = () => {
    setThem(them === "Dark" ? "Light" : "Dark");
  };

  

  return (
    <>
      <GlobalContext.Provider value={{ them, toggleThem }}>
        <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white pt-3">

          <Head />
        <main>

          <Outlet />
        </main>
        </div>
      </GlobalContext.Provider>
    </>
  );
};

export default AppLayout;
