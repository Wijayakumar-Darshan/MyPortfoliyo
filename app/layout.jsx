import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "Wijayakumar Darshan",
  description: "Portfolio of Wijayakumar Darshan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add the favicon */}
        <link rel="icon" type="image/svg+xml" href="/assets/favicon/WD.svg" />
      </head>
      <body className={jetbrainsMono.variable}>{children}</body>
    </html>
  );
}
