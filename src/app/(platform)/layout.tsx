"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAuth } from "../utils/config";
import { Toaster } from "react-hot-toast";
import MusicPlayProvider from "../context/MusicPlayProvider";
import PlayMusicWrapper from "../components/PlayMusicWrapper";
import { SWRConfig } from "swr";
import NextTopLoader from "nextjs-toploader";

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
        <SWRConfig value={{ revalidateOnMount: true }}>
          <MusicPlayProvider>
            <Toaster />
            <NextTopLoader showSpinner={false} color="#818cf8" />
            <PlayMusicWrapper />
            <Sidebar />
            <div className="pl-72">
              <div className="min-h-screen bg-gradient-to-t from-blue-200 to-indigo-900 px-5 py-10">
                {children}
              </div>
            </div>
          </MusicPlayProvider>
        </SWRConfig>
      </body>
    </html>
  );
}
