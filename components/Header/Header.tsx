"use client";

import Link from "next/link";
import css from "./Header.module.css";
import Image from "next/image";
import Container from "../Container/Container";
import logo from "/public/header/company_logo.svg";
import burger_menu from "/public/header/burger_btn.svg";
import close from "/public/header/close.svg";
import basket from "/public/header/basket.svg";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { useBasketStore } from "@/lib/store/basketStore";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollPosition = useRef(0);

  useEffect(() => {
    if (!isMenuOpen) return;

    // Запам'ятовуємо позицію скролу
    scrollPosition.current = window.scrollY;

    const body = document.body;

    // Фіксуємо сторінку
    body.style.position = "fixed";
    body.style.top = `-${scrollPosition.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      // Відновлюємо стилі
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";

      // Повертаємо попередню позицію
      window.scrollTo(0, scrollPosition.current);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (isMenuOpen) {
        setIsVisible(true);
        return;
      }

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
  }, [isMenuOpen]);

  const totalQuantity = useBasketStore(state => state.items.length);

  return (
    <header
      className={`${css.header} ${
        isVisible || isMenuOpen ? css.visible : css.hidden
      }`}
    >
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
              className={css.close_cvg}
              src={close}
              alt="close"
              width={24}
              height={24}
            />
          ) : (
            <Image
              className={css.burger_svg}
              src={burger_menu}
              alt="navigation menu"
              width={24}
              height={24}
            />
          )}
        </button>

        <nav className={css.mobile_menu}>
          <Link className={css.basket} href="/basket" aria-label="Home">
            <Image
              className={css.basket_svg}
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
