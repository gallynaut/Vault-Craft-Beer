import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Grid, 
  Button, 
  Typography,
  Divider,
} from '@material-ui/core'

function BeerFilters(props) {
  const [filter, setFilter] = useState("")
  return (
    <>
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
          onClick={() => setFilter("")}
        >All</Button>
      </Grid>
      <Grid item>
        <Button 
          variant="contained" 
          size="medium" 
          color={ filter === "IPA" ? "secondary" : "primary" }
          onClick={() => setFilter("IPA")}
        >IPA</Button>
      </Grid>
      <Grid item>
        <Button 
          variant="contained" 
          size="medium" 
          color={ filter === "Sour" ? "secondary" : "primary" }
          onClick={() => setFilter("Sour")}
        >Sour</Button>
      </Grid>
      <Grid item>
        <Button 
          variant="contained" 
          size="medium" 
          color={ filter === "Other" ? "secondary" : "primary" }
          onClick={() => setFilter("Other")}
        >Other</Button>
      </Grid>
    </Grid>
    </>
  )
}

BeerFilters.propTypes = {

}

export default BeerFilters

