import { useEffect, useState } from "react";
import { axiosCustom } from "../utils/config";
import Modal from "./Modal";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function CommentsModal({
  showModal,
  setShowModal,
  musicId,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  musicId: number;
}) {
  const [inputText, setInputText] = useState("");

  const {
    data: commentsList,
    error,
    isLoading,
    mutate,
  } = useSWR<any>(["comments", musicId], ([url, id]) =>
    axiosCustom.get(`${url}/${id}`).then((res) => res.data)
  );

  const hanldeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText === "") return;
    try {
      const res = await axiosCustom.post(`comment`, {
        text: inputText,
        music_id: musicId,
      });
      toast.success("comment submitted");
      mutate();
    } catch (error) {
      console.log(error);
      toast.error("failed");
    }
  };
  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title="comments"
      body={
        <div className="w-96">
          <form className="flex space-x-2" onSubmit={(e) => hanldeSubmit(e)}>
            <input
              type="text"
              placeholder="enter your comment"
              className="outline-none border rounded p-2 flex-1"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              type="submit"
              className="rounded p-3 text-white bg-indigo-500"
            >
              submit
            </button>
          </form>

          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            {commentsList?.map((c: any) => {
              return (
                <div key={c.id} className="bg-gray-100 p-2 my-2">
                  <div className="flex justify-between border-b border-b-gray-300 pb-2">
                    <span>{c.username}</span>
                    <span>
                      {c.time.split("T")[0]} {c.time.split("T")[1].slice(0, 8)}
                    </span>
                  </div>
                  <p className="pt-2">{c.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      }
    />
  );
}
