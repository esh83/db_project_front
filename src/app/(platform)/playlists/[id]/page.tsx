"use client";
import MusicItem from "@/app/components/MusicItem";
import PageLoading from "@/app/components/PageLoading";
import { axiosCustom } from "@/app/utils/config";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SinglePlayList() {
  const { id } = useParams();
  const [playListdata, setPlaylistData] = useState<any>(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosCustom.get(`playlists/${id}`);
        console.log(res);
        setPlaylistData(res.data);
      } catch (err) {
        setPlaylistData(null);
      }
    })();
  }, [id]);
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
