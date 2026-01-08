
import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "@/ClientProvider";

// meta data is object coming nextjs
export const metadata: Metadata = {
  title: "next auth",
  description: "Making Auth in js",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        {/* if we wrap the children in sessin we have to make layout as a cilent comp which is not possible 
        for this make an anothe component and on that comp wrap the children in sesisio */}
        <ClientProvider>
        {children}
        </ClientProvider>
      </body>
    </html>
  );
}
