"use client";

import { axiosCustom } from "@/app/utils/config";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MusicRowItem from "../components/MusicRowitem";

export default function AlbumSingle() {
  const { id } = useParams();
  const [album, setAlbum] = useState<any>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosCustom.get(`album/${id}`);
        console.log(res);
        setAlbum(res.data);
      } catch (err) {
        console.log(err);
        setAlbum([]);
      }
    })();
  }, [id]);
  return (
    <>
     <h1 className="text-5xl  font-bold text-gray-200 mb-9">
        Musics Of Album {album[0]?.name}
      </h1>
    <div className="my-10 mx-2 h-72 overflow-y-auto md:h-full md:overflow-hidden bg-gray-800">
      <table className="w-full cursor-default">
        <thead>
          <tr className="flex justify-around items-center text-gray-400 border-b border-gray-400 border-opacity-30 uppercase h-8">
            <th className="text-md">
              #<span className="text-xs ml-2">Title</span>
            </th>
            <th className="text-xs">Album</th>
            <th className="text-xs">Date Added</th>
            <th className="">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M7.999 3H6.999V7V8H7.999H9.999V7H7.999V3ZM7.5 0C3.358 0 0 3.358 0 7.5C0 11.642 3.358 15 7.5 15C11.642 15 15 11.642 15 7.5C15 3.358 11.642 0 7.5 0ZM7.5 14C3.916 14 1 11.084 1 7.5C1 3.916 3.916 1 7.5 1C11.084 1 14 3.916 14 7.5C14 11.084 11.084 14 7.5 14Z"
                  fill="currentColor"
                ></path>
              </svg>
            </th>
          </tr>
        </thead>
        <tbody>
          {album[0]?.musics?.map((d: any) => {
            return (
              <MusicRowItem key={d.id} albumname={album[0].name} data={d} />
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  );
}
