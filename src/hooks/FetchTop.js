import { useEffect } from "react";

const USERNAME = "amksomani";
const API_KEY = "80f6445a8f5cb6abcde40082838af940";

function useFetchTop(count, list, setList, property) {
  useEffect(() => {
    if (property === "Track") {
      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=${USERNAME}&api_key=${API_KEY}&limit=${count}&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          setList(
            data.toptracks.track.map((track) => ({
              artist: track.artist.name,
              track: track.name,
              playcount: track.playcount,
              duration: track.duration,
            }))
          );
        });
    } else {
      fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getTopArtists&user=${USERNAME}&api_key=${API_KEY}&limit=${count}&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          setList(
            data.topartists.artist.map((artist) => ({
              artist: artist.name,
              playcount: artist.playcount,
              genre: artist.genre,
            }))
          );
        });
    }
  }, [count, property]);
}

export { useFetchTop };
