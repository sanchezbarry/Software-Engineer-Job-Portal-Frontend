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
import JobCard from '../jobcard/JobCard'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




const theme = createTheme();

function EditJobDetails(props) {
  const navigate = useNavigate()
  const params = useParams()
  const [job, setJob] = useState(null)
  const [techStack, setTechStack] = useState([])
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    position: "",
    experience: 0,
    salary_min: 0,
    salary_max: 0,
    currency: "",
    skills: []
  })

  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch(`http://localhost:3000/jobs/posted/${params.id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Authorization': token
      },
  })
      
      const data = await res.json()
      setJob(data)
      setFormData(data)
    }

    fetchApi()
  }, [params])

  useEffect(() => {
    setTechStack(formData.skills)
  }, [formData.skills])

  function handleInputChange(e) {
    setFormData({
        // ...formData ->
        // name: 'asdasd',
        // species: 'asdasd',
        // breed: 'asdasd'
        ...formData,
        skills: [...techStack],
        [e.target.name]: e.target.value
    })

  }

  const handleChangeOnSubmit = () => {
    setFormData({
      ...formData,
      skills: [...techStack]
    });
  };

  let token = localStorage.getItem('user_token')

  const handleDelete = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/jobs/posted/${params.id}`, {
      method: 'DELETE',
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

        console.log('Delete Successful!')
        toast.success("Delete Successful!")

        navigate('/employer')
    })
    .catch(err => {
        console.log('err: ',err)
        toast.error(err.message)
    })
};


  function handleFormSubmit(e) {
    e.preventDefault()

    // validations ...

    // processing

    fetch(`http://localhost:3000/jobs/posted/${params.id}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
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




  //tab function 
  const [value, setValue] = React.useState('1');
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // dialog states
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <TabContext value={value}>

        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <TabList onChange={handleTabChange} aria-label="lab API tabs example" centered>

            <Tab label="View" value="1"/>
            <Tab label="Edit" value="2"/>
        </TabList>

        </Box>

        <TabPanel value="1">
              <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom >
                Company: {formData.company}
              </Typography>
              <Typography variant="h5" component="div">
                Title: {formData.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Position: {formData.position}
              </Typography>
              <Typography variant="body2">
                Expperience: {formData.experience} years
                <br />
                Salary Range: ${formData.salary_min} - ${formData.salary_max}
                <br />
                {/* {techStack} */}
              </Typography>
            </CardContent>
            {/* <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions> */}
          </Card>
        </TabPanel>


        <TabPanel value="2">
        <Box
          sx={{
            marginTop: 2,
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
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit Job
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>

              </Grid>
            </Grid>

            <Button
              onClick={handleClickOpen}
              
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Delete Job
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Delete?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Delete this job forever?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>No</Button>
                  <Button onClick={handleDelete}>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            <Grid container justifyContent="flex-end">
              <Grid item>

              </Grid>
            </Grid>
          </Box>
        </Box>

        </TabPanel>
        </TabContext>

      </Container>

      </ThemeProvider>

  )

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



export default EditJobDetails