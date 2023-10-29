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

const server = http.createServer((req, res) => {
  const isImage = req.url.includes("images");
  const isScript = req.url.includes("scripts");

  function checkImageType(type) {
    const pathImage = fs.readFileSync(
      path.join(__dirname, "..", "public", req.url)
    );
    res.writeHead(200, { "Content-Type": `${type}` });
    res.end(pathImage);
    return;
  }

  if (isImage) {
    const imageExt = path.extname(req.url);
    const typeImage =
      imageExt === ".svg"
        ? checkImageType("image/svg+xml")
        : checkImageType("image/jpg");
    return typeImage;
  }

  if (isScript) {
    const fileText = fs.readFileSync(
      path.join(__dirname, "..", "public", req.url)
    );
    res.writeHead(200, { "Content-Type": "text/javascripts" });
    res.end(fileText);
    return;
  }

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

server.listen(3002, () => {
  console.log("Server running on port : " + 3002);
});
