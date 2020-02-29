const client = require('contentful').createClient({
  space: 'amjz0afjhc91',
  accessToken: 'sfKlBKSED9Vfdg26usDrZe39g9UrYLHAn_k-HLphn9c'
})

const getBeers = () => client.getEntries().then((response) => {
  var output = []
  console.log("response: ", response.items)
  response.items.forEach(item => {
    if (item.fields.inStock) {
      output.push({
        beerName: item.fields.beerName,
        beerDescription: item.fields.beerDescription,
        beerType: item.fields.beerType,
        beerABV: item.fields.beerABV,
        beerSRM: item.fields.beerSRM,
        breweryName: item.fields.breweryName,
        breweryLocation: item.fields.breweryLocation,
        untappdURL: item.fields.untappdURL,
      })
    }
  })

  console.log("Beers: ", output)
  return output
})




export { getBeers }