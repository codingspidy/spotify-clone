import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom"
import Song from "./Song";

const Songs = () => {
    const playlist = useRecoilValue(playlistState);

    return (  
        <div className="px-8 flex flex-col space-y-1 pb-8 text-white">
            {playlist?.body.tracks.items.map((track, i) => {
                return <Song key={track.track.id} track={track} order={i} />;
               
            })}
        </div>
    )
}

export default Songs;