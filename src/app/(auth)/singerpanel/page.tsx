"use client";
import { isAuth } from "@/app/utils/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CreateMusic from "./components/CreateMusic";
import CreateAlbum from "./components/CreateAlbum";

export default function SingerPanel() {
  const router = useRouter();
  useEffect(() => {
    const authResult: any = isAuth();
    if (!authResult || !authResult.is_singer) router.replace("/");
  }, [router]);
  return (
    <div className="grid grid-cols-2">
      <CreateMusic />
      <CreateAlbum />
    </div>
  );
}
