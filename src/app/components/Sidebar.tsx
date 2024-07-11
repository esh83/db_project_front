import Link from "next/link";
import {
  MdFavoriteBorder,
  MdLogout,
  MdOutlineHome,
  MdOutlinePerson2,
  MdOutlinePerson3,
  MdOutlinePerson4,
  MdOutlinePlaylistAdd,
  MdPerson,
  MdPerson2,
  MdPerson3,
  MdPersonOutline,
} from "react-icons/md";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
export default function Sidebar() {
  const path = usePathname();
  const links = [
    {
      title: "Home",
      path: "/",
      icon: <MdOutlineHome size={20} />,
    },
    {
      title: "Playlists",
      path: "/playlists",
      icon: <MdOutlinePlaylistAdd size={20} />,
    },
    {
      title: "liked musics",
      path: "/likedMusics",
      icon: <MdFavoriteBorder size={20} />,
    },
    {
      title: "singers list",
      path: "/singers",
      icon: <MdOutlinePerson2 size={20} />,
    },
  ];
  const router = useRouter();

  return (
    <nav className=" rounded-md w-72 h-screen flex-col justify-between fixed left-0z-10 ">
      <div className=" bg-white h-full border">
        <div className="flex  justify-center py-10 shadow-sm pr-4">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            className="w-14 w-14"
          />
          <div className="pl-2">
            <p className="text-2xl font-bold text-indigo-600">MUSIC</p>
            <span className="text-xs block text-gray-800">PLATFORM</span>
          </div>
        </div>
        <div className="pl-10">
          <ul className="space-y-8 pt-10">
            {links.map((l) => {
              return (
                <li
                  className={`flex space-x-4 items-center hover:text-indigo-600 cursor-pointer ${
                    path.split("/")[1] === l.path.slice(1) && "text-indigo-600"
                  }`}
                  key={l.path}
                >
                  {l.icon}
                  <Link href={l.path}>{l.title}</Link>
                </li>
              );
            })}
            <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
              <MdLogout size={20} />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  Cookies.remove("token");
                  router.replace("/login");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
