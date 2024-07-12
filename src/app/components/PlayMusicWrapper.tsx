import { useContext } from "react";
import { musicPlayCtx } from "../context/MusicPlayProvider";
import PlayMusic from "./PlayMusic";

export default function PlayMusicWrapper() {
  const ctx = useContext(musicPlayCtx);

  return <>{ctx && ctx[0] ? <PlayMusic /> : null}</>;
}
