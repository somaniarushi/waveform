import './breezy.css';
import { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const USERNAME = "amksomani";
const API_KEY = "80f6445a8f5cb6abcde40082838af940";

const globalStyles = {
  fontFamily: '"Saira", sans-serif'
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [listOfLastTen, setListOfLastTen] = useState([]);
  const [listOfTopTenTracks, setListOfTopTenTracks] = useState([]);
  const [listOfTopTenArtists, setListOfTopTenArtists] = useState([]);
  useEffect(() => {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${USERNAME}&api_key=${API_KEY}&limit=10&format=json`)
      .then(response => response.json())
      .then(data => {
        setListOfLastTen(data.recenttracks.track.map(track => ({
          artist: track.artist["#text"],
          track: track.name,
          album: track.album["#text"],
        }
        )));
      });
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=${USERNAME}&api_key=${API_KEY}&limit=10&format=json`)
      .then(response => response.json())
      .then(data => {
        setListOfTopTenTracks(data.toptracks.track.map(track => ({
          artist: track.artist.name,
          track: track.name,
          playcount: track.playcount,
          duration: track.duration,
        }
        )));
      });
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getTopArtists&user=${USERNAME}&api_key=${API_KEY}&limit=10&format=json`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setListOfTopTenArtists(data.topartists.artist.map(artist => ({
          artist: artist.name,
          playcount: artist.playcount,
        }
        )));
      });
  }, []);

  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        maxWidth: '100vw'
      }}>
        <Typography variant="h2" component="h2" sx={{
          paddingBottom: '20px',
          paddingTop: '30px',
          fontWeight: '600',
          ...globalStyles
        }}>
          <span style={{
            color: 'rgba(0, 162, 255, 0.801)'
          }}>AMKS's{"  "}
          </span>
          Waveform
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '200px',
        paddingTop: '0',
        maxWidth: '100vw'
      }}>
        <TopTenTracksBarChart listOfTopTen={listOfTopTenTracks} />
        <TopTenArtistsBarChart listOfTopTen={listOfTopTenArtists} />
        <LastTenList listOfLastTen={listOfLastTen} />
        <TopTenList listOfTopTen={listOfTopTenTracks} />
      </Box>
    </>
  );
}

function TopTenArtistsBarChart({ listOfTopTen }) {
  return (
    <Box style={{ paddingBottom: '20px' }}>
      <Typography variant="h4" style={{ paddingBottom: '10px', ...globalStyles }}>Top Ten Artists</Typography>
      <Bar
        data={{
          labels: listOfTopTen.map(artist => artist.artist),
          datasets: [
            {
              label: 'Playcount',
              backgroundColor: 'rgba(0, 162, 255, 0.801)',
              borderColor: 'rgba(0, 162, 255, 0.801)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(0, 162, 255, 0.801)',
              hoverBorderColor: 'rgba(0, 162, 255, 0.801)',
              data: listOfTopTen.map(artist => artist.playcount)
            }
          ]
        }}
        />
      </Box>
  )
}

function TopTenTracksBarChart({ listOfTopTen }) {
  return (
    <Box style={{ paddingBottom: '20px' }}>
      <Typography variant="h4" style={{ paddingBottom: '10px', ...globalStyles }}>Top Ten Songs</Typography>
      <Bar
        data={{
          labels: listOfTopTen.map(track => track.track),
          datasets: [
            {
              label: 'Play Minutes',
              backgroundColor: 'rgba(255, 0, 0, 0.801)',
              borderColor: 'rgba(255, 0, 0, 0.801)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255, 0, 0, 0.801)',
              hoverBorderColor: 'rgba(255, 0, 0, 0.801)',
              data: listOfTopTen.map(track => ((track.duration * track.playcount) / 60))
            },
            {
              label: 'Playcount',
              backgroundColor: 'rgba(0, 162, 255, 0.801)',
              borderColor: 'rgba(0, 162, 255, 0.801)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(0, 162, 255, 0.801)',
              hoverBorderColor: 'rgba(0, 162, 255, 0.801)',
              data: listOfTopTen.map(track => track.playcount)
            },
          ]
        }}
      />
    </Box>
  );
}

function TopTenList({ listOfTopTen }) {
  return (
    <Box>
      <Typography variant="h4" style={{ paddingBottom: '10px', ...globalStyles }}>Top Ten Songs</Typography>
      <Table>
        <TableHead sx={{ background: '#111' }}>
          <TableRow>
            <TableCell sx={{ color: 'white', ...globalStyles }}>Artist</TableCell>
            <TableCell sx={{ color: 'white', ...globalStyles }}>Track</TableCell>
            <TableCell sx={{ color: 'white', ...globalStyles }}>Playcount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listOfTopTen.map(track => (
            <TableRow>
              <TableCell sx={{ ...globalStyles }}>{track.artist}</TableCell>
              <TableCell sx={{ ...globalStyles }}>{track.track}</TableCell>
              <TableCell sx={{ ...globalStyles }}>{track.playcount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

function LastTenList({ listOfLastTen }) {
  return (
    <Box style={{ paddingBottom: '20px' }}>
      <Typography variant="h4" style={{ paddingBottom: '10px', ...globalStyles }}>Last Ten Songs</Typography>
      <Table>
        <TableHead sx={{ background: '#111' }}>
          <TableRow>
            <TableCell sx={{ color: 'white', ...globalStyles }}>Artist</TableCell>
            <TableCell sx={{ color: 'white', ...globalStyles }}>Track</TableCell>
            <TableCell sx={{ color: 'white', ...globalStyles }}>Album</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listOfLastTen.map(track => (
            <TableRow>
              <TableCell sx={{ ...globalStyles }}>{track.artist}</TableCell>
              <TableCell sx={{ ...globalStyles }}>{track.track}</TableCell>
              <TableCell sx={{ ...globalStyles }}>{track.album}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default App;
