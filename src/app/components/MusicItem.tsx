import Image from "next/image";
import {
  MdComment,
  MdCommentBank,
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineComment,
  MdOutlineModeComment,
  MdPlayCircleFilled,
  MdPlaylistAdd,
  MdPlaylistAddCheck,
} from "react-icons/md";
import Modal from "./Modal";
import { useContext, useEffect, useState } from "react";
import { axiosCustom } from "../utils/config";
import toast from "react-hot-toast";
import { musicPlayCtx } from "../context/MusicPlayProvider";
import CommentsModal from "./CommentsModal";
import useSWR, { useSWRConfig } from "swr";

export default function MusicItem({ musicObject }: { musicObject: any }) {
  console.log(musicObject);

  const [show, setShow] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { mutate } = useSWRConfig();
  const [music, setMusic] = useContext(musicPlayCtx);
  const {
    data: playlists,
    error,
    isLoading,
  } = useSWR<any>(["playlist/user"], ([url]) =>
    axiosCustom.get(url).then((res) => res.data)
  );
  const handleAddToPlayList = async (playlistId: number) => {
    try {
      const res = await axiosCustom.post("addtoplaylist", {
        playlist_id: playlistId,
        music_id: musicObject.id,
      });
      mutate(["playlists", playlistId]);
      toast.success("added to play list");
    } catch (err) {
      toast.error("failed to add to paylist");
      console.log(err);
    }
  };
  const hanldeLike = async () => {
    if (!musicObject.liked) {
      try {
        const res = await axiosCustom.post("musics/like", {
          music_id: musicObject.id,
        });
        mutate((key) => true);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axiosCustom.delete("musics/like", {
          data: {
            music_id: musicObject.id,
          },
        });
        mutate((key) => true);
      } catch (err) {}
    }
  };
  return (
    <>
      <CommentsModal
        showModal={showComments}
        setShowModal={setShowComments}
        musicId={musicObject.id}
      />
      <Modal
        showModal={show}
        setShowModal={setShow}
        title="choose a playlist"
        body={
          <div className="flex flex-col space-y-2 w-80 items-start">
            {playlists?.length
              ? playlists.map((pl: any) => (
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
                ))
              : null}
          </div>
        }
      />
      <div className="bg-gray-900 shadow-lg rounded p-3">
        <div className="group relative">
          <div className="h-60">
            <Image
              className="w-full h-full max-h-60 object-cover block rounded"
              src={musicObject.image_url ?? "/img/music.jpg"}
              alt="music image"
              width={300}
              height={300}
            />
          </div>
          <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
            <button
              onClick={() => hanldeLike()}
              className={`hover:scale-110 ${
                musicObject?.liked ? "text-red-500" : "text-white"
              } opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition`}
            >
              {musicObject?.liked ? (
                <MdFavorite size={30} />
              ) : (
                <MdFavoriteBorder size={30} />
              )}
            </button>

            <button
              onClick={() => setMusic(musicObject)}
              className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
            >
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
          <div className="flex justify-end">
            <button
              onClick={() => {
                setShowComments(true);
              }}
              className=" mt-1 p-1 rounded-full bg-sky-50 text-gray-800"
            >
              <MdOutlineModeComment />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
