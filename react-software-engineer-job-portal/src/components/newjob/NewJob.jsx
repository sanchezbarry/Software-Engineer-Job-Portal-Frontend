import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {useState, useEffect} from 'react';
import * as React from 'react';
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
import Image from "../../components/beach.jpg";

// need to define this as the database of posted jobs, so the map function below can loop and generate all jobs

const theme = createTheme();

export default function NewJob(props) {
  const navigate = useNavigate()
  const [techStack, setTechStack] = useState([])
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    position: "",
    experience: 0,
    salary_min: 0,
    salary_max: 0,
    currency: "",
    skills: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      skills: [...techStack],
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      company: formData.company,
      title: formData.title,
      position: formData.position,
      experience: formData.experience,
      salary_min: formData.salary_min,
      salary_max: formData.salary_max,
      currency: formData.currency,
      skills: formData.skills
    });

    let token = localStorage.getItem('user_token')

      fetch(`http://localhost:3000/jobs/new`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-type': 'application/json',
            'Authorization': token,
        },
    })
        .then(response => {
            console.log('response: ',response)
            return response.json()
        })
        .then(jsonResponse => {
            if (jsonResponse.error) {
                console.log('jsonResponse.error: ', jsonResponse.error)
                return
            }

            console.log('Posted Successful!')

            navigate('/')
        })
        .catch(err => {
            console.log('err: ',err)
        })
  };

  const handleChangeOnSubmit = () => {
    setFormData({
      ...formData,
      skills: [...techStack]
    });
  };
  
  // retrieve posted jobs
  const [postedJobs, setpostedJobs] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch('http://localhost:3000/jobs/posted')
      const data = await res.json()

      setpostedJobs(data)
    }

    fetchApi()
  }, [])

  const jobCards = postedJobs.map((job) => (<JobCard key={job._id} data={job} showViewButton={true} />))



  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
            backdropFilter: "blur(3px)",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'Cover',
            backgroundImage: `url(${Image})`,
            bgcolor: 'text.primary',
          }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            pt: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <WorkIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight='bold'>
            Post a New Job
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography id="input-slider" gutterBottom fontWeight='bold'>
                    Experience*
                </Typography>
                <Slider defaultValue={0} aria-label="Default" valueLabelDisplay="auto" max={50} 
                id="experience"
                name="experience"
                label="experience"
                value={formData.experience}
                onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                onChange={handleChange}
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
                    name="skills"
                    id="skills"
                    onChange={(event,value) => setTechStack(value)}
                    value={techStack}
                    autoSelect
                    options={setskills}
                    getOptionLabel={(option) => option.name}
                    defaultValue={setskills[0]}
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



            </Grid>
            <Button
              type="submit"
              onClick={handleChangeOnSubmit}
              fullWidth
              color='success'
              variant="contained"
              sx={{ mt: 3, mb: 6 }}
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


    <Container maxWidth="lg">
      <Typography
        component="h3"
        variant="h3"
        align="center"
        color="text.primary"
        fontWeight='bold'
        gutterBottom
      >
        Your Posted Jobs
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        View applicants, edit or delete jobs!
      </Typography>

      <Container sx={{ py: 4 }} maxWidth="xl">
        {/* End hero unit */}
        <Grid container spacing={1}>
            
              { jobCards }
        </Grid>
      </Container>
    </Container>
    </Box>

    </ThemeProvider>
    
  );

}

const setskills = [
  { name: "HTML" },
  { name: "CSS" },
  { name: "JavaScript" },
  { name: "React" },
  { name: "Node" },
  { name: "Mongo" },
  { name: "Express" },
];
