import express from 'express'
import graphQlHTTP from 'express-graphql'
import schema from './schema'
import fetch from 'node-fetch'

var DataLoader = require('dataloader')

const app = new express();
const BASE_URL = 'http://localhost:4000'
const fetchPersonByUrl = (url) =>{
    console.log(`${BASE_URL}${url}`)
    return fetch(`${BASE_URL}${url}`)
     .then(res => {
         console.log(res)
         return res.json()
       })
     .then(json => {
         console.log(json)
         return json
       })
   }

app.use(graphQlHTTP(rs => {
     
    const loaders = {
      person : new DataLoader( keys => Promise.all(keys.map(fetchPersonByUrl)))
    }
    return {
        context : {loaders},
        schema:schema,
        graphiql :true
    }
}))

app.listen(3000);