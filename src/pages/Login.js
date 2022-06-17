import React from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const params = new URLSearchParams();

    params.append('client_id', process.env.REACT_APP_CLIENT_ID);
    params.append('grant_type', 'password');
    params.append('username', 'lanceangelojasperdominguez@gmail.com');
    params.append('password', 'aasdasdasdasd');

    try {
      await axios.post(`${process.env.REACT_APP_DJANGO_API}/o/token/`, params, {
        auth: {
          username: process.env.REACT_APP_CLIENT_ID,
          password: process.env.REACT_APP_CLIENT_SECRET
        }
      });
    } catch (e) {}
  };

  return (
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
            onChange={setEmail}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            onChange={setPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={login}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
