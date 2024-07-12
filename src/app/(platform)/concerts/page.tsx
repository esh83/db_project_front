"use client";
import { axiosCustom, isAuth } from "@/app/utils/config";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function Concerts() {
  const { data: concerts, mutate } = useSWR<any>(["concerts"], ([url]) =>
    axiosCustom.get(url).then((res) => res.data)
  );
  
  const buyTicket = async (concertId: number) => {
    try {
      const res = await axiosCustom.post("ticket/buy", {
        concert_id: concertId,
      });
      toast.success("buy successfully");
      mutate();
    } catch (error) {
      console.log(error);
      toast.error("error happened buying a ticket");
    }
  };
  const suspend = async (concertId: number) => {
    try {
      const res = await axiosCustom.post("concert/suspend", {
        concert_id: concertId,
      });
      toast.success("suspended successfully");
      mutate();
    } catch (error) {
      console.log(error);
      toast.error("error happened in suspending");
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Concert List
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Here is the list of concerts of different singers If . the concert
            get suspended your money will backdrawed
          </p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Singer
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Ticket Price
            </th>
            <th scope="col" className="px-6 py-3">
              Is Suspended
            </th>
            <th scope="col" className="px-6 py-3">
              Ticket Buy Count
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {concerts?.map((c: any) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={c.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {c.singer_name}
                </th>
                <td className="px-6 py-4">{c.date}</td>
                <td className="px-6 py-4">{c.price}</td>
                <td className="px-6 py-4">{c.has_suspended ? "Yes" : "No"}</td>
                <td className="px-6 py-4">{c.ticket_count}</td>
                <td className="px-6 py-4 text-right flex space-x-2">
                  <button
                    onClick={() => buyTicket(c.id)}
                    disabled={c.has_suspended}
                    className="font-medium text-blue-600 dark:text-blue-500 enabled:hover:underline disabled:opacity-50"
                  >
                    Buy
                  </button>

                  {c.singer_id == (isAuth() as any)?.id && !c.has_suspended ? (
                    <button
                      onClick={() => suspend(c.id)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      suspend
                    </button>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
