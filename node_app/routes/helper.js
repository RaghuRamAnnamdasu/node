import { client } from "../index.js";
import {ObjectId} from "mongodb";

export async function updateMovieById(id, data) {
  return await client.db("node_app").collection("movies").updateOne({ _id: ObjectId(id) }, { $set: data });
}
export async function deleteMovieById(id) {
  return await client.db("node_app").collection("movies").deleteOne({ _id: ObjectId(id) });
}
export async function createMovie(data) {
  return await client.db("node_app").collection("movies").insertMany(data);
}
export async function getMovieById(id) {
  return await client.db("node_app").collection("movies").findOne({ _id: ObjectId(id) });
}
export async function getAllMovies(req) {
  return await client.db("node_app").collection("movies").find(req.query).toArray();
}

