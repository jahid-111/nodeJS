const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 8000;

myServer = http.createServer((req, res) => {
  //   if (req.url === "/favicon.ico") return req.end();

  const logReq = `=> user at ${Date.now()} time,   requested :${
    req.url
  } this route \n`;

  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("log.txt", logReq, (error, data) => {
    switch (myUrl.pathname) {
      case "/":
        if (req.method === "GET") {
          res.end("hello Server homePage");
        } else if (req.method === "POST") {
          //DB Query
          res.end("Success POST");
        } else if (req.method === "DELETE") {
          //DB Query
          res.end("Successfully DELETED");
        } else if (req.method === "PATCH") {
          //DB Query
          res.end("Successfully PATCH");
        } else if (req.method === "PUT") {
          //DB Query
          res.end("Successfully PUT");
        }
        break;
      case "/about":
        res.end(`Hey It's me ${myUrl?.query?.name}.  I'm Learning NodeJs`);
        break;
      case "/contact":
        res.end("Email : jahidjob5@outlook.com");
        break;
      case "/search":
        res.end(`You'r Searching about  ${myUrl.query.search_query} ?`);
        break;
      default:
        res.end(" 404 Not Found");
    }
  });
});

myServer.listen(port, () => console.log("On Server"));
