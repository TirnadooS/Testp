let words = [];

async function loadWords() {
  const res = await fetch("data/a1.json");
  words = await res.json();
}
