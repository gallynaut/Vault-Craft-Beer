import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles';
import { 
  IconButton,
  Grid,
  Avatar,
  Divider,
  Hidden,
  Card,
  CardActions,
  CardContent,
  Typography,
 } from '@material-ui/core'

import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 270,
    [theme.breakpoints.down('md')]: {
      minHeight: 200,
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
  cardButton: {
    padding: theme.spacing(2),
  },
  avatarLarge: {
    height: 64,
    width: 64,
    top: theme.spacing(2),
    // right: theme.spacing(2),
  },
  avatarSmall: {
    display: 'inline-flex',
    height: 48,
    width: 48,
    padding: theme.spacing(2),

  }
}));

function BeerCard(props) {
  // const [beer, setBeer] = useState({...initialProps})
  // const { name, brewery, type, location, description, abv, color, isLiked, toggleLike, url } = props
  const [isLiked, setLiked] = useState(props.isLiked)
  // const [, updateState] = React.useState();
  // const forceUpdate = React.useCallback(() => updateState({}), []);

  const likeToggle = () => {
    props.toggleLike()
    setLiked(!isLiked)
    console.log("updating")
  }
  // useEffect(() => {
  //   setLiked(props.liked)
  // }, [props.liked])

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const floatingAvatar = 
  <Hidden smUp>
    <Avatar  className={classes.avatarSmall} style={{ backgroundColor: props.color, }} >
      <LocalDrinkIcon  />
    </Avatar>
  </Hidden>

  return (
    <Card className={classes.root} raised>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
        spacing={0}
      >
        <Grid item sm={9} md={10}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {floatingAvatar}  {props.name}
            </Typography>
            
            <Typography className={classes.title} color="textSecondary" gutterBottom variant="h6">
              {props.type} {bull} {props.abv}%
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {props.brewery} - {props.location}
            </Typography>
            <Divider />
          </CardContent>
        </Grid>
        <Hidden xsDown>
          <Grid item md={2}>
            <Avatar  className={classes.avatarLarge} style={{ backgroundColor: props.color, }} >
              <LocalDrinkIcon fontSize="large" />
            </Avatar>
          </Grid>
        </Hidden>
      </Grid>
      <CardContent>
        <Typography variant="body2" component="p" style={{ flexGrow: '1',   }} >
          {props.description}
        </Typography>
      </CardContent>

      <CardActions>
        <IconButton aria-label="add to favorites" onClick={ likeToggle }>
          <FavoriteIcon color={isLiked ? "secondary" : "primary"} />
        </IconButton>
        <IconButton aria-label="share" onClick={()=> window.open(props.url, "_blank")}>
          <ShareIcon />
        </IconButton>
        
      </CardActions>
    </Card>
  );
}

BeerCard.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  abv: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  brewery: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  color: PropTypes.string,
  isLiked: PropTypes.bool.isRequired,
  allLikes: PropTypes.any,
  liked: PropTypes.bool,
  toggleLike: PropTypes.func,
}

export default BeerCard