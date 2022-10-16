import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Center = () => {
  const { data: session, status } = useSession();
  const [color, setColor] = useState(null);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [currentPlaylist, setCurrentPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => setCurrentPlaylist(data))
      .catch((err) => console.log(err));
  }, [playlistId, spotifyApi, setCurrentPlaylist]);

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8 text-white">
        <div onClick={() => signOut({callbackUrl: "/login"})} className="flex items-center bg-black opacity-90 hover:opacity-80 space-x-3 cursor-pointer rounded-full p-1 pr-2">
          {session && (
            <img
              className="h-10 w-10 rounded-full"
              width={100}
              height={100}
              src={session.user.image}
              alt="user"
            />
          )}
          <h2>{session && session.user.name}</h2>
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 h-80 p-8 bg-black bg-gradient-to-b ${color} to-black `}
      >
        <div>
          <img
            className="w-36 h-36 lg:w-44 lg:h-44 shadow-2xl"
            src={currentPlaylist?.body?.images[0]?.url}
            width={200}
            height={200}
            alt="playlist"
          />
        </div>
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {currentPlaylist?.body?.name}
          </h1>
        </div>
      </section>
      <section>
       <Songs />
      </section>
    </div>
  );
};

export default Center;
