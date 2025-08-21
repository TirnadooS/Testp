// Пример слов (добавим позже весь список до 1000)
const words = [
  { nor: "Hei", ru: "Привет", ruLat: "Хэй" },
  { nor: "Takk", ru: "Спасибо", ruLat: "Такк" },
  { nor: "Ja", ru: "Да", ruLat: "Я" },
  { nor: "Nei", ru: "Нет", ruLat: "Нэй" },
  { nor: "Venn", ru: "Друг", ruLat: "Венн" },
  { nor: "Familie", ru: "Семья", ruLat: "Фамилиэ" }
];

const wordList = document.getElementById("word-list");

// Рисуем карточки слов
words.forEach(w => {
  const card = document.createElement("div");
  card.className = "word-card";
  card.innerHTML = `<div class="word-nor">${w.nor}</div>
                    <div class="word-ru">${w.ru}</div>
                    <div class="word-ru">${w.ruLat}</div>`;
  card.addEventListener("click", () => speakWord(w.nor));
  wordList.appendChild(card);
});

// Озвучка слов
function speakWord(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "no-NO";
  speechSynthesis.speak(utterance);
}

// Ассистент
const assistantInput = document.getElementById("assistant-input");
const assistantSend = document.getElementById("assistant-send");
const assistantBody = document.getElementById("assistant-body");

assistantSend.addEventListener("click", sendMessage);

function sendMessage() {
  const text = assistantInput.value.trim();
  if (!text) return;

  addMessage("Ты: " + text, "user");
  
  let reply = "Я пока учусь, но могу озвучить слово.";
  if (text.toLowerCase().includes("слово")) {
    reply = "Нажми на карточку слова, и я произнесу его вслух.";
  }

  addMessage("🤖: " + reply, "bot");
  assistantInput.value = "";
}

function addMessage(msg, type) {
  const p = document.createElement("p");
  p.textContent = msg;
  assistantBody.appendChild(p);
  assistantBody.scrollTop = assistantBody.scrollHeight;
}
