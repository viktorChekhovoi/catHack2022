import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import httpClient from "../../httpClient";
import axios from "axios";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Nioh
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const [openSent, setOpenSent] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [email, setEmail] = React.useState<string>("");

  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:5000/index", { email: "test" })
      .then((response) => {
        console.log("SUCCESS", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const logInUser = async () => {
    try {
      const resp = await httpClient.post("//localhost:5000/index", {
        email,
      });

      window.location.href = "/dash";
    } catch (error: any) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
      console.log("ERROR");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    logInUser();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://content.fortune.com/wp-content/uploads/2020/05/F500-2020-062-Caterpillar.jpg?resize=850,566)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={
              {
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "center",
                // height: "100%",
              }
            }
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pb: 20,
                pt: 20,
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#ffc107" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Email Verification
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{
                  mt: 1,
                }}
              >
                {openSent ? (
                  <Alert
                    onClose={() => {
                      setOpenSent(false);
                    }}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Email verification sent!
                  </Alert>
                ) : (
                  <></>
                )}
                {openError ? (
                  <Alert
                    onClose={() => {
                      setOpenError(false);
                    }}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    Incorrect Verification Code!
                  </Alert>
                ) : (
                  <></>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="code"
                  label="Verification Code"
                  name="Code"
                  autoComplete=""
                  autoFocus
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: "#ffc107",
                    "&:hover": {
                      backgroundColor: "#fff",
                      color: "#3c52b2",
                    },
                  }}
                >
                  Verify Me
                </Button>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
