import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import styles from "./signInPage.module.css";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center">
      {"Copyright © "}
      <Link color="primary" href="">
        Built with ❤️ by Team SpamBytes
      </Link>{" "}
    </Typography>
  );
}

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username: email, password: password };
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      response.json().then((res) => {
        console.log(res);
        if (response.status === 200) {
          history.push("/dashboard", {});
        }
      });
    });
  };

  return (
    <div className={styles.background}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={styles.paper}>
          <div className={styles.typography}>Welcome to Servicio,</div>
          <form className={styles.form} noValidate onSubmit={handleSubmit}>
            <TextField
              color="primary"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={styles.submit}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2"></Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2" className={styles.link}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
