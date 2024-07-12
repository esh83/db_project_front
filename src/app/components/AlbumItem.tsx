import Link from "next/link";
import Image from "next/image";

export default function AlbumItem({ item }: { item: any }) {
  return (
    <Link
      className="hover:bg-gray-700 delay-50 duration-100 bg-gray-800 p-5 rounded-lg w-full group"
      href={`/albums/${item.id}`}
    >
      <Image
        src={item.image_url ?? "/img/music.jpg"}
        className="w-full max-h-60 rounded shadow"
        alt="image"
        width={200}
        height={200}
      />

      <h3 className="text-gray-200 font-bold mt-5">{item.name}</h3>
      <p className="text-gray-400 font-light mt-2 text-xs">
        {" "}
        Your daily update of the most played track from around the world...
      </p>
    </Link>
  );
}
