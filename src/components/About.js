import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Vault from '../assets/vault-historic.jpg'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  media: {
    height: 400,
  },
  title: {
    textAlign: 'center',
    margin: 0,
    fontWeight: 'bold', 
    color: '#5F6769',
    [theme.breakpoints.down('md')]: {
      fontSize: "3rem",
    },
  },
  openingDate: {
    color: "#29A19C",
    fontWeight: "bold",
    textAlign: "center",
    [theme.breakpoints.down('sm')]: {
      position: "relative",
      fontSize: "2rem",
    },
  },
}));

export default function About() {
  const classes = useStyles();

  return (
    <Card className={classes.root} id="about" raised>
      <CardContent>
        <Typography gutterBottom variant="h2" className={classes.title}>Vault Craft Beer</Typography>
        <Typography variant="h3" className={classes.openingDate}>Opening Soon!</Typography>
      </CardContent>
      <CardMedia
        className={classes.media}
        image={Vault}
        title="Historical Vault"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          About Us
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          Settled between The Raleigh Convention Center and historic Boylan Heights 
          resides a building constructed in the late 50's. Designed by locally famous architect 
          Fred Carter Williams, 518 W. South St was once one of the first 'drive-thru' banks in 
          the area and home to First National Bank. The building served the community for 25 years 
          and our goal is to continue that service, all while staying true to the original mid-century 
          modern architecture.
        </Typography>
      </CardContent>
    </Card>
  );
}
