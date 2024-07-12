"use client";

import { axiosCustom } from "@/app/utils/config";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function Chat() {
  const { data: accountInfo } = useSWR<any>(["account"], ([url]) =>
    axiosCustom.get(url).then((res) => res.data)
  );
  const { data: friendsList } = useSWR<any>(["chatfriends"], ([url]) =>
    axiosCustom.get(url).then((res) => res.data)
  );
  const [selectedChatUserID, setSelectedChatUserId] = useState<any>(null);
  const {
    data: chatMessages,
    mutate,
    error,
  } = useSWR<any>(
    selectedChatUserID ? ["chat", selectedChatUserID] : null,
    ([url, id]) => axiosCustom.get(`${url}/${id}`).then((res) => res.data),
    { refreshInterval: 1000 }
  );
  const [messageText, setMessageText] = useState("");
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setTimeout(() => {
      lastItemRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [selectedChatUserID , chatMessages]);
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedChatUserID) {
      toast.error("select a chat first");
      return;
    }
    if (messageText === "") return;
    try {
      const res = await axiosCustom.post("message", {
        text: messageText,
        reciever_id: selectedChatUserID,
      });
      toast.success("message sent");
      setMessageText("");
      mutate();
      setTimeout(() => {
        lastItemRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      toast.error("failed to send message");
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <Link href={"/"} className="ml-2 font-bold text-2xl">
              Musicify
            </Link>
          </div>
          <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div className="h-20 w-20 rounded-full border overflow-hidden">
              <img
                src={accountInfo?.image_url ?? "/img/profile.png"}
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            <div className="text-sm font-semibold mt-2">
              {accountInfo?.username}
            </div>
            <div className="text-xs text-gray-500">{accountInfo?.email}</div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Your Friends</span>
            </div>

            <div className="flex flex-col space-y-1 mt-4 -mx-2 h-80 overflow-y-auto ">
              {friendsList?.map((f: any) => {
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedChatUserId(f.id)}
                    className={`flex flex-row items-center hover:bg-gray-100 ${
                      selectedChatUserID === f.id && "bg-gray-200"
                    } rounded-xl p-2`}
                  >
                    <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                      {f.username?.slice(0, 1)?.toUpperCase()}
                    </div>
                    <div className="ml-2 text-sm font-semibold">
                      {f.username}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  {chatMessages?.map((cm: any, i: any) => {
                    if (cm.sender_id !== accountInfo.id)
                      return (
                        <div
                          ref={
                            i === chatMessages.length - 1 ? lastItemRef : null
                          }
                          className="col-start-1 col-end-8 p-3 rounded-lg"
                          key={i}
                        >
                          <div className="flex flex-row items-center">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                              {cm.username?.slice(0, 1)?.toUpperCase()}
                            </div>
                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                              <div
                                dangerouslySetInnerHTML={{ __html: cm.text }}
                                className="break-words max-w-96"
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    else
                      return (
                        <div
                          ref={
                            i === chatMessages.length - 1 ? lastItemRef : null
                          }
                          className="col-start-6 col-end-13 p-3"
                          key={i}
                        >
                          <div className="flex items-center justify-start flex-row-reverse">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                              {accountInfo?.username
                                ?.slice(0, 1)
                                ?.toUpperCase()}
                            </div>
                            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                              <div
                                dangerouslySetInnerHTML={{ __html: cm.text }}
                                className="break-words max-w-96"
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                  })}
                </div>
              </div>
            </div>
            <form
              onSubmit={(e) => sendMessage(e)}
              className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
            >
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    type="text"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button
                  type="submit"
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
