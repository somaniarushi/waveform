
import { Typography, Box } from '@mui/material';
const globalStyles = {
    fontFamily: '"Saira", sans-serif'
  }


function PageTitle() {
    return <Box sx={{
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
  }

export default PageTitle;