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

export { TopTenArtistsBarChart, TopTenTracksBarChart };
