"use client";

import { axiosCustom } from "@/app/utils/config";
import ProfileCard from "./components/ProfileCard";
import useSWR from "swr";

export default function Singers() {
  const {
    data: singers,
    error,
    isLoading,
  } = useSWR<any>(["singers"], ([url]) =>
    axiosCustom.get(url).then((res) => res.data)
  );

  return (
    <>
      <h1 className="text-5xl  font-bold text-gray-200 mb-9">
        Singers On Musicify
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {singers?.map((s: any) => (
          <ProfileCard key={s.id} personInfo={s} />
        ))}
      </section>
    </>
  );
}
