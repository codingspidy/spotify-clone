import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import spotifyApi from "../lib/spotify";

function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // We have to set access token before every call to spotify API for data.
      spotifyApi.setAccessToken(session.user.accessToken);

      // If refresh access token attempt fails, direct user to login...
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }
    }
  }, [session]);

  return spotifyApi;
}

export default useSpotify;
