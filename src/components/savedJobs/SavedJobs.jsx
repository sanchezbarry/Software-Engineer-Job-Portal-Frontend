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






// need to define this as the database of posted jobs, so the map function below can loop and generate all jobs

const theme = createTheme();

export default function SavedJobs() {

    const [saveData, setSaveData] = useState(null)
    const [postedJobs, setPostedJobs] = useState(null)
  
    useEffect(() => {
        let token = localStorage.getItem('user_token')
    
        const fetchSaveData = async () => {
            const res = await fetch(`${REACT_APP_API}jobs/saved`, {
             method: 'GET',
             headers: {
              'Authorization': token
            },
             })
            const data = await res.json()
            console.log(data[0].jobId)
            setSaveData(data[0].jobId)
        }

        const fetchPostedJobs = async () => {
            const res = await fetch(`${REACT_APP_API}jobs/posted`)
            const data = await res.json()
            console.log(data)
            setPostedJobs(data)
        }
    
        fetchSaveData()
        fetchPostedJobs()
    })

    

  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
            <Typography
                component="h3"
                variant="h3"
                align="center"
                color="text.primary"
                gutterBottom
            >
                Your Saved Jobs
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

    </ThemeProvider>
    
  );

}