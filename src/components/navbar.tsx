"use client";

import { ModeToggle } from "./themeToggle";

function Navbar() {
  return (
    <div className="flex justify-between items-center w-full">
      <h2 className="text-lg sm:text-xl">devfinder</h2>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
