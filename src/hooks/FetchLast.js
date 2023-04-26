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
      // eslint-disable-next-line
  }, [count]);
}

function useFetchFrequencies(days, list, setList) {
    // Return a list of frequencies of listens for each day
    // days: number of days to go back
    useEffect(() => {
        // fetch 10 pages of data
        let totalFrequencies = new Array(days).fill(0);
        // Go day by day and fetch songs for that day
        for (let i = 0; i < days; i++) {
            const startTimestamp = Math.floor(Date.now() / 1000) - (i + 1) * 86400;
            const endTimestamp = Math.floor(Date.now() / 1000) - i * 86400;
            fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${USERNAME}&api_key=${API_KEY}&from=${startTimestamp}&to=${endTimestamp}&limit=200&format=json`)
                .then(response => response.json())
                .then(data => {
                    totalFrequencies[i] = data.recenttracks.track.length;
                    });
        }
        setList(totalFrequencies);
        // eslint-disable-next-line
    }, [days]);
}

export { useFetchLast, useFetchFrequencies};