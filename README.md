# Assignment: Bowling algorithm

The goal of this assignment is to implement the bowling score algorithm.  
The rules of bowling can be found [here][rules].

The algorithm should be served on a HTTP server, which contains a single `/compute` endpoint. We will help you with the setup of the server, you can fork this repository to your own account.

The assignment should take around two hours to complete.

## Input

The input is a HTTP POST request to the `/compute` endpoint.
The body is a JSON object where the "game" key will map to a value which represents a game of bowling.
This value is an array which contains nine tupples and one triple, each representing a frame.

## Output

The output is a HTTP response with status code 200. The body is a JSON object with a single "score" key. It contains a single integer which represents the total score of the game.
In case the input is invalid, the server will return a HTTP response with status code 400. The content of the body is not important.

## Example

```
$ curl http://localhost:8080/compute \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{"game": [[1,2],[3,4],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0,0]]}'

{"score":10}
```

---

# Optional assignment: Bowling database

The goal is to extend our HTTP server with a `/history` endpoint and persist previously computed games. The database should be a SQLite instance. This will help you by keeping the deployment simple.

The assignment's duration depends on the experience with JavaScript and RDBMS.
Keep in mind that the assignment is optional.

## Input

The input is a HTTP GET request to the `/history` endpoint.
The request contains a query parameter where the "game" key is the identifier of a previously computed game (Read the Output section below).

## Output

The output of the `/compute` endpoint has to be extended. The JSON object should now return two keys. The "score" key remains the same. A new "id" key should return a unique identifier. We recommend to use [uuidv4][uuidv4].

The output of the `/history` endpoint contains the same response body as the `/compute` endpoint. One important caveat is that it fetches the result from persistent storage. It is not sufficient to keep it in an in-memory cache.

## Example

```
$ curl http://localhost:8080/compute \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{"game": [[1,2],[3,4],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0,0]]}'

{"id":"8e2a93f6-3381-450c-b3cd-f2fdde875ac8","score":10}

$ curl http://localhost:8080/history?game=8e2a93f6-3381-450c-b3cd-f2fdde875ac8

{"id":"8e2a93f6-3381-450c-b3cd-f2fdde875ac8","score":10}
```

---

# Getting started

Software is not written from scratch.
Libraries and frameworks are shared among developers to speed up development.
The first step will be to use `yarn`, a package manager, to download these third-party modules.

```
yarn install
```

A `node_modules` directory will appear which contains all dependencies. We can now start our server with the following command:

```
yarn start
```

It is possible to invoke your server with `curl` as shown in the examples above.
Alternatively, you can use any other HTTP client.

> Note: The server will automatically reload when files have been modified.

> Note: It is the `package.json` file which contains the definition of dependencies and scripts.

---

# Tips

- Keep it simple, stupid.
- Keep it readable. Code is read more often than written.

[rules]: https://www.sook.org/wp-content/uploads/2017/08/Bowling-Rules.pdf
[repository]: https://www.github.com/inthepocket
[uuidv4]: https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)
