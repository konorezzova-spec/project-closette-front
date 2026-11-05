import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../fonts/inter/inter-v20-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/inter/inter-v20-latin-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/inter/inter-v20-latin-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const nunito_sans = localFont({
  src: [
    {
      path: "../fonts/nunito-sans/nunito-sans-v19-latin-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-nunito-sans",
  display: "swap",
});
