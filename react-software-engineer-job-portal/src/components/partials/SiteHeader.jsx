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

const SiteHeader = () => {

  const [profile, setProfile] = useState(null)
  const [profileId, setProfileId] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('user_token')
    let id = localStorage.getItem('user_Id')

    const fetchProfileApi = async () => {
      if (token) {
        const res = await fetch(`http://localhost:3000/users/profile/${id}`, {
          method: 'GET',
          headers: {
              'Authorization': token,
          }
    })
      const data = await res.json()
      setProfile(token)
      setProfileId(id)
    } else {
      return
    }
  }

    fetchProfileApi()

  })

  // Logout function
  const handleLogout = (e) => {
    e.preventDefault()

    let token = localStorage.getItem('user_token')

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
                return
            }
            //remove JWT token from localstorage and return to home guest login page
            localStorage.clear()
            localStorage.removeItem(token);

            setTimeout(() => {
              setProfile(null)
            },"500")

            setTimeout(() => {
              window.location.reload(false)
            },"1000")
        })
        .catch(err => {
            console.log(err)
        })
    }


  const loggedIn = [<Link style={{textDecoration: 'underline', color: 'white', fontWeight: 'bold'}} to='/employer'>Employer's Portal</Link>,
  //link the routes to the saved jobs
  <Link style={{textDecoration: 'underline', color: 'white', fontWeight: 'bold'}} to='/employer'>Saved Jobs</Link>,
  <Link style={{textDecoration: 'underline', color: 'white', fontWeight:'bold'}} to={`/profile/${profileId}`}>Profile</Link>,]

  const loggedOut = [<Link style={{textDecoration: 'underline', color: 'white', fontWeight: 'bold', mr: 5}} to='/login'>Login</Link>, 
  <Link style={{textDecoration: 'underline', color: 'white', fontWeight: 'bold'}} to='/register'>Register</Link>]

  const loggedInSettings = [<Link style={{textDecoration: 'none', color: 'black'}} to={`/profile/${profileId}`}>Profile</Link>, <Button style={{textDecoration: 'none', color: 'black'}} onClick={handleLogout}>Logout</Button>]
    
   

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
    <AppBar position="static" style={{backgroundColor: '#36454F'}}> 
      <Container maxWidth="xl" >
        <Toolbar disableGutters >
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
              { profile ?
              loggedIn.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color="black" textDecoration='none'>{page}</Typography>
                </MenuItem>
              ))
              :
              loggedOut.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color="black" textDecoration='none'>{page}</Typography>
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
            { profile ?
            loggedIn.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))
            :
            loggedOut.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {profile ?

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
              {loggedInSettings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> : "" }

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default SiteHeader;
