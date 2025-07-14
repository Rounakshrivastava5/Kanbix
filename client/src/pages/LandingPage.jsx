import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SplashCursor from '../components/background/colorFlow';
import logoImage from '../assets/Kanbix-logo.png';
import Aurora from '../components/background/particles';

// ShinyText animation styles
const shinyTextStyles = `
.shiny-text {
  color: #b5b5b5a4;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 60%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  display: inline-block;
  animation: shine 5s linear infinite;
}
@keyframes shine {
  0% {
    background-position: 100%;
  }
  100% {
    background-position: -100%;
  }
}
.shiny-text.disabled {
  animation: none;
}
`;

const ShinyText = ({ text, disabled = false, speed = 5, className = '' }) => {
  const animationDuration = `${speed}s`;
  return (
    
    <div
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{ animationDuration }}
    >
      {text}
    </div>

  );
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#000', color: '#fff', overflowX: 'hidden' }}>
      <style>{shinyTextStyles}</style>

            {/* Particles Background */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Aurora />
      </Box>


      {/* Header Bar */}
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'transparent', backdropFilter: 'blur(12px)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <img src={logoImage} alt="Kanbix Logo" style={{ height: 40 }} />
          {/* <Typography variant="h6" fontWeight="bold">
            Kanbix
          </Typography> */}
          {/* <Button
            variant="outlined"
            color="inherit"
            size="small"
            sx={{ borderColor: '#777', color: '#ddd' }}
            onClick={() => navigate('/dashboard')}
          >
            Open App
          </Button> */}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          height: '100vh',
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 3,
        }}
      >
        <Box>
          <ShinyText
            text={
              <span style={{ fontSize: '3rem', fontWeight: 'bold', letterSpacing: 2 }}>
                Kanbix
              </span>
            }
            speed={4}
          />
          <Typography variant="h5" sx={{ mb: 4 }}>
            Collaborate. Prioritize. Deliver.
          </Typography>
<Button
  variant="outlined"
  size="large"
  sx={{
    bgcolor: 'transparent',
    color: '#fff',
    borderColor: '#fff',
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: 'rgba(255,255,255,0.08)',
      borderColor: '#fff',
      color: '#fff',
    },
  }}
  onClick={() => navigate('/dashboard')}
>
  Go to Dashboard
</Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 10 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Why Kanbix?
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          maxWidth="600px"
          mx="auto"
          sx={{ opacity: 0.8 }}
        >
          Kanbix empowers agile teams with real-time collaboration, beautiful task boards, burndown charts, role-based access control and more.
        </Typography>
      </Container>

      {/* CTA Footer */}
      <Box sx={{ bgcolor: '#111', py: 6, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Ready to boost your productivity?
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
