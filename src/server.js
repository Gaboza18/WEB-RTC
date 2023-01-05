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

const sockets = []; // 서버에 연결한 (socket)값을 브라우저를 저장한다

wss.on("connection", (socket) => {

    sockets.push(socket);
    socket["nickname"] = "익명";
    console.log("연결 성공!");

    socket.on("close", () => {
        console.log("연결 끊김!"); // 익명함수
    });

    // 자신이 보낸 메세지를 console(개발자 도구) 에서 확인
    socket.on("message", (msg) => {

        const message = JSON.parse(msg); // String 값

        // 서버에 입력한 값
        switch (message.type) {
            case "new_message":
                sockets.forEach((aSocket) => 
                    aSocket.send(`${socket.nickname}: ${message.payload}`)); // 닉네임: 메세지 내용 출력
            case "nickname":
                socket["nickname"] = message.payload; // 닉네임
        }
        // socket.send(message.toString('utf-8')); // 한글 깨짐 해결 message.toString('utf-8')
    });
});

server.listen(3000, handleListen);

{
    type: "message"
    payload: "hello everyone!"
}


{
    type: "nickname"
    payload: "Gaboza18"
}