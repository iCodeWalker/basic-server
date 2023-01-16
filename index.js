const fs = require("fs");

// Blocking / Synchronous way
const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textInput);

const textOutput = `This is new theory about the avacados: ${textInput}.\n Created on ${Date.now()} `;
fs.writeFileSync("./txt/output.txt", textOutput);
console.log("File write is success.");

// Non-blocking / Asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("ERROR !!");
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append/txt", "utf-8", (err, data3) => {
      console.log(data3);
      fs.writeFile(
        "./txt/final.txt",
        `${data2} \n ${data3}`,
        "utf-8",
        (err) => {
          console.log("Your file write is success");
        }
      );
    });
  });
});
console.log("Will start reading file");
