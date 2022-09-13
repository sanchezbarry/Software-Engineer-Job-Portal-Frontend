import React, { useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import WorkIcon from '@mui/icons-material/Work';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//having an error trying to import one component into another
import JobCard from '../jobcard/JobCard'

const theme = createTheme();

function EditJobDetails(props) {
  const navigate = useNavigate()
  const params = useParams()
  const [job, setJob] = useState(null)
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    position: "",
    experience: 0,
    salary_min: 0,
    salary_max: 0,
    currency: "",
    skills: [skills[0]],
  })

  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch(`http://localhost:3000/jobs/posted/${params.id}`)
      const data = await res.json()
      setJob(data)
      setFormData(data)
    }

    fetchApi()
  }, [params])

  function handleInputChange(e) {
    setFormData({
        // ...formData ->
        // name: 'asdasd',
        // species: 'asdasd',
        // breed: 'asdasd'
        ...formData,
        [e.target.name]: e.target.value
    })

  }


  function handleFormSubmit(e) {
    e.preventDefault()

    // validations ...

    // processing

    //get token from local storage
    let token = localStorage.getItem('user_token')
    console.log(token)

    fetch(`http://localhost:3000/jobs/posted/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: {
            'Content-type': 'application/json',
            'Authorization': token,
        },
    })
        .then(response => {
            return response.json()
        })
        .then(jsonResponse => {
          // displaying success message
          toast.success("Edit job successful")

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
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <WorkIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Job
          </Typography>
          <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="company"
                  name="company"
                  required
                  fullWidth
                  id="company"
                  label="Company"
                  autoFocus
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Job Title"
                  name="title"
                  autoComplete="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="position"
                  label="Position"
                  id="position"
                  autoComplete="position"
                  value={formData.position}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography id="input-slider" gutterBottom>
                    Experience*
                </Typography>
                <Slider defaultValue={0} aria-label="Default" valueLabelDisplay="auto" max={50} 
                id="experience"
                name="experience"
                label="experience"
                value={formData.experience}
                onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={5}>
                <TextField
                  required
                  fullWidth
                  id="salary_min"
                  label="Minimum Salary"
                  name="salary_min"
                  type="number"
                  autoComplete="salary_min"
                  value={formData.salary_min}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={5}>
                <TextField
                  required
                  fullWidth
                  id="salary_max"
                  label="Maximum Salary"
                  type="number"
                  name="salary_max"
                  autoComplete="salary_max"
                  value={formData.salary_max}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={2}>
              <FormControl fullWidth>
              <InputLabel id="currency">Currency</InputLabel>
              <Select
                required
                labelId="currency"
                id="currency"
                name="currency"
                label="currency"
                type='string'
                onChange={handleInputChange}
                value={formData.currency}
                >
                <MenuItem value={'Singapore'}>SGD</MenuItem>
                <MenuItem value={'United States'}>USD</MenuItem>
                <MenuItem value={'Japan'}>JPY</MenuItem>
                </Select>
                </FormControl>

              </Grid>



              <Grid item xs={12}>
                <Stack spacing={3} sx={{ width: 500 }}>
                    <Autocomplete
                        multiple
                        id="tech_stacks"
                        value={formData.skills}
                        // onChange={handleInputChange}

                        options={skills}
                        getOptionLabel={(option) => option.skill}
                        defaultValue={[skills[0]]}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Required Tech Stack"
                            placeholder="Skills"
                        />
                        )}
                    />
                </Stack>
              </Grid>



            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Post Job
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>

              </Grid>
            </Grid>
          </Box>
        </Box>
      

        

      </Container>

      </ThemeProvider>

  )

}

const skills = [{skill:'HTML'}, {skill:'CSS'}, {skill:'JavaScript'}, {skill:'React'}, {skill:'Node'}, {skill:'Mongo'}, {skill:'Express'}]


export default EditJobDetails