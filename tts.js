function speak(word) {
  const utter = new SpeechSynthesisUtterance(word);
  utter.lang = "no-NO";
  speechSynthesis.speak(utter);
}
