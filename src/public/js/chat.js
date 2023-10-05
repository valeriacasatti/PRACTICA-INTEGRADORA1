const socketClient = io();

const username = document.getElementById("username");
const inputMsg = document.getElementById("inputMsg");
const sendMsg = document.getElementById("sendMsg");
const chatPanel = document.getElementById("chatPanel");

let user;

Swal.fire({
  title: "ENTER YOUR USERNAME",
  input: "text",
  confirmButtonText: "OK",
  confirmButtonColor: "000000",
  inputValidator: (value) => {
    return !value && "please enter your username";
  },
  allowOutsideClick: false,
  allowEscapeKey: false,
})
  .then((inputValue) => {
    user = inputValue.value;
    username.innerHTML = user;
    socketClient.emit("authenticated", user);
  })
  .then(() => {
    if (user) {
      Swal.fire({
        title: `Bienvenidx ${user}! 😊`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  });

sendMsg.addEventListener("click", () => {
  const message = { user, message: inputMsg.value };
  socketClient.emit("messageChat", message);
  inputMsg.value = "";
});

socketClient.on("chatHistory", (data) => {
  let msgElements = "";
  data.forEach((el) => {
    msgElements += `<div class="chatMsgs"><span>${el.user}</span>
    <p>${el.message}</p></div>`;
  });
  chatPanel.innerHTML = msgElements;
});

socketClient.on("newUser", (data) => {
  if (user) {
    Swal.fire({
      text: data,
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timer: 1000,
    });
  }
});
