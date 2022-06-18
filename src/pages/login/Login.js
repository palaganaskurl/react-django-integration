import React from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

export default function Login() {
  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  const login = async () => {
    const loginData = {
      email,
      password
    };

    try {
      const loginResponse = await axios.post(
        `${process.env.REACT_APP_DJANGO_API}/login/`,
        loginData
      );

      localStorage.setItem('testTokenSave', JSON.stringify(loginResponse.data));

      navigate('/user-list', { replace: true });

      setHasError(false);
    } catch (e) {
      setHasError(true);
    }
  };

  return (
    <div className="Login">
      <Container>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            Login
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          {hasError && (
            <Grid item xs={12}>
              <Grid container justifyContent="center">
                <Alert severity="error">Error logging in!</Alert>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button variant="contained" onClick={login}>
              Login
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
