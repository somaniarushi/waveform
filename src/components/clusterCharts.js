import {
  Typography,
  Box,
} from "@mui/material";
import { Bar, Scatter } from "react-chartjs-2";

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

//eslint-disable-next-line
function BarChartForFrequencies({ listOfFrequencies, count }) {
    // Frequency count is a list of numbers
    // Create a scatter plot where the x axis is the days and y axis is the frequency

    // Reverse the frequencyCount array so that the most recent day is at the end
    let frequencyCount = listOfFrequencies.reverse();
    console.log(frequencyCount)

    // Drop all zeroes
    frequencyCount = frequencyCount.filter((frequency) => frequency !== 0);

    // Create a list of days
    const days = frequencyCount.map((_, index) => index + 1);

    return (
        <Box style={{ paddingBottom: "20px" }}>
            <Typography variant="h4" style={{ paddingBottom: '10px', ...globalStyles }}>Frequency of Listening</Typography>
            <Bar
                data={{
                    datasets: [
                        {
                            label: "Frequency of Listening",
                            data: frequencyCount.map((frequency, index) => ({
                                x: days[index],
                                y: frequency,
                            })),
                            backgroundColor: "rgba(255, 0, 0, 0.801)",
                            borderColor: "rgba(255, 0, 0, 0.801)",
                            borderWidth: 1,
                            hoverBackgroundColor: "rgba(255, 0, 0, 0.801)"
                        }]
                }}
                options={{
                    // Set range
                    scales: {
                        x: {
                            type: "linear",
                            position: "bottom",
                            min: 0,
                            max: count,
                            title: {
                                display: true,
                                text: 'Days'
                            }
                        },
                        y: {
                            type: "linear",
                            position: "bottom",
                            min: 0,
                            max: 150,
                            title: {
                                display: true,
                                text: 'Frequency'
                            }
                        },
                    },
                    // Reveal name of track on hover (listOfTopHundred.map((track) => track.track)
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    var label = "Day " + (context.dataIndex + 1) + " | " + frequencyCount[context.dataIndex] + " listens";
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
