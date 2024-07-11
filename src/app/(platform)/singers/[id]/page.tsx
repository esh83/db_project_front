"use client"
import { axiosCustom } from "@/app/utils/config";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PlaylistItem from "../../playlists/components/PlaylistItem";
import AlbumItem from "@/app/components/AlbumItem";

export default function SingerSingle() {
  const { id } = useParams();
  const [albums, setAlbums] = useState<any>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosCustom.get(`singer/album/${id}`);
        console.log(res);
        setAlbums(res.data);
      } catch (err) {
        console.log(err);
        setAlbums([]);
      }
    })();
  }, [id]);
  return (
    <>
      <div className="flex items-center justify-between mb-9">
        <h1 className="text-5xl  font-bold text-gray-200 ">
          Albums of Singer {albums[0]?.singer_name}
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {albums.map((l: any) => {
          return <AlbumItem key={l.id} item={l} />;
        })}
      </div>
    </>
  );
}
