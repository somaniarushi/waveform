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
import { useFetchLast, useFetchFrequencies } from './hooks/FetchLast';
import { useFetchTop } from './hooks/FetchTop';

import PageTitle from './components/PageTitle';
import { TopTenArtistsBarChart, TopTenTracksBarChart, BarChartForFrequencies } from './components/barCharts';
import { LastTenList, TopTenList } from './components/listCharts';
import { ClusterChartForTopHundred } from './components/clusterCharts';

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

  const [listOfFrequencies, setListOfFrequencies] = useState([]);
  const count = 20;
  useFetchFrequencies(count, listOfFrequencies, setListOfFrequencies);


    /*
    Display the folllowing charts below:
    <ClusterChartForTopHundred listOfTopHundred={listofTopHundredTracks} />
        <TopTenTracksBarChart listOfTopTen={listOfTopTenTracks} />
        <TopTenArtistsBarChart listOfTopTen={listOfTopTenArtists} />
        <LastTenList listOfLastTen={listOfLastTen} />
        <TopTenList listOfTopTen={listOfTopTenTracks} />
        <BarChartForFrequencies listOfFrequencies={listOfFrequencies} count={count}/> */

  return (
    <>
      <PageTitle />
      {/* Organize all the charts in a grid of 2 elements per row */}
      <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '20px', paddingLeft: '200px', paddingRight: '200px'}}>
        <TopTenTracksBarChart listOfTopTen={listOfTopTenTracks} />
        <TopTenArtistsBarChart listOfTopTen={listOfTopTenArtists} />
        <ClusterChartForTopHundred listOfTopHundred={listofTopHundredTracks} />
        <BarChartForFrequencies listOfFrequencies={listOfFrequencies} count={count}/>
        <LastTenList listOfLastTen={listOfLastTen} />
        <TopTenList listOfTopTen={listOfTopTenTracks} />
      </Box>
    </>
  );
}

export default App;
