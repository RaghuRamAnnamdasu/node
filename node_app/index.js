// const { response } = require('express')
// const express = require('express')
// const { MongoClient } = require('mongodb')
import {request, response} from "express";
import express from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";
const app = express();

dotenv.config();

app.get('/', function (req, res) {
  res.send('Hello World ⭐⭐')
})


const port = 4000;

app.use(express.json());

// const Mongo_URL = "mongodb://localhost";
const Mongo_URL = process.env.Mongo_URL;

async function createConnection(){
  const client = new MongoClient(Mongo_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

const client = await createConnection();

  app.get('/movies', async function (req, res) {
    const movies = await client.db("node_app").collection("movies").find().toArray();
    res.send(movies);
  });

  app.get("/movies/:id", async function(req,res){
    const {id} = req.params;
    // const movie = data.find((mv)=>mv.id==id);
    const movie = await client.db("node_app").collection("movies").findOne({id : id});
    movie ? res.send(movie) : res.status(404).send({msg : "Movie not found"});
  });

  app.post('/movies', async function (req, res) {
    const data = req.body;
    const result = await client.db("node_app").collection("movies").insertMany(data);
    res.send(result);
  })


app.listen(port,()=>console.log(`App is started in ${port}`));