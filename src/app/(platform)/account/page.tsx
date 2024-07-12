"use client";

import { axiosCustom } from "@/app/utils/config";
import useSWR from "swr";
import ProfileCard from "../singers/components/ProfileCard";
import toast from "react-hot-toast";
import { MdAdd } from "react-icons/md";
import { FormEvent, useState } from "react";
import Modal from "@/app/components/Modal";

export default function Account() {
  const [showDeposit, setShowDesposit] = useState(false);
  const [depositPrice, setDepositPrice] = useState("");
  const { data: followings } = useSWR<any>(["followings"], ([url]) =>
    axiosCustom.get(url).then((res) => res.data)
  );
  const { data: followers } = useSWR<any>(["followers"], ([url]) =>
    axiosCustom.get(url).then((res) => res.data)
  );
  const { data: accountInfo, mutate: mutateAccount } = useSWR<any>(
    ["account"],
    ([url]) => axiosCustom.get(url).then((res) => res.data)
  );
  const { data: friends, mutate: mutateFiends } = useSWR<any>(
    ["friends"],
    ([url]) => axiosCustom.get(url).then((res) => res.data)
  );

  const acceptFriendRequest = async (
    e: React.MouseEvent<HTMLButtonElement>,
    sender_id: any
  ) => {
    e.preventDefault();
    try {
      const res = await axiosCustom.post("acceptfriendship", { sender_id });
      toast.success("accepted");
      mutateFiends();
    } catch (err) {
      console.log(err);
      toast.error("failed to accept");
    }
  };

  const handleSubmitDeposit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (depositPrice === "") return;
    try {
      const res = await axiosCustom.post("deposit", {
        money: Number(depositPrice),
      });
      toast.success("deposited successfully");
      mutateAccount();
    } catch (err) {
      toast.error("error in deposit money");
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        setShowModal={setShowDesposit}
        showModal={showDeposit}
        title="desposit some money"
        body={
          <form
            className="flex flex-col items-center w-96"
            onSubmit={(e) => handleSubmitDeposit(e)}
          >
            <input
              value={depositPrice}
              onChange={(e) => setDepositPrice(e.target.value)}
              type="text"
              className="w-full bg-transparent border-2 border-gray-300 rounded-lg p-2 outline-none"
              placeholder="enter money you want to deposit"
            />
            <button
              type="submit"
              className="rounded-lg p-2  bg-indigo-500 mt-2 text-white"
            >
              deposit
            </button>
          </form>
        }
      />

      <div className="flex flex-col">
        <div className="bg-white shadow p-5 rounded-xl flex flex-col ">
          <div className="flex justify-between items-center bg-gray-200 py-3 px-3">
            <span>username</span>
            <span>{accountInfo?.username}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-100 py-3 px-3">
            <span>email</span>
            <span>{accountInfo?.email}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-200 py-3 px-3">
            <span>address</span>
            <span>{accountInfo?.address}</span>
          </div>
          <div className="flex justify-between items-center bg-gray-100 py-3 px-3">
            <span>money</span>
            <span className="flex items-center space-x-1">
              <span>{accountInfo?.money}$</span>

              <button
                className="text-green-500"
                onClick={() => setShowDesposit(true)}
              >
                <MdAdd />
              </button>
            </span>
          </div>
          <div className="flex justify-between items-center bg-gray-200 py-3 px-3">
            <span>has membership</span>
            <span>{accountInfo?.has_membership ? "Yes" : "No"}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 my-3 gap-3">
          <div className="bg-white shadow p-5 rounded-xl flex flex-col space-y-3">
            <strong className="text-xl">Following</strong>
            {followings?.map((f: any) => {
              return <ProfileCard key={f.id} personInfo={f} />;
            })}
          </div>
          <div className="bg-white shadow p-5 rounded-xl flex flex-col space-y-3">
            <strong className="text-xl">Followers</strong>
            {followers?.map((f: any) => {
              return <ProfileCard key={f.id} personInfo={f} />;
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 my-3 gap-3">
          <div className="bg-white shadow p-5 rounded-xl flex flex-col space-y-3">
            <strong className="text-lg">outgoing friend request pending</strong>
            {friends
              ?.filter((f: any) => f.type === 0)
              ?.map((f: any) => {
                return (
                  <div
                    key={f.reciever_id}
                    className="flex flex-wrap items-center space-x-5"
                  >
                    <span>From</span>
                    <span className="text-indigo-800">{f.sender_name}</span>
                    <span>To</span>
                    <span className="text-indigo-800">{f.reciever_name}</span>
                  </div>
                );
              })}
          </div>
          <div className="bg-white shadow p-5 rounded-xl flex flex-col space-y-3">
            <strong className="text-lg">
              outgoing friend request accepted
            </strong>
            {friends
              ?.filter((f: any) => f.type === 1)
              ?.map((f: any) => {
                return (
                  <div
                    key={f.reciever_id}
                    className="flex items-center flex-wrap space-x-5"
                  >
                    <span>From</span>
                    <span className="text-indigo-800">{f.sender_name}</span>
                    <span>To</span>
                    <span className="text-indigo-800">{f.reciever_name}</span>
                  </div>
                );
              })}
          </div>
          <div className="bg-white shadow p-5 rounded-xl flex flex-col space-y-3">
            <strong className="text-lg">incoming friend request pending</strong>
            {friends
              ?.filter((f: any) => f.type === 2)
              ?.map((f: any) => {
                return (
                  <div
                    key={f.reciever_id}
                    className="flex items-center flex-wrap space-x-5"
                  >
                    <span>From</span>
                    <span className="text-indigo-800">{f.sender_name}</span>
                    <span>To</span>
                    <span className="text-indigo-800">{f.reciever_name}</span>
                    <button
                      onClick={(e) => acceptFriendRequest(e, f.sender_id)}
                      className="p-2 bg-green-400 rounded"
                    >
                      accept
                    </button>
                  </div>
                );
              })}
          </div>
          <div className="bg-white shadow p-5 rounded-xl flex flex-col space-y-3">
            <strong className="text-lg">
              incoming friend request accepted
            </strong>
            {friends
              ?.filter((f: any) => f.type === 3)
              ?.map((f: any) => {
                return (
                  <div
                    key={f.reciever_id}
                    className="flex items-center flex-wrap space-x-5"
                  >
                    <span>From</span>
                    <span className="text-indigo-800">{f.sender_name}</span>
                    <span>To</span>
                    <span className="text-indigo-800">{f.reciever_name}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
