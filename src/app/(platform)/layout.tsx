"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAuth } from "../utils/config";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    if (!isAuth()) router.replace("/login");
  }, [router]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />

        <Sidebar />
        <div className="pl-72">
          <div className="min-h-screen bg-gradient-to-t from-blue-200 to-indigo-900 px-5 py-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
