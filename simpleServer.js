const http = require("http");
const url = require("url");

/////////////////// SERVER

// accepts a callback function which gets fired each time a new request hits our server.
const server = http.createServer((req, res) => {
  const pathName = req.url;
  // OVERVIEW PAGE
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is overview page");
    // PRODUCT PAGE
  } else if (pathName === "/products") {
    res.end("This is a product page");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    // to send status code with response
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found</h1>");
  }
});

// listening to incoming requests.
// callback runs when server starts listening
server.listen(8000, "127.0.0.1", () => {
  console.log("Server has been started");
});
