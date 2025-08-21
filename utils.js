function transliterate(word) {
  return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function renderWordCards(wordList) {
  const container = document.getElementById("word-cards");
  container.innerHTML = "";
  wordList.forEach(w => {
    const div = document.createElement("div");
    div.className = "word-card";
    div.innerHTML = `<strong>${w.no}</strong><br>${w.ru}`;
    div.addEventListener("click", () => speak(w.no));
    container.appendChild(div);
  });
}
