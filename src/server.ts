import http from "http";
import express from "express";
import { compute } from "./compute";

const app = express();
app.use(express.json());
app.post("/compute", (request, response) => {
 const game = request.body.game;

 const score = compute(game);

 if(game !== undefined){
   let stringified_json = JSON.stringify(score);
   response.send({'score': score});
 }else{
   //return status code if the input is invalid
   response.sendStatus(400);
 }
 
 response.end();

});

export const createServer = () => http.createServer(app);
// curl -X POST --header "Content-Type: application/json" -d "{ \"game\" : [[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, 10, 10]]}" http://localhost:8080/compute
