import Image from "next/image";
import Link from "next/link";

export default function PlaylistItem({
  id,
  image_url,
  name,
  is_public,
  owner_id,
}: {
  id: number;
  image_url: string;
  name: string;
  is_public: boolean;
  owner_id: number;
}) {

  return (
    <Link
      className="hover:bg-gray-700 delay-50 duration-100 bg-gray-800 p-5 rounded-lg w-full group"
      href={`/playlists/${id}`}
    >
      <Image
        src={image_url ?? "/img/music.jpg"}
        className="w-full max-h-60 rounded shadow"
        alt="image"
        width={200}
        height={200}
      />

      <h3 className="text-gray-200 font-bold mt-5">{name}</h3>

      {/* <p className="text-gray-400 font-light mt-2 text-xs">
        {" "}
        Your daily update of the most played track from around the world...
      </p> */}
    </Link>
  );
}
