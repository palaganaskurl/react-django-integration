import React from 'react';
import './register.css';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hasError, setHasError] = useState(false);

  const register = async () => {
    const registerData = {
      email,
      password
    };

    if (firstName) {
      registerData.first_name = firstName;
    }

    if (lastName) {
      registerData.last_name = lastName;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_DJANGO_API}/register/`,
        registerData
      );

      setHasError(false);
    } catch (e) {
      setHasError(true);
    }
  };

  return (
    <div className="Register">
      <Container>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            Register
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
          <Grid item xs={12}>
            <TextField
              id="first_name"
              label="First Name (Optional)"
              variant="outlined"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="last_name"
              label="Last Name (Optional)"
              variant="outlined"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          {hasError && (
            <Grid item xs={12}>
              <Grid container justifyContent="center">
                <Alert severity="error">Error registering!</Alert>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button variant="contained" onClick={register}>
              Register
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
