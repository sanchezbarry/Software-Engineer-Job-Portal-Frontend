import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Software Engineered
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();

  //for display later when there is an error with title or details
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState("");
  const [detailsError, setDetailsError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    job: "",
    position: "",
    experience: 0,
    skills: [setskills[0]],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //initialize when details and error is not false
    setTitleError(false);
    setDetailsError(false);

    if (title === "") {
      setTitleError(true);
    }

    if (details === "") {
      setDetailsError(true);
    }

    if (title && details) {
      console.log(title, details);
    }
    console.log({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      job: formData.job,
      position: formData.position,
      skills: formData.skills,
    });

    // fetch(`http://localhost:3000/register`, {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // })
    //   .then(
    //     // (response) => {
    //     navigate("/login")
    // console.log(response);
    // return response.json();
    // }
    // )
    // .then((jsonResponse) => {
    //   if (jsonResponse.error) {
    //     console.log(jsonResponse.error);
    //     toast.error(jsonResponse.error);
    //     return;
    //   }
    // navigate("/login");
    // });

    // Need to add the mongodb here?
    fetch(`http://localhost:3000/register`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log("response: ", response);
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.error) {
          console.log("jsonResponse.error: ", jsonResponse.error);
          toast.error(jsonResponse.error);
          return;
        }

        console.log("Registration Successful!");
        toast.success("Registration Successful!");

        navigate("/login");
      })
      .catch((err) => {
        console.log("err: ", err);
        toast.error(err.message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                  error={titleError}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={titleError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={titleError}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="job"
                  label="Job Title"
                  name="job"
                  autoComplete="job"
                  value={formData.job}
                  onChange={handleChange}
                  error={detailsError}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="position"
                  label="Position"
                  name="position"
                  autoComplete="position"
                  value={formData.position}
                  onChange={handleChange}
                  error={detailsError}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography id="input-slider" gutterBottom>
                  Experience*
                </Typography>
                <Slider
                  defaultValue={0}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  max={50}
                  id="experience"
                  name="experience"
                  label="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  error={detailsError}
                />
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={3} sx={{ width: 500 }}>
                  <Autocomplete
                    multiple
                    id="skills"
                    value={formData.skills}
                    // I believe working on the OnChange part will solve the problem
                    //   onChange={(event, newValue) => {
                    //     setFormData(newValue)
                    //  }}
                    autoSelect
                    options={setskills}
                    getOptionLabel={(option) => option.skill}
                    defaultValue={[setskills[0]]}
                    error={detailsError}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Add Your Tech Stack"
                        placeholder="Skills"
                      />
                    )}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive alerts on new jobs via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

const setskills = [
  { id: 1, skill: "HTML" },
  { id: 2, skill: "CSS" },
  { id: 3, skill: "JavaScript" },
  { id: 4, skill: "React" },
  { id: 5, skill: "Node" },
  { id: 6, skill: "Mongo" },
  { id: 7, skill: "Express" },
];
