"use client";

import Link from "next/link";
import css from "./Header.module.css";
import Image from "next/image";
import Container from "../Container/Container";
import logo from "/public/header/company_logo.svg";
import burger_menu from "/public/header/burger_btn.svg";
import close from "/public/header/close.svg";
import { useState, useEffect } from "react";
import basket from "/public/header/basket.svg";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { useOrderStore } from "@/lib/store/basketStore";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const goodsOrderList = useOrderStore(state => state.draft.goodsOrderList);
  const totalQuantity = goodsOrderList.reduce(
    (total, good) => total + good.quantity,
    0
  );
  return (
    <header className={`${css.header} ${isVisible ? css.visible : css.hidden}`}>
      <Container className={`${css.header_container}`}>
        <Link
          className={css.link}
          href="/"
          aria-label="Home"
          onClick={closeMenu}
        >
          <Image
            className={css.logo}
            src={logo}
            alt="logo"
            width={84}
            height={36}
            priority
          />
        </Link>

        <nav className={css.desktop_menu}>
          <ul className={css.nav}>
            <li className={css.nav_item}>
              <Link href="/" prefetch={false} className={css.nav_link}>
                Головна
              </Link>
            </li>
            <li className={css.nav_item}>
              <Link href="/goods" prefetch={false} className={css.nav_link}>
                Товари
              </Link>
            </li>
            <li className={css.nav_item}>
              <Link
                href="/categories"
                prefetch={false}
                className={css.nav_link}
              >
                Категорії
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className={css.burger}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? (
            <Image
              className={css.logo}
              src={close}
              alt="close"
              width={24}
              height={24}
            />
          ) : (
            <Image
              className={css.logo}
              src={burger_menu}
              alt="navigation menu"
              width={20}
              height={20}
            />
          )}
        </button>

        <nav className={css.mobile_menu}>
          <Link className={css.basket} href="/basket" aria-label="Home">
            <Image
              className={css.logo}
              src={basket}
              alt="logo"
              width={36}
              height={36}
              priority
            />
            <p className={css.amount}>{totalQuantity}</p>
          </Link>
        </nav>

        <nav className={css.desktop_menu}>
          <AuthNavigation onClick={closeMenu} />
          <Link className={css.basket} href="/basket" aria-label="Home">
            <Image
              className={css.logo}
              src={basket}
              alt="logo"
              width={36}
              height={36}
              priority
            />
            <p className={css.amount}>{totalQuantity}</p>
          </Link>
        </nav>
      </Container>

      {isMenuOpen && (
        <nav
          className={`${css.mobile_menu} ${css.mobile_nav_menu}`}
          aria-hidden={!isMenuOpen}
        >
          <ul className={css.nav}>
            <li className={css.nav_item}>
              <Link
                href="/"
                prefetch={false}
                className={css.nav_link}
                onClick={closeMenu}
              >
                Головна
              </Link>
            </li>
            <li className={css.nav_item}>
              <Link
                href="/goods"
                prefetch={false}
                className={css.nav_link}
                onClick={closeMenu}
              >
                Товари
              </Link>
            </li>
            <li className={css.nav_item}>
              <Link
                href="/categories"
                prefetch={false}
                className={css.nav_link}
                onClick={closeMenu}
              >
                Категорії
              </Link>
            </li>
          </ul>
          <AuthNavigation onClick={closeMenu} />
        </nav>
      )}
    </header>
  );
}
