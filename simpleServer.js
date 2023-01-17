// CORE MODULES
const http = require("http");
const fs = require("fs");
const url = require("url");

// 3rd PARTY MODULES
const slugify = require("slugify");

// LOCAL MODULES
const replaceTemplate = require("./modules/replaceTemplate");

/////////////////// SERVER ///////////////////

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

// accepts a callback function which gets fired each time a new request hits our server.
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    // OVERVIEW PAGE
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((item, index) => replaceTemplate(tempCard, item))
      .join();

    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

    res.end(output);
  } else if (pathname === "/product") {
    // PRODUCT PAGE
    res.writeHead(200, { "Content-type": "text/html" });

    const product = dataObj[query.id];

    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname === "/api") {
    // API PAGE
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
