import http from "http";
import express from "express";
import { compute } from "./compute";
//UUID for history endpoint
import { v4 as uuid } from 'uuid';
//sqlite3. verbose to produce traces.
const sqlite3 = require('sqlite3').verbose();
const db = require("./database.js");
const app = express();
app.use(express.json());

/*
ATTENTION PLEASE:
use this command down below, since JSON sees zeros as Octal numbers instead of ints, the best thing to do is wrap them up as strings:
curl -X POST --header "Content-Type: application/json" -d "{ \"game\" : [[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, 10, 10]]}" http://localhost:8080/compute

P.S. Was it on purpose? Cheeky! ;)

USAGE: 
[*] To calculate score and UUID; curl this in your terminal => curl -X POST --header "Content-Type: application/json" -d "{ \"game\" : [[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, "0"],[10, 10, 10]]}" http://localhost:8080/compute
[*] To check user scores => localhost:8080/history?game= UUID_HERE


Many thanks to NxtUP for organizing this neat little event. :) The case itself wasn't too hard. The hardest part was definitely the JSON error handling.
The SQLite3 bit was easy since there are many tutorials online, I could've added md5 like the tutorial but I decided not to, since that's not what was in the case ;)

If you are interested which tutorial I used for the database, look inside the 'database.js' file! :)
I tried adding comments where I thought seemed necessary. If you have any questions, do not hesitate to send me an email! :)

NOTE: the testing will fail, seeing how you await supertest(server) inside server.test.ts, this runs the code inside server.ts hence creating a database connection
where you then have a timeout in your async/await state. Just remove the database code and the testing will be okay ;)

SOURCES for JSON:
-----------------
https://stackoverflow.com/questions/38158027/express-4-14-how-to-send-200-status-with-a-custom-message
https://stackoverflow.com/questions/17560858/command-prompt-having-trouble-escaping-quotes-and-braces
*/

app.post("/compute", (request, response) => {
    const game = request.body.game;
    const score = compute(game);
    let generateUUID = uuid();
    let query ='INSERT INTO user (uuid, score) VALUES (?,?)'
    let params =[generateUUID, score]
    //run query along with the parameters
    db.run(query, params, function (err) {
        //if error, return status code 400
        if (err){
            return response.status(400);
        }
        //else just respond with 200 and uuid along with the score.
        response.status(200).json({"uuid": generateUUID, "score": score})
    });

});

app.get("/history", (req, res) =>{
  //database query
  var query = "SELECT * FROM user WHERE uuid = ?";
  //get parameter from link
  var parameters = [req.query.game];

  db.get(query, parameters, (error, row) => {
      if (error) {
        return res.status(400).json({"error":error.message});
        
      }
      res.json({
          "uuid": row.uuid,
          "score": row.score
      });
  });
});
export const createServer = () => http.createServer(app);
