document.addEventListener("DOMContentLoaded", () => {
  loadWords().then(() => {
    renderWordCards(words);
    initTrainer();
    initAssistant();
  });
});
