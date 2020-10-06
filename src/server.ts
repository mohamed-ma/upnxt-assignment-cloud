import http from "http";
import express from "express";
import { compute } from "./compute";
//UUID for history endpoint
import { v4 as uuid } from 'uuid';
//sqlite3. verbose to produce traces.
const sqlite3 = require('sqlite3').verbose();
const app = express();
app.use(express.json());

// let db = new sqlite3.Database(':memory:', (err) =>{
//   if(err){
//     return console.error(err.message);
//   }
//   console.log('Connected.');
// });

//use this command down below, since json sees zeros as Octal numbers instead of ints, the best thing to do is wrap them up as strings, was it on purpose? Cheeky! ;)
//curl -X POST --header "Content-Type: application/json" -d "{ \"game\" : [[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, 10, 10]]}" http://localhost:8080/compute
app.post("/compute", (request, response) => {
  const game = request.body.game;
  const score = compute(game);
  if(game !== undefined){
    let stringified_json = JSON.stringify(score);
    response.send({'id': uuid(), 'score': score});
  }else{
    //return status code 400 if the input is invalid
    response.sendStatus(400);
  }
  response.end();
});
app.get("/history", (req, res) =>{
  console.log(uuid());
  res.end();
});
//db.close();
export const createServer = () => http.createServer(app);

