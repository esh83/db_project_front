"use client";

import { createContext, useState } from "react";
export const musicPlayCtx = createContext<any>(null);
export default function MusicPlayProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [music, setMusic] = useState(null);
  return (
    <musicPlayCtx.Provider value={[music, setMusic]}>
      {children}
    </musicPlayCtx.Provider>
  );
}
