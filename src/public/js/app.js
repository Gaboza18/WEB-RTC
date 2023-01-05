const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nickname"); // 닉네임
const messageForm = document.querySelector("#message"); // 메세지
const socket = new WebSocket(`ws://${window.location.host}`); // ' (x) -> `(o)


function makeMessage(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
    console.log("연결 성공!");
});

socket.addEventListener("message", (message) => {
    // console.log("새로운 메세지: ", message.data);

    // 화면에 메세지 내용 표시
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", () => {
    console.log("연결 끊김!");
});

// 메세지 입력
function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = ""; // 메세지 입력칸 초기화
}

// 닉네임 입력
function handleNickSubmit(event) {
    event.preventDefault();
    const input = nicknameForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.value = ""; // 닉네임 입력칸 초기화
}

messageForm.addEventListener("submit", handleSubmit);
nicknameForm.addEventListener("submit", handleNickSubmit);