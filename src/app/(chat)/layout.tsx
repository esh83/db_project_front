"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAuth } from "../utils/config";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    if (!isAuth()) router.replace("/login");
  }, [router]);

  return (
    <html lang="en" className={inter.className}>
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
