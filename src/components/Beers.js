import React, { useState, useReducer, useEffect } from 'react'
import BeerCard from './BeerCard'

import {
  Grid, 
  Button, 
  Typography,
  Toolbar,
} from '@material-ui/core'


function Beers(props) {
  const [filter, setFilter] = useState('')


  const likeReducer = (state, action) => {
    switch(action.type) {
      case 'TOGGLE':
        console.log("Toggle: ", action.payload)
        const newState = state
        newState[action.payload] = !newState[action.payload]

        console.log("setting local beerLikes storage", JSON.stringify(newState))
        localStorage.setItem('beerLikes', JSON.stringify(newState))
        return newState
      case 'SET':
        return action.payload
      default:
        return state
    }
  }

  const beerReducer = (state, action) => {
    switch(action.type) {
      case 'SET':
        return action.payload
      case 'FILTER':
        setFilter(action.payload)
        if (action.payload === 'IPA' || action.payload === 'SOUR') {
          return props.allBeers.filter((beer) => {
            return beer.beerType.toUpperCase().includes(action.payload);
          })
        } else if (action.payload === '') {
          return props.allBeers
        } else {
          return props.allBeers.filter((beer) => {
            return !(beer.beerType.includes("IPA") || beer.beerType.includes("Sour"));
          })
        }
      case 'RESET':
        setFilter('')
        return props.allBeers
      default:
        return state
    }
  }

  
  const [beers, dispatch] = useReducer(beerReducer, props.allBeers)
  
  const [likes, toggleLikeDispatch] = useReducer(likeReducer, {})

  useEffect(() => {
    if (Object.entries(likes).length === 0 && likes.constructor === Object && localStorage.getItem('beerLikes') ) {
      const cachedLikes = JSON.parse(localStorage.getItem('beerLikes'))
      console.log("Cached likes: " , cachedLikes)
      toggleLikeDispatch({type: 'SET', payload: cachedLikes})
    }
  })

  const beerCards = beers.map((beer) =>     
  <Grid item xs={12} md={6} key={beer.beerName}>
    <BeerCard 
        name={beer.beerName}
        brewery={beer.breweryName}
        type={beer.beerType}
        location={beer.breweryLocation}
        description={beer.beerDescription}
        abv={beer.beerABV}
        color={beer.beerSRM}
        isLiked={ likes[beer.beerName] ? true : false }
        toggleLike={ () => toggleLikeDispatch({type: 'TOGGLE', payload: beer.beerName }) }
        url={beer.unTappdURL}
    />
  </Grid>
  )

  return (
    <>
    <Typography gutterBottom variant="h2" component="h2" style={{textAlign: 'center',fontWeight: 'bold', color: '#5F6769',}}>Beer List</Typography>
    <Typography variant="body1" style={{ textAlign: 'center', }} >
      Browse our list of beers or select a type to filter on. Ten of our Eighteen taps will be dedicated to the craft beers of North Carolina.
    </Typography>
    <br></br>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={5}
    >
      <Grid item>
        <Button 
          variant="contained" 
          size="medium" 
          color={ filter === "" ? "secondary" : "primary" }
          onClick={() => dispatch({type: 'RESET', payload: ''})}
        >All</Button>
      </Grid>
      <Grid item>
        <Button 
          variant="contained" 
          size="medium" 
          color={ filter === "IPA" ? "secondary" : "primary" }
          onClick={() => dispatch({type: 'FILTER', payload: 'IPA'})}
        >IPA</Button>
      </Grid>
      <Grid item>
        <Button 
          variant="contained" 
          size="medium" 
          color={ filter === "SOUR" ? "secondary" : "primary" }
          onClick={() => dispatch({type: 'FILTER', payload: 'SOUR'})}
        >Sour</Button>
      </Grid>
      <Grid item>
        <Button 
          variant="contained" 
          size="medium" 
          color={ filter === "OTHER" ? "secondary" : "primary" }
          onClick={() => dispatch({type: 'FILTER', payload: 'OTHER'})}
        >Other</Button>
      </Grid>
    </Grid>
    <Toolbar />

    <Grid container spacing={4}>
      {beerCards}
    </Grid>

    </>
  )
}


export default Beers

