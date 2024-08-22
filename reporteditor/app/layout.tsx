import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { SidebarProvider } from "./context/SidebarContext";
import { UserProvider } from "./context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dynamic Report Editor",
  description: "Gener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <SidebarProvider>
            <NavBar />
            {children}
          </SidebarProvider>
        </UserProvider>
      </body>
    </html>
  );
}
