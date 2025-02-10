"use client";

import Logo from "@components/Logo";
import menu from "@config/menu.json";
import SearchModal from "@layouts/partials/SearchModal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Header = () => {
  const { main } = menu;

  // Navbar Fixed State
  const [navFixed, setNavFixed] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [daysInTinyHouse, setDaysInTinyHouse] = useState(0);

  useEffect(() => {
    const changeNavbarBackground = () => {
      setNavFixed(window.pageYOffset >= 1);
    };
    window.addEventListener("scroll", changeNavbarBackground);

    // Berechnung der Tage
    const startDate = new Date(2022, 8, 22); // 22. September 2022 (Monate in JS sind 0-indexed)
    const today = new Date();
    const differenceInTime = today - startDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

    setDaysInTinyHouse(differenceInDays);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white py-2 transition-all ${
          navFixed ? "shadow" : "pt-8 md:pt-16"
        }`}
      >
        <nav className="navbar container flex items-center justify-between">
          {/* Logo mit Tageszähler darunter */}
          <div className="flex flex-col items-center leading-tight">
            <Logo />
            <span className="text-xs font-semibold text-gray-600">since {daysInTinyHouse} days</span>
          </div>

          {/* Navbar-Toggler für Mobile */}
          <input id="nav-toggle" type="checkbox" className="hidden" />
          <label
            id="show-button"
            htmlFor="nav-toggle"
            className="order-2 flex cursor-pointer items-center md:order-1 md:hidden"
          >
            <svg className="h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu Open</title>
              <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
            </svg>
          </label>
          <label
            id="hide-button"
            htmlFor="nav-toggle"
            className="order-2 hidden cursor-pointer items-center md:order-1"
          >
            <svg className="h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu Close</title>
              <polygon
                points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                transform="rotate(45 10 10)"
              />
            </svg>
          </label>

          {/* Menü */}
          <ul
            id="nav-menu"
            className="navbar-nav order-3 hidden w-full md:order-1 md:flex md:w-auto md:space-x-2"
          >
            {main.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menu.hasChildren ? (
                  <li className="nav-item nav-dropdown group relative">
                    <span className="nav-link inline-flex items-center">
                      {menu.name}
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul className="nav-dropdown-list hidden group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                      {menu.children.map((child, i) => (
                        <li className="nav-dropdown-item" key={`children-${i}`}>
                          <Link
                            href={child.url}
                            className="nav-dropdown-link block"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link href={menu.url} className="nav-link block">
                      {menu.name}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>

          {/* Suchsymbol bleibt exakt an seiner Position */}
          <div className="order-1 ml-auto md:order-2 md:ml-0">
            <div
              className="cursor-pointer p-2 text-xl text-dark hover:text-primary"
              onClick={() => {
                setSearchModal(true);
              }}
            >
              <IoSearch />
            </div>
          </div>

          <SearchModal searchModal={searchModal} setSearchModal={setSearchModal} />
        </nav>
      </header>
    </>
  );
};

export default Header;
