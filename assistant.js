function initAssistant() {
  const input = document.getElementById("assistant-input");
  const send = document.getElementById("assistant-send");
  const body = document.getElementById("assistant-body");

  send.addEventListener("click", () => {
    const question = input.value.trim();
    if(!question) return;
    appendMessage("Вы", question);
    input.value = "";

    // Простейший ассистент: ищет слово в словаре
    const word = words.find(w => w.no === question || w.ru === question);
    if(word) {
      appendMessage("Ассистент", `Норвежский: ${word.no}, Русский: ${word.ru}`);
      speak(word.no);
    } else {
      appendMessage("Ассистент", "Слово не найдено 😔");
    }
  });

  function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }
}
