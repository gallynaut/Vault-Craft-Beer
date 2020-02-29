import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { getBeers } from '../contentful'
import {
  Grid, 
} from '@material-ui/core'
import BeerCard from './BeerCard'

const promise = getBeers()

function Beers({props}) {
  const [beers, setBeers] = useState([])
  const [filter, setFilter] = useState("")
  const [beerLikes, setBeerLikes] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [beerCards, setBeerCards] = useState([])
  
  
  useEffect(() => {
    promise.then(beerPosts => {
      setBeers(beerPosts)
      setLoading(false)
      getBeerCards()
      console.log("Beers: ", beerPosts)
      if (localStorage.getItem('beerLikes')) {
        setBeerLikes(JSON.parse(localStorage.getItem('beerLikes')))
      } else {
        var o = {}
        beerPosts.map(function(beer) {
          o[beer.beerName] = false
          return true
        })
        setBeerLikes(o)
      }
    })
  }, [isLoading])

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
  }

  const getBeerCards = () => {
    let beerList = []
    if (filter === "") {
      beerList = beers
    } else if (filter === "Other") {
      beerList = beers.filter((beer) => {
        return !(beer.beerType.includes("IPA") || beer.beerType.includes("Sour"));
      })
    } else {
      beerList = beers.filter((beer) => {
        return beer.beerType.includes(filter);
      })
    }
    const allBeerCards = beerList.map((beer) => {
      return {
        beerName: beer.beerName,
        beerDescription: beer.beerDescription,
        beerType: beer.beerType,
        beerABV: beer.beerABV,
        beerSRM: beer.beerSRM,
        isLiked: beerLikes[beer.beerName] ? true : false,
        breweryName: beer.breweryName,
        breweryLocation: beer.breweryLocation,
        toggleLike: function () {toggleBeerLike(beer.beerName)},
        unTappdURL: beer.untappdURL,
      }
    })
    setBeerCards(allBeerCards)
  }

  console.log("Cards: ", beerCards)
  const allBeerCards = beerCards.map((beer) => 
  <Grid item xs={12} md={6} key={beer.beerName}>
    <BeerCard 
        name={beer.beerName}
        brewery={beer.breweryName}
        type={beer.beerType}
        location={beer.breweryLocation}
        description={beer.beerDescription}
        abv={beer.beerABV}
        color={beer.beerSRM}
        liked={ beer.liked ? true : false }
        toggleLike={ beer.toggleLike }
        url={beer.unTappdURL}
    />
  </Grid>
  )
  return (
    <>
    <h1>New List</h1>
    <Grid container>
      {
        useMemo(
          () => (
        beerCards.map((beer) => (
          <Grid item xs={12} md={6} key={beer.beerName}>
          <BeerCard 
            name={beer.beerName}
            brewery={beer.breweryName}
            type={beer.beerType}
            location={beer.breweryLocation}
            description={beer.beerDescription}
            abv={beer.beerABV}
            color={beer.beerSRM}
            liked={ beer.liked ? true : false }
            toggleLike={ beer.toggleLike }
            url={beer.unTappdURL}
          />
          </Grid>
        ))), [beerCards])
      }
    </Grid>
    <h1>End</h1>
    </>
  )
}

function BeerList(props) {
  return props.beers.map((beer) => 
    <Grid item xs={12} md={6} key={beer.beerName}>
      <BeerCard 
          name={beer.beerName}
          brewery={beer.breweryName}
          type={beer.beerType}
          location={beer.breweryLocation}
          description={beer.beerDescription}
          abv={beer.beerABV}
          color={beer.beerSRM}
          liked={ beer.liked ? true : false }
          toggleLike={ beer.toggleLike }
          url={beer.unTappdURL}
      />
    </Grid>
  )
}

BeerList.PropTypes = {
  beers: PropTypes.arrayOf({
    beerName: PropTypes.string.isRequired,
    beerDescription: PropTypes.string.isRequired,
    beerType: PropTypes.string.isRequired,
    beerABV: PropTypes.number.isRequired,
    beerSRM: PropTypes.string.isRequired,
    breweryName: PropTypes.string.isRequired,
    breweryLocation: PropTypes.string.isRequired,
    liked: PropTypes.bool.isRequired,
    toggleLike: PropTypes.func,
    unTappdURL: PropTypes.string.isRequired,
  })

}

export default Beers