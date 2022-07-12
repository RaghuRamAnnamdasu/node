// const { response } = require('express')
// const express = require('express')
// const { MongoClient } = require('mongodb')
import {request, response} from "express";
import express from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";
import {moviesRouter} from "./routes/movies.js"
import cors from "cors";

const app = express();

app.use(cors());

dotenv.config();

app.get('/', function (req, res) {
  res.send('Hello World ⭐⭐')
})


const port = process.env.PORT;

app.use(express.json());

// const Mongo_URL = "mongodb://localhost";
const Mongo_URL = process.env.Mongo_URL;

async function createConnection(){
  const client = new MongoClient(Mongo_URL);
  await client.connect();
  console.log("Mongo is connected");
  return client;
}

export const client = await createConnection();

app.use("/movies",moviesRouter);

app.listen(port,()=>console.log(`App is started in ${port}`));