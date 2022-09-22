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
import JobCard from '../jobcard/JobCard'


const theme = createTheme();

export default function SavedJobs() {

    const [saveData, setSaveData] = useState(null)
    const [postedJobs, setPostedJobs] = useState(null)
    const [savedJobsArr, setSavedJobsArr] = useState([])
  
    useEffect(() => {
        let token = localStorage.getItem('user_token')
    
        const fetchSaveData = async () => {
            const res = await fetch(`http://localhost:3000/jobs/saved`, {
             method: 'GET',
             headers: {
              'Authorization': token
            },
             })
            const data = await res.json()
            setSaveData(data[0].jobId)
        }

        const fetchPostedJobs = async () => {
            const res = await fetch(`http://localhost:3000/jobs/posted`)
            const data = await res.json()
            setPostedJobs(data)
        }
    
        fetchSaveData()
        fetchPostedJobs()
    },[])

    useEffect(() => {
        if (!postedJobs) {
            return
        }
        const savedArr = postedJobs.map((job) => {
            if (saveData.includes(job._id)) {
                return job
            }
        }).filter((job) => {
            return job !== undefined
        })
        setSavedJobsArr(savedArr)
    },[postedJobs])

    const jobCards = savedJobsArr.map((job) => (<JobCard key={job._id} data={job} showViewButton={true} />))

  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
            <Typography
                component="h3"
                variant="h3"
                align="center"
                color="text.primary"
                marginTop={5}
            >
                Your Saved Jobs
            </Typography>

            <Container sx={{ pb: 4 }} maxWidth="xl">
                {/* End hero unit */}
                <Grid container spacing={1}>
                    { jobCards }
                </Grid>
            </Container>
        </Container>

    </ThemeProvider>
    
  );

}