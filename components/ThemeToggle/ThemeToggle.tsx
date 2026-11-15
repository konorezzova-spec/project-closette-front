"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import css from "./ThemeToggle.module.css";
import sun from "/public/sun_big.svg"
import moon from "/public/moon_big.svg";
import Image from "next/image";

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      className={css.button}
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Змінити тему"
    >
     {isDark ? (
  <Image
    src={sun}
    alt="Sun"
    width={30}
    height={30}
  />
) : (
  <Image
    src={moon}
    alt="Sun"
    width={30}
    height={30}
  />
)}
    </button>
  );
}
