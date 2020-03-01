import React from 'react'

const likeContext = React.createContext( localStorage.getItem('beerLikes') 
? JSON.parse(localStorage.getItem('beerLikes'))
: {} )

export default likeContext