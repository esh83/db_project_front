"use client";
import { useEffect, useState } from "react";
import MusicItem from "../components/MusicItem";
import { axiosCustom } from "../utils/config";
import PlayMusic from "../components/PlayMusic";

export default function Home() {
  const [suggestedMusics, setSuggestedsMusics] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosCustom.get("userpredictions");
        console.log(res);
        setSuggestedsMusics(res.data);
      } catch (err) {
        setSuggestedsMusics([]);
      }
    })();
  }, []);
  return (
    <>
      <PlayMusic />
      <h1 className="text-5xl  font-bold text-gray-200 mb-9">Made for you</h1>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {suggestedMusics.map((ms: any) => (
          <MusicItem musicObject={ms} key={ms.id} />
        ))}
      </section>
    </>
  );
}
