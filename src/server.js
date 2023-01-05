import http from "http";
import WebSocket from "ws";
import express, { application } from "express";
import { reset } from "nodemon";
import { connect } from "http2";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log('Listening on http://localhost:3000'); // http, ws 서버 동시처리 가능

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
    console.log("브라우저 연결 성공!");
    socket.on("close", () => console.log("브라우저 연결 끊김!"));
    socket.on("message", (message) => {
        console.log(message.toString('utf-8')); // 한글 오류
    });
    socket.send("Hello~!!");
});

server.listen(3000, handleListen);