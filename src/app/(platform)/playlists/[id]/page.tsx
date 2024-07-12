"use client";
import MusicItem from "@/app/components/MusicItem";
import PageLoading from "@/app/components/PageLoading";
import { axiosCustom } from "@/app/utils/config";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function SinglePlayList() {
  const { id } = useParams();
  const {
    data: playListdata,
    error,
    isLoading,
  } = useSWR<any>(["playlists", id], ([url, id]) =>
    axiosCustom.get(`${url}/${id}`).then((res) => res.data)
  );
  if (!playListdata) return <PageLoading />;
  return (
    <>
      <h1 className="text-5xl  font-bold text-gray-200 mb-9">
        Musics in {playListdata.name} :
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {playListdata.musics.map((ms: any) => (
          <MusicItem musicObject={ms} key={ms.id} />
        ))}
      </section>
    </>
  );
}
