import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import 'typeface-roboto';
import { HashLink as Link } from 'react-router-hash-link';
import Beers from './Beers'

import { 
  Divider,
  AppBar,
  Card,
  Button,
  Grid,
  Toolbar,
  Typography,
  Hidden,
  CssBaseline,
  useScrollTrigger,
  InputAdornment,
  FormControl,
  FormLabel,
  InputLabel,
  Input,
  Container,
  Fab,
  Zoom, } from '@material-ui/core';

import { makeStyles, ThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import HomeIcon from '@material-ui/icons/Home';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircle from '@material-ui/icons/AccountCircle';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import About from './About'
import BeerList2 from './BeerList2'
import { getBeers } from '../contentful'

const beerPromise = getBeers()

const globalTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2B3D44'
    },
    secondary: {
      main: "#29A19C",
    },
  },
  status: {
    danger: 'orange',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      'sane-serif'
    ].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  home: {
    padding: theme.spacing(8),
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
    [theme.breakpoints.down('md')]: {
      fontSize: "1.5rem",
    },
  },
  contactUsTitle: {
    textAlign: 'center',
    fontWeight: 'bold', 
    color: '#5F6769',
    paddingTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      fontSize: "3rem",
    },
  },
  navLinks: {
    padding: theme.spacing(2),
  },
  divider: {
    padding: theme.spacing(4),
    color: 'none',
  },
  mapContainer: {
    minHeight: "450px",
    padding: theme.spacing(4),
  },
  contactForm: {
    padding: theme.spacing(2),
  },
  spacer: {
    padding: theme.spacing(2),
  },
  submitButton: {
    textAlign: "center",
  },
  textField: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  cardRoot: {
    padding: theme.spacing(2),
  },
  contactLabel: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  contactInfo: {
    textalign: "center"
  }

}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#home');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function AppShell(props) {
  const [contactName, setContactName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactMessage, setContactMessage] = useState("")
  const [beers, setBeers] = useState([])
  const [isLoading, setLoading] = useState(true)

    useEffect(() => {
    beerPromise.then(beerPosts => {
      setBeers(beerPosts)
      setLoading(false)
      console.log("Beers: ", beerPosts)
    })
  }, [isLoading])

  const submitContactModal = () => {
    // Submit actions
    console.log("Name: ", contactName)
    console.log("Email: ", contactEmail)
    console.log("Message: ", contactMessage)
    clearContactModal();
  };

  const clearContactModal = () => {
    setContactName("");
    setContactEmail("");
    setContactMessage("");

  };

  const handleContactName = (e) => {
    setContactName(e.target.value);
  };

  const handleContactEmail = (e) => {
    setContactEmail(e.target.value);
  };

  const handleContactMessage = (e) => {
    setContactMessage(e.target.value);
  };


  
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>
  const contactUs = 
    <>
      <Card raised className={classes.cardRoot}>
        <Typography gutterBottom variant="h2" component="h2" className={classes.contactUsTitle}>Contact Us</Typography>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="stretch"
        >

          <Grid item xs={12} md={4} className={ classes.contactForm }>
            <Grid
              container
              direction="column"
              justify="space-evenly"
              alignItems="center"
              component={Card} raised className={classes.cardRoot}
            >
              <Grid item xs={12} md={12}>
                <FormLabel className={classes.contactLabel}>
                  <Typography variant="body1">
                  Have a beer suggestion? Want some more information? 
                  Fill out the form below and we'd be more than happy to chat!
                  </Typography>
                  <br></br>
                  <div className={classes.contactInfo}>
                    <Typography variant="h6" color="primary" component="span">Erik Kern</Typography>
                    {bull}
                    <Typography variant="h6"  color="primary" component="a" href="mailto:erik@vaultcraftbeer.com">erik@vaultcraftbeer.com</Typography>
                  </div>
                </FormLabel>
                <br></br>
                <Divider />
                <br></br>
              </Grid>
              <Grid item xs={12} md={8}>
                <FormControl className={classes.textField}>
                  <InputLabel>Name</InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type='text'
                    value={contactName}
                    fullWidth
                    onChange={handleContactName}
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircle color="primary" />
                      </InputAdornment>
                    }
                  />
                </FormControl>          
              </Grid>
              <Grid item xs={12} md={8}>
                <FormControl className={classes.textField}>
                <InputLabel>Email</InputLabel>
                <Input
                  required
                  id="contact email"
                  type='email'
                  value={contactEmail}
                  fullWidth
                  onChange={handleContactEmail}
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              </Grid>
              <Grid item xs={12} md={8}>
                <FormControl className={classes.textField}>
                <InputLabel>Message</InputLabel>
                <Input
                  multiline
                  rows="6"
                  required
                  fullWidth={true}
                  id="contact message"
                  type='text'
                  value={contactMessage}
                  onChange={handleContactMessage}
                />
              </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button variant="contained" color="primary" onClick={submitContactModal} className={classes.submitButton} >
                  Send!
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item  xs={12} md={6} className={classes.mapContainer}>
          <iframe title="vault-location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.114099569476!2d-78.64961998473869!3d35.77257348017309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ac5f7991df53eb%3A0xbe06ba1bba6330bd!2s518%20W%20South%20St%2C%20Raleigh%2C%20NC%2027601!5e0!3m2!1sen!2sus!4v1582255339541!5m2!1sen!2sus" width="100%" height="100%" frameBorder="0" style={{border: '0',borderRadius: "25px",}} allowFullScreen=""></iframe>  
          </Grid>
        </Grid>
      </Card>
    </>
  const beerList = isLoading ? 
                  <p>Beer List is loading</p> :
                  <Beers allBeers={beers} />
  return (
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />
      
      <AppBar>
        <Toolbar>
          <Typography variant="h4" className={classes.title} component={Link} to="#home" smooth>Vault Craft Beer</Typography>
          <Hidden smDown>
            <Link smooth className={classes.navLinks} to="#home">
              <HomeIcon fontSize="large" />
            </Link>
          </Hidden>

          <Link smooth className={classes.navLinks} to="#beers">
            <LocalDrinkIcon fontSize="large" />
          </Link>
          <Link smooth className={classes.navLinks} to="#contact">
            <EmailIcon fontSize="large" />
          </Link>
        </Toolbar>
      </AppBar>


      <Toolbar id="home" className={classes.home}/>
      <Container>
          <About />
          <Toolbar className={classes.divider}/>
          <Divider />
          <Toolbar id="beers" className={classes.divider}/>

          {beerList}
          <BeerList2 />
          <Toolbar className={classes.divider}/>
          <Divider />
          <Toolbar id="contact" className={classes.divider}/>
          {contactUs}
          <Toolbar className={classes.divider}/>
      </Container>
    
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

    </ThemeProvider>
  );
}