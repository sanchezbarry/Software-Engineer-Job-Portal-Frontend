import * as React from "react";
import {useState, useEffect} from 'react';
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
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";


const theme = createTheme();


export default function Profile() {
  const navigate = useNavigate();
  const params = useParams()

  //for display later when there is an error with title or details
  const [ profile, setProfile] = useState("");
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

  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch(`http://localhost:3000/profile/${params.id}`)
      const data = await res.json()
      setProfile(data)
      setFormData(data)
    }

    fetchApi()
  }, [params])

  function handleChange(e) {
    setFormData({
        // ...formData ->
        // name: 'asdasd',
        // species: 'asdasd',
        // breed: 'asdasd'
        ...formData,
        [e.target.name]: e.target.value
    })

  }

  const handleDelete = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/profile/${params.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
    },
})
    .then(response => {
        console.log('response: ',response)
        return response.json()
    })
    .then(jsonResponse => {
        if (jsonResponse.error) {
            console.log('jsonResponse.error: ', jsonResponse.error)
            toast.error(jsonResponse.error)
            return
        }

        console.log('Delete Successful!')
        toast.success("Delete Successful!")

        navigate('/')
    })
    .catch(err => {
        console.log('err: ',err)
        toast.error(err.message)
    })
};


  function handleSubmit(e) {
    e.preventDefault()

    // validations ...

    // processing

    fetch(`http://localhost:3000/profile/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: {
            'Content-type': 'application/json',
        },
    })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
          // displaying success message
          toast.success("Edit profile successful")

          // redirect to animals listing page
          navigate('/')
        })
        .catch(err => {
          toast.error(err.message)
        })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
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
              sx={{ mt: 3, mb: 0 }}
            >
              Edit Profile
            </Button>


            <Button
              onClick={handleDelete}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 5 }}
            >
              Delete Profile
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
              </Grid>
              
              <Grid container justifyContent="flex-end">
              <Grid item>

              </Grid>


            </Grid>
          </Box>
        </Box>
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
