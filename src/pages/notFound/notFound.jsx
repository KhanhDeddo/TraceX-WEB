import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { keyframes } from '@emotion/react';

const glitch = keyframes`
  0% {
    text-shadow: 2px 0 red, -2px 0 cyan;
  }
  20% {
    text-shadow: -2px 0 red, 2px 0 cyan;
  }
  40% {
    text-shadow: 2px 2px red, -2px -2px cyan;
  }
  60% {
    text-shadow: -2px -2px red, 2px 2px cyan;
  }
  80% {
    text-shadow: 0px 0px red, 0px 0px cyan;
  }
  100% {
    text-shadow: 2px 0 red, -2px 0 cyan;
  }
`;

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'linear-gradient(to right, #1a1a40, #0f0f1a)',
        background: 'radial-gradient(ellipse at center, #1a1a40 0%, #0f0f1a 100%)',
        color: '#ffffff',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: '10rem',
          fontWeight: 900,
          animation: `${glitch} 1s infinite`,
          fontFamily: 'monospace',
          letterSpacing: '0.2rem',
        }}
      >
        404
      </Typography>

      <Typography
        variant="h5"
        sx={{
          mt: 2,
          mb: 4,
          color: '#ccc',
          fontFamily: 'monospace',
          fontSize: '1.5rem',
        }}
      >
        Không tìm thấy trang nào cả... Có thể bạn vừa bước sang chiều không gian khác 👽
      </Typography>

      <Button
        component={Link}
        to="/"
        sx={{
          bgcolor: '#00ffe0',
          color: '#000',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          px: 4,
          py: 1.5,
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: '#00ccaa',
            transform: 'scale(1.05)',
            boxShadow: '0 0 15px #00ffe0',
          },
        }}
      >
        ⬅ Quay về trang chủ
      </Button>
    </Box>
  );
}
