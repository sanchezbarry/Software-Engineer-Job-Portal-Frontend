import * as React from 'react';
import {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Search from '../Search'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const theme = createTheme();

export default function Home() {
  const navigate = useNavigate()

  const [postedJobs, setpostedJobs] = useState([])
  const [jobId, setJobId] = useState(null)
  const [savedData, setSavedData] = useState([])

  // To fetch posted jobs data and set into a state to be mapped on the carousel
  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch('http://localhost:3000/jobs/posted')
      const data = await res.json()
  
      setpostedJobs(data)
    }
  
    fetchApi()
  }, [])

  // To handle save job event by setting job id to state
  const handleSave = (event) => {
    setJobId({
      id: event.target.value 
    })
    event.target.disabled=true
    console.log('the ID: ', event.target.value)
    console.log('Job Saved')
    console.log('e: ',event.target)
  };

  // To handle disabling of save button and sending POST request to save job id to user's Saved Jobs array
  useEffect(() => {
    let token = localStorage.getItem('user_token')

    const fetchSavedData = async () => {
      const res = await fetch(`http://localhost:3000/jobs/saved`, {
        method: 'GET',
        headers: {
          'Authorization': token
        },
      })
      const data = await res.json()
      console.log(data[0].jobId)
      setSavedData(data[0].jobId)
    }

    fetchSavedData()

    if (jobId === null) {
      return
    }
      fetch(`http://localhost:3000/jobs/saved`, {
        method: 'POST',
        body: JSON.stringify(jobId),
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
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

            console.log('Save Successful!')

        })
        .catch(err => {
            console.log('err: ',err)
            toast.error(err.message)
        })
  },[jobId])

console.log("PJ: ",postedJobs,"SD: ",savedData)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="xl" align="center">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              New Jobs
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Here you can find, save and apply for jobs!
            </Typography>

            <Search />

          {/* </Container>
        </Box> */}

        <Carousel responsive={responsive} autoPlay={true} autoPlaySpeed={3000} infinite={true}>
          <div>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.secondary"
              mt={4}
            >
              Our Platform Jobs
            </Typography>
          </div>
            {postedJobs.map((jobs) => (
              <div>
                <Card
                key={jobs._id}
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', margin: 'normal' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>

                    <Typography gutterBottom variant="h3" component="h2" fontWeight='bold'>
                      {jobs.company}
                    </Typography>

                    <Typography gutterBottom variant="h6" component='h2' fontStyle='oblique' fontWeight='bold'>
                      {jobs.title}
                    </Typography>

                    <Typography gutterBottom variant="h7" component='h3' >
                      {jobs.position}
                    </Typography>

                    <Typography fontStyle='italic'>
                     Min: ${jobs.salary_min ? jobs.salary_min : ''}
                    </Typography>

                    <Typography fontStyle='italic'>
                     Max: ${jobs.salary_max ? jobs.salary_max : ''}
                    </Typography>

                  </CardContent>
                  <CardActions>
                    { savedData.includes(jobs._id) ? 
                    <Button key={jobs._id} size="small" variant="contained" color='success' align='center'>Saved</Button>
                    :
                    <Button key={jobs._id} size="small" variant="contained" value={jobs._id} color='info' align='center' onClick={handleSave}>Save</Button>
                    }
                    <Button size="small" variant="contained" color='info' align='center' href={`/jobs/${jobs._id}/edit`}>View</Button>
                  </CardActions>
                </Card>
              </div>
                ))}
        </Carousel>
        </Container>
        </Box>

        {/* <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Job Title
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" color='info'>Save</Button>
                    <Button size="small" variant="contained" color='info'>View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container> */}

      </main>
    </ThemeProvider>
  );
}
