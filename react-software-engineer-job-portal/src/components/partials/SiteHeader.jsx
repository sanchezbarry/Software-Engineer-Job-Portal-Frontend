import {Link} from 'react-router-dom'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import WorkIcon from '@mui/icons-material/Work';
import { useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from "jwt-decode";


const token = localStorage.getItem('user_token')
let id = localStorage.getItem('user_Id')
// let decoded = jwt_decode(token);
// console.log(decoded)
// let id = decoded._id
let pages = []

//useEffect: the moment there is a user log in, refresh itself


const SiteHeader = () => {

  //Work on this and test it out
  //useEffect code to check if user is logged in
  // const profileId = (<SiteHeader id={props.id}  />)
  const [profile, setProfile] = useState('')
  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch(`http://localhost:3000/users/profile/${id}`)
      const data = await res.json()

      setProfile(data)
    }

    fetchApi()
  }, [])

  // const profileId = ({data=(id)})
  const [user, setUser] = useState({
    'Authorization': ''
  })
  const fetchData = async () => {
    const item = await JSON.parse(localStorage.getItem('user_token'))
    console.log('item:', item)
    if(item) {
      setUser(item)
  }
  }

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('user-token')
      if (token === null) {
        localStorage.setItem('user-token', '')
        token = ''
      }
      //return to log in page if empty
      
      setUser({
        'Authorization': token
      })
    }
  }
  //   fetchData()
  // // }, [user])
  // }
  )

  const navigate = useNavigate()
  const params = useParams()
  // const {id} = props.data


  // to test logout
  const handleLogout = (e) => {
    e.preventDefault()

    let token = localStorage.getItem('user_token')
    console.log('token:', token)

    fetch(`http://localhost:3000/users/logout`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': token
        },
    })
        .then(response => {
          console.log('response:', response)
            return response.json()
        })
        .then(jsonResponse => {
            if (jsonResponse.error) {
                toast.error(jsonResponse.error)
                return
            }

            console.log('Logout Successful')
            toast.success("Logout Successful!")

            // store the token into localstorage / cookie
            //remove JWT token from localstorage and return to home guest login page
            localStorage.clear()
            localStorage.removeItem(token);
            console.log('remove token success')

            navigate('/login')
        })
        .catch(err => {
            toast.error(err.message)
        })
}

  //it should be user and not token
  if (token) {
    pages = [<Link style={{textDecoration: 'none', color: 'white'}} to='/employer'>Employer's Portal</Link>, 
    'Saved Jobs', 
    <Link style={{textDecoration: 'none', color: 'white'}} to={`/profile/${id}`}>Profile</Link>,]
  } else {
    pages = [<Link style={{textDecoration: 'none', color: 'white'}} to='/login'>Login</Link>, 
    <Link style={{textDecoration: 'none', color: 'white'}} to='/register'>Register</Link>]
  }
    
  const settings = [<Link style={{textDecoration: 'none', color: 'black'}} to='/profile'>Profile</Link>, <Button onClick={handleLogout}>'Logout'</Button>];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  

  return (
    <AppBar position="static"> 
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <WorkIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
           
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           <Link to='/' style={{textDecoration: 'none', color: 'white'}} > Software Engineered </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color="white" textDecoration='none'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <WorkIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Software Engineered
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default SiteHeader;
