
export default function MusicRowItem({
  data,
  albumname,
}: {
  data: any;
  albumname: any;
}) {
  return (
    <tr className="flex justify-around items-center text-gray-400 m-2 font-mono hover:bg-gray-200 hover:bg-opacity-10 rounded-md py-2">
      <td className="flex justify-center items-center">
        <p className="mr-2">1</p>
        <img
          src={data.image_url ?? "/img/music.png"}
          alt="dead girl song poster"
          height="50px"
          width="50px"
        />
        <div className="ml-3">
          <p className="text-white font-semi-bold">{data.name}</p>
          <a className="text-xs text-gray-400 hover:text-white hover:cursor-pointer">
            <span>{data.singer_name}</span>
          </a>
        </div>
      </td>
      <td className="text-sm">{albumname}</td>
      <td className="text-sm">5 days ago</td>
      <td className="text-sm">3:14</td>
    </tr>
  );
}
