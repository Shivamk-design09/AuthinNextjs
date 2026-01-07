import type { Metadata } from "next";
import "./globals.css";


// meta data is object coming nextjs
export const metadata: Metadata = {
  title: "next auth",
  description: "Making Auth in js",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
