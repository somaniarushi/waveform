import React from "react";
import { Bar } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";

const globalStyles = {
  fontFamily: '"Saira", sans-serif',
};

function TopTenArtistsBarChart({ listOfTopTen }) {
  return (
    <Box style={{ paddingBottom: "20px" }}>
      <Typography
        variant="h4"
        style={{ paddingBottom: "10px", ...globalStyles }}
      >
        Top Ten Artists
      </Typography>
      <Bar
        data={{
          labels: listOfTopTen.map((artist) => artist.artist),
          datasets: [
            {
              label: "Playcount",
              backgroundColor: "rgba(0, 162, 255, 0.801)",
              borderColor: "rgba(0, 162, 255, 0.801)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(0, 162, 255, 0.801)",
              hoverBorderColor: "rgba(0, 162, 255, 0.801)",
              data: listOfTopTen.map((artist) => artist.playcount),
            },
          ],
        }}
      />
    </Box>
  );
}

function TopTenTracksBarChart({ listOfTopTen }) {
  return (
    <Box style={{ paddingBottom: "20px" }}>
      <Typography
        variant="h4"
        style={{ paddingBottom: "10px", ...globalStyles }}
      >
        Top Ten Songs
      </Typography>
      <Bar
        data={{
          labels: listOfTopTen.map((track) => track.track),
          datasets: [
            {
              label: "Play Minutes",
              backgroundColor: "rgba(255, 0, 0, 0.801)",
              borderColor: "rgba(255, 0, 0, 0.801)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255, 0, 0, 0.801)",
              hoverBorderColor: "rgba(255, 0, 0, 0.801)",
              data: listOfTopTen.map(
                (track) => (track.duration * track.playcount) / 60
              ),
            },
            {
              label: "Playcount",
              backgroundColor: "rgba(0, 162, 255, 0.801)",
              borderColor: "rgba(0, 162, 255, 0.801)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(0, 162, 255, 0.801)",
              hoverBorderColor: "rgba(0, 162, 255, 0.801)",
              data: listOfTopTen.map((track) => track.playcount),
            },
          ],
        }}
      />
    </Box>
  );
}

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

export { TopTenArtistsBarChart, TopTenTracksBarChart, BarChartForFrequencies};
