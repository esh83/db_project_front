import { musicPlayCtx } from "@/app/context/MusicPlayProvider";
import { useContext } from "react";
import Image from "next/image";
export default function MusicRowItem({
  data,
  albumname,
}: {
  data: any;
  albumname: any;
}) {
  const [music, setMusic] = useContext(musicPlayCtx);
  return (
    <tr
      onClick={() => setMusic(data)}
      className="flex cursor-pointer justify-around items-center text-gray-400 m-2 font-mono hover:bg-gray-200 hover:bg-opacity-10 rounded-md py-2"
    >
      <td className="flex justify-center items-center">
        <p className="mr-2">1</p>
        <Image
          src={data.image_url ?? "/img/music.jpg"}
          alt="dead girl song poster"
          height={50}
          width={50}
        />
        <div className="ml-3">
          <p className="text-white font-semi-bold">{data.name}</p>
          <a className="text-xs text-gray-400 hover:text-white hover:cursor-pointer">
            <span>{data.singer_name}</span>
          </a>
        </div>
      </td>
      <td className="text-sm">{albumname}</td>
      <td className="text-sm">5 days ago</td>
      <td className="text-sm">3:14</td>
    </tr>
  );
}
