import './breezy.css';
import { useState } from 'react';
import { Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
} from 'chart.js';
import { useFetchLast } from './hooks/FetchLast';
import { useFetchTop } from './hooks/FetchTop';

import PageTitle from './components/PageTitle';
import { TopTenArtistsBarChart, TopTenTracksBarChart } from './components/barCharts';
import { LastTenList, TopTenList } from './components/listCharts';
import { ClusterChartForTopHundred } from './components/clusterCharts';

const mainBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: '500px',
    paddingRight: '500px',
    paddingTop: '0',
    maxWidth: '100vw'
}

// Register point
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

function App() {


  const [listOfLastTen, setListOfLastTen] = useState([]);
  useFetchLast(10, listOfLastTen, setListOfLastTen);

  const [listofTopHundredTracks, setListofTopHundredTracks] = useState([]);
  useFetchTop(100, listofTopHundredTracks, setListofTopHundredTracks, "Track");

  const [listOfTopTenArtists, setListOfTopTenArtists] = useState([]);
  useFetchTop(10, listOfTopTenArtists, setListOfTopTenArtists, "Artist");

  const [listOfTopTenTracks, setListOfTopTenTracks] = useState([]);
  useFetchTop(10, listOfTopTenTracks, setListOfTopTenTracks, "Track");


  return (
    <>
      <PageTitle />
      <Box sx={mainBoxStyle}>
        <ClusterChartForTopHundred listOfTopHundred={listofTopHundredTracks} />
        <TopTenTracksBarChart listOfTopTen={listOfTopTenTracks} />
        <TopTenArtistsBarChart listOfTopTen={listOfTopTenArtists} />
        <LastTenList listOfLastTen={listOfLastTen} />
        <TopTenList listOfTopTen={listOfTopTenTracks} />
      </Box>
    </>
  );
}

export default App;
