import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Portfolio | Prabhulal Raghwani",
  description: "Prabhulal Raghwani's portfolio site.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={montserrat.className}
        style={{ backgroundColor: "#121212" }}
      >
        {/* 🔥 INSTANT CSS LOADER (NO JS REQUIRED) */}
        <div id="initial-loader">
          <div className="pulse"></div>
        </div>

        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
