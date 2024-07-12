"use client";
import MusicItem from "@/app/components/MusicItem";
import { axiosCustom } from "@/app/utils/config";
import useSWR from "swr";

export default function SearchResult({ searchParams }: { searchParams: any }) {
  const { data: matchedMusics } = useSWR<any>(
    [
      "search",
      searchParams.music_name,
      searchParams.singer_name,
      searchParams.text,
      searchParams.genre,
    ],
    ([url, music_name, singer_name, text, genre]) =>
      axiosCustom
        .get(
          `${url}?music_name=${music_name}&singer_name=${singer_name}&text=${text}&genre=${genre}`
        )
        .then((res) => res.data)
  );

  return (
    <>
      <h1 className="text-5xl  font-bold text-gray-200 mb-9">Search Result</h1>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {matchedMusics?.map((ms: any) => (
          <MusicItem musicObject={ms} key={ms.id} />
        ))}
      </section>
    </>
  );
}
