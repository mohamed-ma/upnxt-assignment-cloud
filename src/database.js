const sqlite3 = require('sqlite3').verbose()
const db_path = "db.sqlite"

/*
SOURCES: 
---------
https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
*/
let db = new sqlite3.Database(db_path, (error) => {
  if (error) {
      console.log(error)
      throw error
  } else {
    console.log('[*] Connected...')
    db.run(`CREATE TABLE user (
        uuid STRING PRIMARY KEY,
        score INTEGER
        );`,
      ); 
  }
});

module.exports = db
