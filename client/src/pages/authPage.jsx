import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Tabs,
  Tab,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Aurora from '../components/background/particles';
import logoImage from '../assets/Kanbix-logo.png';

const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  return (
  <Box sx={{ minHeight: '100vh', bgcolor: '#000', color: '#fff', position: 'relative', fontFamily: '"SF Pro Display", "San Francisco", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif' }}>
      {/* Background */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0 }}>
        <Aurora />
      </Box>

      {/* Auth Container */}
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 2, pt: 12 }}>
        <Box textAlign="center" mb={4}>
          <img src={logoImage} alt="Kanbix Logo" style={{ height: 50 }} />
          <Typography variant="h5" mt={2}>
            {mode === 'login' ? 'Sign In to Kanbix' : 'Create Your Kanbix Account'}
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(25px) saturate(180%)',
            WebkitBackdropFilter: 'blur(25px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            backgroundImage: 'radial-gradient(circle at top left, rgba(255,255,255,0.06), transparent 80%)',
          }}
        >
          <Tabs
            value={mode}
            onChange={(_, val) => {
              setMode(val);
              setForm({ name: '', email: '', password: '' });
            }}
            variant="fullWidth"
            textColor="inherit"
            indicatorColor="secondary"
            sx={{
              mb: 3,
              '& .MuiTab-root': { color: '#aaa' },
              '& .Mui-selected': { color: '#fff' },
            }}
          >
            <Tab label="Sign In" value="login" />
            <Tab label="Sign Up" value="signup" />
          </Tabs>

          {mode === 'signup' && (
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              InputProps={{ sx: { color: '#fff' } }}
              InputLabelProps={{ sx: { color: '#bbb' } }}
            />
          )}

          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            InputProps={{ sx: { color: '#fff' } }}
            InputLabelProps={{ sx: { color: '#bbb' } }}
          />

          <TextField
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            InputProps={{
              sx: { color: '#fff' },
              endAdornment: (
                form.password ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ) : null
              ),
            }}
            InputLabelProps={{ sx: { color: '#bbb' } }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              bgcolor: 'rgba(255,255,255,0.03)',
              color: '#fff',
              boxShadow: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              '&:hover': {
                bgcolor: '#3A29FF',
                color: '#fff',
                boxShadow: '0 2px 8px rgba(58,41,255,0.15)',
                border: '1px solid #3A29FF',
              },
            }}
            onClick={() => navigate('/landing')}
          >
            {mode === 'login' ? 'Sign In' : 'Sign Up'}
          </Button>
        </Paper>

        {/* <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="gray">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <Button
              size="small"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              sx={{ ml: 1, textTransform: 'none', color: '#3A29FF' }}
            >
              {mode === 'login' ? 'Sign Up' : 'Sign In'}
            </Button>
          </Typography>
        </Box> */}
      </Container>
    </Box>
  );
};

export default AuthPage;
