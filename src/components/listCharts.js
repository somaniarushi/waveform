import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Box } from '@mui/material';

const globalStyles = {
    fontFamily: '"Saira", sans-serif'
}

function TopTenList({ listOfTopTen }) {
    return (
        <Box style={{ paddingBottom: '20px' }}>
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

  export { TopTenList, LastTenList };
