import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

function JobCard(props) {
  const { _id, title, position, company } = props.data
  const displayView = props.showViewButton ? true : false

  return (
    <Grid item xs={12} sm={4}>
        <Card
          sx={{ height: 'auto', display: 'flex', flexDirection: 'column' }}
        >
          <CardMedia
            component="img"
            sx={{
              // 16:9
              // pt: '56.25%',
            }}
            image="https://source.unsplash.com/random"
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography>
              {position}
            </Typography>
            <Typography>
              {company}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center'}}>
            <Link to={`/jobs/${_id}/edit`}><Button size="small">Edit</Button></Link>
            <Link to={`/jobs/${_id}`}><Button size="small">View</Button></Link>
            <Link to={`/jobs/${_id}`}><Button size="small">Delete</Button></Link>
          </CardActions>
        </Card>
        </Grid>

   

  )
}

export default JobCard
