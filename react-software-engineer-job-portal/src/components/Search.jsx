
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState,useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const theme = createTheme();

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

const Search = (props) => {

    const [searchPass, setSearchPass] = useState(null)
    const [searchData, setSearchData] = useState({
        search: "",
        pg: 1
    })

    const handleChange = (e) => {
        setSearchData({
            [e.target.name]: e.target.value
        })
        console.log(searchData)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch('http://localhost:3000/jobs/search', {
            method: 'POST',
            body: JSON.stringify(searchData),
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(response => {
                console.log('Search Response: ',response)
                return response.json()
            })
            .then(jsonResponse => {
                if(jsonResponse.error) {
                    console.log('jsonResponse.error: ', jsonResponse.error)
                    return
                }
                console.log(jsonResponse)
                setSearchPass(jsonResponse)
            })
    }

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md" sx={{marginTop: 5, paddingBottom: 1}}>
                <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', align: 'center', width: 400 }}
                onSubmit={handleSubmit}>
                    <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Jobs"
                    id="search"
                    name="search"
                    label="search"
                    value={searchData.search}
                    onChange={handleChange}
                    />
                    <IconButton 
                    type="submit" 
                    sx={{ p: '10px' }} 
                    aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Container>

            { searchPass ?

            <Carousel responsive={responsive}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.secondary"
                    mt={4}
                    >
                    {searchPass ? ('Your Search Results') : ''}
                    </Typography>
                    {searchPass ? searchPass.map((jobs) => (
                        <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column', margin: 'normal' }}
                        >
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {jobs.company}
                            </Typography>
                            <Typography>
                            {jobs.title}
                            </Typography>
                            <Typography>
                            {jobs.position}
                            </Typography>
                            <Typography>
                            {jobs.experience}
                            </Typography>
                            <Typography>
                            {jobs.salary_min ? jobs.salary_min : ''}
                            </Typography>
                            <Typography>
                            {jobs.salary_max ? jobs.salary_max : ''}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="contained" color='info'>Save</Button>
                            <Button size="small" variant="contained" color='info' href={`${jobs.link}`}>View</Button>
                        </CardActions>
                        </Card>
                        )) : ''}
            </Carousel> : <></> }

        </ThemeProvider>
    )
}

export default Search