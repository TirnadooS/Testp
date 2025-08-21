function initTrainer() {
  document.getElementById("shuffle").addEventListener("click", () => {
    const shuffled = words.sort(() => Math.random() - 0.5).slice(0, 10);
    renderWordCards(shuffled);
  });

  document.getElementById("test").addEventListener("click", () => {
    alert("Тестовый режим пока заглушка");
  });

  document.getElementById("dictation").addEventListener("click", () => {
    alert("Диктант пока заглушка");
  });
}
