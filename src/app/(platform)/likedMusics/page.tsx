"use client";
import MusicItem from "@/app/components/MusicItem";
import { axiosCustom } from "@/app/utils/config";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LikedMusics() {
  const {
    data: musics,
    error,
    isLoading,
  } = useSWR<any>(["musics/likes/all"], ([url]) =>
    axiosCustom.get(url).then((res) => res.data)
  );
  return (
    <>
      <h1 className="text-5xl  font-bold text-gray-200 mb-9">
        Musics That You Liked
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {musics?.map((ms: any) => (
          <MusicItem musicObject={ms} key={ms.id} />
        ))}
      </section>
    </>
  );
}
