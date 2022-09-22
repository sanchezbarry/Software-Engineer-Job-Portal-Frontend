import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

function JobCard(props) {
  const { _id, title, position, company, salary_min, salary_max } = props.data

  return (
    <Grid item xs={12} sm={4} mt={5}>
        <Card
          sx={{ height: 'auto', width: '100', display: 'flex', flexDirection: 'column', mt:'5', opacity: '1', backgroundColor:'black', opacity: '0.7', color: 'white'}}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2" fontWeight='bold'>
              {title}
            </Typography>
            <Typography>
              {position}
            </Typography>
            <Typography>
              {company}
            </Typography>
            <Typography>
              ${salary_min} - {salary_max}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center'}}>
            <Link style={{textDecoration: 'none', color: 'white', opacity: '1'}} to={`/jobs/${_id}/edit`}><Button size="small" variant="contained" color='info'>View or Edit</Button></Link>
          </CardActions>
        </Card>
        </Grid>

   

  )
}

export default JobCard
