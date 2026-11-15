import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { inter, nunito_sans } from "@/app/fonts";

import css from "./layout.module.css";
import TanStackProvider from "../components/TanstackProvider/TanstackProvider";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";

const SITE_URL = process.env.SITE_URL;
if (!SITE_URL) {
  throw new Error("SITE_URL is not defined in the environment variables");
}

export const metadata: Metadata = {
  title: "Clothing Store App",
  description: "Choose your unique style today. Visit our store.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Clothing Store App",
    description: "Choose your unique style today. Visit our store.",
    url: SITE_URL,
    images: [
      {
        url: "https://res.cloudinary.com/rvojizer/image/upload/v1793859959/metadata.png",
        alt: "Mane image",
        width: 600,
        height: 300,
      },
    ],
  },
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="uk"
      className={`${inter.variable} ${nunito_sans.variable}`}
      suppressHydrationWarning
    >
      <body className={css.body}>
        <ThemeProvider>
          <TanStackProvider>
      {/* <AuthProvider> */}
            {children}
            <Toaster position="top-right" />
      {/* </AuthProvider> */}
          </TanStackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
