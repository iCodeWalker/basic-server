// ############# CORE MODULES #############
const http = require("http");
const fs = require("fs");
const url = require("url");

// ############# 3rd PARTY MODULES #############
const slugify = require("slugify");

// ############# LOCAL MODULES #############
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

// ############# Create a server ###############
// ############# Accepts a callback function which gets fired each time a new request hits our server.

const server = http.createServer((req, res) => {
  // ##### url.parse is to parse or get data out of the url ####
  // ##### We need to pass "true" as second argument in url.parse() to extract query parameter #####
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    // ############# OVERVIEW PAGE #############
    res.writeHead(200, { "Content-type": "text/html" });

    // #### Replacing placeholder with the data in the card html ####
    const cardsHtml = dataObj
      .map((item, index) => replaceTemplate(tempCard, item))
      .join();

    // #### Replacing card with the placeholder in the overview html ####
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

    // ############# Sends back the response #############
    res.end(output);
  } else if (pathname === "/product") {
    // ############# PRODUCT PAGE #############
    res.writeHead(200, { "Content-type": "text/html" });

    const product = dataObj[query.id];

    const output = replaceTemplate(tempProduct, product);
    // ############# Sends back the response #############
    res.end(output);
  } else if (pathname === "/api") {
    // ############# API PAGE #############
    res.writeHead(200, { "Content-type": "application/json" });
    // ############# In this case every thime when user request data, the data would be fetched from the file and than sent ###############
    // To avoid reading data on every req, we can read the data only once in the starting
    // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
    //   const productData = JSON.parse(data);
    //   res.writeHead(200, { "Content-type": "application/json" });
    //   // console.log(productData);
    //   res.end(data);
    // });
    // ############# Sends back the response #############
    res.end(data);
  } else {
    // ############# To send status code with response #############
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    // ############# Sends back the response #############
    res.end("<h1>Page not found</h1>");
  }
});

// ############# Listening to incoming requests at port 8000 #############
// ############# callback runs when server starts listening #############
server.listen(8000, "127.0.0.1", () => {
  console.log("Server has been started");
});
