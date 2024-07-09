import MusicItem from "@/app/components/MusicItem";

export default function Albums(){

    return (
        <div className="grid grid-cols-3 gap-2">
            <MusicItem />
            <MusicItem />
            <MusicItem />
            <MusicItem />
        </div>
    )
}