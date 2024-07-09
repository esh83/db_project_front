"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "../components/Sidebar";
import { checkLogin } from "../(auth)/check-login";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    if (!checkLogin()) router.replace("/login");
  }, [router]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Sidebar />
        <div className="pl-80 pt-5">{children}</div>
      </body>
    </html>
  );
}
