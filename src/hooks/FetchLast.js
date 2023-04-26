import { useEffect } from "react";

const USERNAME = "amksomani";
const API_KEY = "80f6445a8f5cb6abcde40082838af940";

function useFetchLast(count, list, setList) {
  useEffect(() => {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${USERNAME}&api_key=${API_KEY}&limit=${count}&format=json`)
      .then(response => response.json())
      .then(data => {
        setList(data.recenttracks.track.map(track => ({
          artist: track.artist["#text"],
          track: track.name,
          album: track.album["#text"],
        }
        )));
      });
  }, [count, list, setList]);
}

export { useFetchLast };