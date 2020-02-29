import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'
import BeerCard from './BeerCard'

import {
  Grid, 
  Button, 
  Typography,
} from '@material-ui/core'


function Beers(props) {
  const [filter, setFilter] = useState("")
  const [beerLikes, setBeerLikes] = useState(localStorage.getItem('beerLikes') ? JSON.parse(localStorage.getItem('beerLikes')) : [])
  const allBeers = props.allBeers.map(obj=> ({ ...obj, isLiked: beerLikes[obj.beerName] ? true : false }))
  const [beers, setBeers] = useState(allBeers)



  const toggleBeerLike = (beerName) => {
    let newLikes = beerLikes
    if (beerName in beerLikes) {
      newLikes[beerName] = !beerLikes[beerName]
    } else {
      newLikes[beerName] = true
    }
    setBeerLikes(newLikes)
    console.log("setting local beerLikes storage", JSON.stringify(newLikes))
    localStorage.setItem('beerLikes', JSON.stringify(newLikes))
    // setBeers(beers.forEach((beer) => {
    //   let o = beer
    //   if (beer.beerName === beerName) {
    //     o.isLiked = !o.isLiked
    //   }
    //   return o
    // }))
  }

  const newFilter = (newF) => {
    if (newF === "") {
      setBeers(allBeers)
    } else if (newF === "Other") {
      setBeers(allBeers.filter((beer) => {
        return !(beer.beerType.includes("IPA") || beer.beerType.includes("Sour"));
      }))
    } else {
      setBeers(allBeers.filter((beer) => {
        return beer.beerType.includes(newF);
      }))
    }
    setFilter(newF)
  }



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
          onClick={() => newFilter("")}
        >All</Button>
      </Grid>
      <Grid item>
        <Button 
          variant="contained" 
          size="medium" 
          color={ filter === "IPA" ? "secondary" : "primary" }
          onClick={() => newFilter("IPA")}
        >IPA</Button>
      </Grid>
      <Grid item>
        <Button 
          variant="contained" 
          size="medium" 
          color={ filter === "Sour" ? "secondary" : "primary" }
          onClick={() => newFilter("Sour")}
        >Sour</Button>
      </Grid>
      <Grid item>
        <Button 
          variant="contained" 
          size="medium" 
          color={ filter === "Other" ? "secondary" : "primary" }
          onClick={() => newFilter("Other")}
        >Other</Button>
      </Grid>
    </Grid>

    <Grid container>
      {beers.map((beer) =>
        <Grid item xs={12} md={6} key={beer.beerName}>
          <BeerCard 
              name={beer.beerName}
              brewery={beer.breweryName}
              type={beer.beerType}
              location={beer.breweryLocation}
              description={beer.beerDescription}
              abv={beer.beerABV}
              color={beer.beerSRM}
              isLiked={ beer.isLiked ? true : false }
              allLikes={{}}
              toggleLike={ () => toggleBeerLike(beer.beerName) }
              url={beer.unTappdURL}
          />
        </Grid>)}
    </Grid>

    </>
  )
}

Beers.propTypes = {

}

export default Beers

