"use client";
import { axiosCustom } from "@/app/utils/config";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PlaylistItem from "../../playlists/components/PlaylistItem";
import AlbumItem from "@/app/components/AlbumItem";
import useSWR from "swr";

export default function SingerSingle() {
  const { id } = useParams();
  const {
    data: albums,
    error,
    isLoading,
  } = useSWR<any>(["singer/album", id], ([url, id]) =>
    axiosCustom.get(`${url}/${id}`).then((res) => res.data)
  );
  return (
    <>
      <div className="flex items-center justify-between mb-9">
        <h1 className="text-5xl  font-bold text-gray-200 ">
          Albums of Singer {albums?.[0]?.singer_name}
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {albums?.map((l: any) => {
          return <AlbumItem key={l.id} item={l} />;
        })}
      </div>
    </>
  );
}
