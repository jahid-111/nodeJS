const http = require("http");
const fs = require("fs");

const port = 8000;

myServer = http.createServer((req, res) => {
  const logReq = `=> user at ${Date.now()} time,   requested :${
    req.url
  } this route \n`;
  fs.appendFile("log.txt", logReq, (error, data) => {
    switch (req.url) {
      case "/":
        res.end("hello Server homePage");
        break;
      case "/about":
        res.end("Hey It's me Jahid.  I'm Learning NodeJs");
        break;
      case "/contact":
        res.end("Email : jahidjob5@outlook.com");
        break;
      default:
        res.end(" 404 Not Found");
    }
  });
});

myServer.listen(port, () => console.log("On Server"));
