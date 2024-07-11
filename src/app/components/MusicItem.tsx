import Image from "next/image";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdPlayCircleFilled,
  MdPlaylistAdd,
  MdPlaylistAddCheck,
} from "react-icons/md";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { axiosCustom } from "../utils/config";
import toast from "react-hot-toast";

export default function MusicItem({ musicObject }: { musicObject: any }) {
  const [show, setShow] = useState(false);
  const [playlists, setPlayLists] = useState([]);
  const [islike, setIsLike] = useState(musicObject?.liked ?? false);
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosCustom.get("playlist/user");
        setPlayLists(res.data);
      } catch (err) {
        setPlayLists([]);
      }
    })();
  }, [show]);
  const handleAddToPlayList = async (playlistId: number) => {
    try {
      const res = await axiosCustom.post("addtoplaylist", {
        playlist_id: playlistId,
        music_id: musicObject.id,
      });
      toast.success("added to play list");
    } catch (err) {
      toast.error("failed to add to paylist");
    }
  };
  const hanldeLike = async () => {
    if (!islike) {
      try {
        const res = await axiosCustom.post("musics/like", {
          music_id: musicObject.id,
        });
        setIsLike(true);
      } catch (err) {
        setIsLike(false);
        console.log(err);
      }
    } else {
      try {
        const res = await axiosCustom.delete("musics/like", {
          data: {
            music_id: musicObject.id,
          },
        });
        setIsLike(false);
      } catch (err) {
        setIsLike(true);
      }
    }
  };
  return (
    <>
      <Modal
        showModal={show}
        setShowModal={setShow}
        title="choose a playlist"
        body={
          <div className="flex flex-col space-y-2 w-80 items-start">
            {playlists?.length &&
              playlists.map((pl: any) => (
                <button
                  onClick={() => {
                    handleAddToPlayList(pl.id);
                    setShow(false);
                  }}
                  key={pl.id}
                  className=" text-gray-500 border-b pb-2 block w-full text-left"
                >
                  {pl.name}
                </button>
              ))}
          </div>
        }
      />
      <div className="bg-gray-900 shadow-lg rounded p-3">
        <div className="group relative">
          <Image
            className="w-full h-full max-h-60 object-cover block rounded"
            src={musicObject.image_url ?? "/img/music.png"}
            alt="music image"
            width={300}
            height={300}
          />
          <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
            <button
              onClick={() => hanldeLike()}
              className={`hover:scale-110 ${
                islike ? "text-red-500" : "text-white"
              } opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition`}
            >
              {islike ? (
                <MdFavorite size={30} />
              ) : (
                <MdFavoriteBorder size={30} />
              )}
            </button>

            <button className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              <MdPlayCircleFilled size={50} />
            </button>

            <button
              onClick={() => setShow(true)}
              className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
            >
              <MdPlaylistAdd size={30} />
            </button>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-white text-lg">{musicObject.name}</h3>
          <p className="text-gray-400">{musicObject.singer_name}</p>
        </div>
      </div>
    </>
  );
}
