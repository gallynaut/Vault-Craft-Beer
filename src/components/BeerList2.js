import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getBeers } from '../contentful'


import {
  Grid, 
  Button, 
  Typography,
  Divider,
} from '@material-ui/core'

import BeerCard from './BeerCard'
import BeerJSON from '../beers.json'

const allBeers = JSON.parse(JSON.stringify(BeerJSON)).beers

export default class BeerList2 extends React.Component {
    

  state = { 
    beers: allBeers,
    beerLikes: JSON.parse(localStorage.getItem('likes'))
    ? JSON.parse(localStorage.getItem('likes'))
    : this.getLikes(),
    filter: "",
  }
  
  getLikes() {
    var o = {}
    allBeers.map(function(beer) {
      o[beer.beerName] = false
      return true
    })
    return o
  }

  componentDidMount() {

    // console.log(this.state.beerLikes)
  }

  getBeers(newFilter) {
      if (newFilter === "") {
          this.setState({ filter: "", beers: allBeers })
      } else if (newFilter === "Other") {
          this.setState({
              filter: "Other",
              beers: allBeers.filter((beer) => {
                  return !(beer.beerType.includes("IPA") || beer.beerType.includes("Sour"));
              })
          }) 
      } else {
          this.setState({
              filter: newFilter,
              beers: allBeers.filter((beer) => {
                  return beer.beerType.includes(newFilter);
              })
          })
      }
  }

  getCards() {
    const likes = this.state.beerLikes
      return this.state.beers.map((beer) => 
        <Grid item xs={12} md={6} key={beer.beerName}>
          <BeerCard 
              name={beer.beerName}
              brewery={beer.breweryName}
              type={beer.beerType}
              location={beer.breweryLocation}
              description={beer.beerDescription}
              abv={beer.beerABV}
              color={beer.beerPrimaryColor}
              isLiked={ likes[beer.beerName] ? true : false }
              toggleLike={ () => this.toggleLike(beer.beerName) }
              url={beer.url}
          />
        </Grid>
      )
  }

  toggleLike(beerName) {
    let newLikes = this.state.beerLikes
    newLikes[beerName] = !newLikes[beerName]
    this.setState({
      ...this.state,
      beerLikes: newLikes
    },() => {
      console.log("setting local storage", JSON.stringify(this.state.beerLikes))
      localStorage.setItem('likes', JSON.stringify(this.state.beerLikes))
    })
  }


  render() {
      const beerCardList = this.getCards();
      const filter = this.state.filter;
      
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
            onClick={() => this.getBeers("")}
          >
            All
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            size="medium" 
            color={ filter === "IPA" ? "secondary" : "primary" }
            onClick={() => this.getBeers("IPA")}
          >
            IPA
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            size="medium" 
            color={ filter === "Sour" ? "secondary" : "primary" }
            onClick={() => this.getBeers("Sour")}
          >
            Sour
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            size="medium" 
            color={ filter === "Other" ? "secondary" : "primary" }
            onClick={() => this.getBeers("Other")}
          >
            Other
          </Button>
        </Grid>
      </Grid>
      <br />
      <br />
      <Divider />
      <br />
      <br />
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        spacing={5}
      >
        {beerCardList}
      </Grid>
      
      </>
      );
}
}


