"use client";

import { axiosCustom } from "@/app/utils/config";
import { useEffect, useState } from "react";
import ProfileCard from "./components/ProfileCard";

export default function Singers() {
  const [singers, setSingers] = useState<any>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosCustom.get("singers");
        console.log(res);
        setSingers(res.data);
      } catch (err) {
        console.log(err);
        setSingers([]);
      }
    })();
  }, []);
  return (
    <>
      <h1 className="text-5xl  font-bold text-gray-200 mb-9">
        Singers On Musicify
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {singers.map((s: any) => (
          <ProfileCard key={s.id} personInfo={s} />
        ))}
      </section>
    </>
  );
}
