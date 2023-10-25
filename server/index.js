const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

function home(res) {
  const home = fs.readFileSync(
    path.join(__dirname, "..", "public", "index.html"),
    { encoding: "utf8" }
  );

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(home);
}

function style(res) {
  fs.readFile(
    path.join(__dirname, "..", "public", "css", "style.css"),
    "utf-8",
    (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    }
  );
}

function car(res) {
  const pathCar = path.join(__dirname, "..", "public", "car.html");
  fs.readFile(pathCar, "utf-8", (err, data) => {
    if (err) throw err;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

function notFound(res) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Not Found!" }));
}

// const contentTypeDefault = {
//   ".css": "text/css",
//   ".jpeg": "image/jpeg",
//   ".jpg": "image/jpg",
//   ".png": "image/png",
//   ".js": "text/javascript",
//   ".svg": "image/svg+xml",
// };

const server = http.createServer((req, res) => {
  console.log(req.url);

  const isImages = req.url.includes("images");
  const isScript = req.url.includes("scripts");

  if (isImages) {
    const fileText = fs.readFileSync(
      path.join(__dirname, "..", "public", req.url)
    );
    res.writeHead(200, { "Content-Type": "image/svg+xml" });
    res.end(fileText);
    return;
  }

  if (isScript) {
    const fileText = fs.readFileSync(
      path.join(__dirname, "..", "public", req.url)
    );
    // console.log(fileText);
    res.writeHead(200, { "Content-Type": "text/javascripts" });
    res.end(fileText);
    return;
  }
  // const publicFolder = ["css", "images", "scripts"];
  // const isAccesingPublicFolder = publicFolder.some((folder) => {
  //   return req.url.includes(folder);
  // });

  // if (isAccesingPublicFolder) {
  //   const fileText = fs.readFileSync(
  //     path.join(__dirname, "..", "public", req.url)
  //   );
  //   const extName = path.extname(req.url);
  //   console.log(contentTypeDefault[extName]);
  //   res.writeHead(200, { "Content-Type": contentTypeDefault[extName] });
  //   res.end(fileText);
  //   return;
  // }

  switch (req.url) {
    case "/css/style.css":
      style(res);
      break;
    case "/":
      home(res);
      break;
    case "/car":
      car(res);
      break;
    default:
      notFound(res);
      break;
  }
});

server.listen(3002);
