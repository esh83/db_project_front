"use client";

import Modal from "@/app/components/Modal";
import { axiosCustom } from "@/app/utils/config";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { MdAddCircleOutline } from "react-icons/md";
import PlaylistItem from "./components/PlaylistItem";
import useSWR from "swr";

export default function PlayLists() {
  const [show, setShow] = useState(false);
  const {
    data: list,
    error,
    mutate,
    isLoading,
  } = useSWR<any>(["playlist/user"], ([url]) =>
    axiosCustom.get(url).then((res) => res.data)
  );

  const [newPlayListName, setNewPlayListName] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPlayListName === "") return;
    try {
      const res = await axiosCustom.post("addplaylist", {
        playlist_name: newPlayListName,
      });
      toast.success("created successfully");
      mutate();
    } catch (err) {
      toast.error("error in creating playlist");
    } finally {
      setShow(false);
    }
  };
  return (
    <>
      <Modal
        setShowModal={setShow}
        showModal={show}
        title="create new playlist"
        body={
          <form
            className="flex flex-col items-center w-96"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              value={newPlayListName}
              onChange={(e) => setNewPlayListName(e.target.value)}
              type="text"
              className="w-full bg-transparent border-2 border-gray-300 rounded-lg p-2 outline-none"
              placeholder="enter playlist name ..."
            />
            <button
              type="submit"
              className="rounded-lg p-2  bg-indigo-500 mt-2 text-white"
            >
              create
            </button>
          </form>
        }
      />
      <div className="flex items-center justify-between mb-9">
        <h1 className="text-5xl  font-bold text-gray-200 ">Your Playlists</h1>
        <button
          className="px-4 py-3 bg-white rounded-lg flex items-center space-x-1"
          onClick={() => setShow(true)}
        >
          <span>create new playlist</span>
          <MdAddCircleOutline size={18} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {list?.map((l: any) => {
          return (
            <PlaylistItem
              id={l.id}
              image_url={l.image_url}
              is_public={l.is_public}
              name={l.name}
              owner_id={l.owner_id}
              key={l.id}
            />
          );
        })}
      </div>
    </>
  );
}
