const socket = new WebSocket(`ws://${window.location.host}`); // ' (x) -> `(o)

socket.addEventListener("open", () => {
    console.log("브라우저 연결 성공!");
});

socket.addEventListener("message", (message) => {
    console.log("새로운 메세지: ", message.data);
});

socket.addEventListener("close", () => {
    console.log("브라우저 연결 끊김!");
});

setTimeout(() => {
    socket.send("안녕하세요");
}, 10000); // 10초