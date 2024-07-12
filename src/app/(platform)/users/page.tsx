"use client";

import { axiosCustom } from "@/app/utils/config";
import ProfileCard from "../singers/components/ProfileCard";
import useSWR from "swr";

export default function Singers() {
  const { data: users } = useSWR<any>(["users"], ([url]) =>
    axiosCustom.get(url).then((res) => res.data)
  );

  return (
    <>
      <h1 className="text-5xl  font-bold text-gray-200 mb-9">
        Users On Musicify
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {users?.map((s: any) => (
          <ProfileCard isUser key={s.id} personInfo={s} />
        ))}
      </section>
    </>
  );
}
