const http = require("http");
const fs = require("fs");

const host = "127.0.0.1";
const port = 8888;

const server = http.createServer((req, res) => {
    let page = fs.readFileSync(__dirname + "/app/index.html", "utf-8");
    let script = fs.readFileSync(__dirname + "/app/script.js", "utf-8");
    let style = fs.readFileSync(__dirname + "/app/style.css", "utf-8");

    page = page.replace("/*script*/", script);
    page = page.replace("/*style*/", style)

    res.end(page);
});

server.listen(port, host, () => {
    console.log(`Server initialized at http://${host}:${port}.`);
});