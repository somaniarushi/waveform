import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Box,
} from "@mui/material";
import { Scatter } from "react-chartjs-2";

const globalStyles = {
    fontFamily: '"Saira", sans-serif',
};

function ClusterChartForTopHundred({ listOfTopHundred }) {
  // Cast duration and playcount to Integer
  listOfTopHundred = listOfTopHundred.map((track) => ({
    ...track,
    duration: parseInt(track.duration),
    playcount: parseInt(track.playcount),
  }));
  // Remove all tracks with duration of 0, don't forget to cast to Integer
  listOfTopHundred = listOfTopHundred.filter((track) => track.duration !== 0);
  console.log(listOfTopHundred.map((track) => track.duration));

  return (
    <Box style={{ paddingBottom: "20px" }}>
      <Typography variant="h4" style={{ paddingBottom: '10px', ...globalStyles }}>Playcount vs Length</Typography>
      <Scatter
        data={{
          datasets: [
            {
              label: "Cluster Chart for Last 100 Songs",
              data: listOfTopHundred.map((track) => ({
                x: track.duration,
                y: track.playcount,
              })),
              backgroundColor: "rgba(255, 0, 0, 0.801)",
              borderColor: "rgba(255, 0, 0, 0.801)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255, 0, 0, 0.801)",
              hoverBorderColor: "rgba(255, 0, 0, 0.801)",
            },
          ],
        }}
        options={{
          // Set range
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              min: 0,
              max: 400,
              title: {
                display: true,
                text: 'Duration (seconds)'
              }
            },
            y: {
              type: "linear",
              position: "bottom",
              min: 0,
              max: 80,
                title: {
                    display: true,
                    text: 'Playcount'
                }
            },
          },
          // Reveal name of track on hover (listOfTopHundred.map((track) => track.track)
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  var label = listOfTopHundred[context.dataIndex].track + " | " + listOfTopHundred[context.dataIndex].artist;
                  return label;
                },
              },
            },
          },
        }}
      />
    </Box>
  );
}

export { ClusterChartForTopHundred };
