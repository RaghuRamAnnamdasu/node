import { client } from "../index.js";

export async function updateMovieById(id, data) {
  return await client.db("node_app").collection("movies").updateOne({ id: id }, { $set: data });
}
export async function deleteMovieById(id) {
  return await client.db("node_app").collection("movies").deleteOne({ id: id });
}
export async function createMovie(data) {
  return await client.db("node_app").collection("movies").insertMany(data);
}
export async function getMovieById(id) {
  return await client.db("node_app").collection("movies").findOne({ id: id });
}
export async function getAllMovies(req) {
  return await client.db("node_app").collection("movies").find(req.query).toArray();
}
