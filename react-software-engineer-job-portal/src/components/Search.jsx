
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();


const Search = () => {

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
                console.log('jsonResponse: ', jsonResponse)
            })
    }

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{marginTop: 5, paddingBottom: 1}}>
                <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
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
        </ThemeProvider>
    )
}

export default Search