import express from "express";
import { getAllMovies, getMovieById, createMovie, deleteMovieById, updateMovieById } from "./helper.js";

const router = express.Router();


// app.get('/movies', async function (req, res) {
  //   const movies = await client.db("node_app").collection("movies").find().toArray();
  //   res.send(movies);
  // });

  router.get('/', async function (req, res) {

    if(req.query.rating){
      req.query.rating = +req.query.rating;
    }
    const movies = await getAllMovies(req);
    res.send(movies);
  });

  router.get("/:id", async function(req,res){
    const {id} = req.params;
    // const movie = data.find((mv)=>mv.id==id);
    const movie = await getMovieById(id);
    movie ? res.send(movie) : res.status(404).send({msg : "Movie not found"});
  });

  router.post('/', async function (req, res) {
    const data = req.body;
    const result = await createMovie(data);
    res.send(result);
  })

  router.delete("/:id", async function(req,res){
    const {id} = req.params;
    // const movie = data.find((mv)=>mv.id==id);
    const result = await deleteMovieById(id);
    result.deletedCount ? res.send(result) : res.status(404).send({msg : "Movie not found"});
  });

  router.put('/:id', async function (req, res) {
    const {id} = req.params;
    const data = req.body;
    const result = await updateMovieById(id, data);
    res.send(result);
  });

export const moviesRouter = router;


