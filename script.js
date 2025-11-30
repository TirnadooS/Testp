const tabs = document.querySelectorAll('.tab');
const mixer = document.getElementById('mixer');

const sounds = {
  yoga: [
    {name:"Тибетские чаши", icon:"◎", src:"https://cdn.freesound.org/previews/637/637907_5674468-lq.mp3"},
    {name:"Мантра Ом", icon:"ॐ", src:"https://cdn.freesound.org/previews/620/620318_12836954-lq.mp3"},
    {name:"432 Гц", icon:"◉", tone:432},
    {name:"528 Гц", icon:"◉", tone:528},
  ],
  meditation: [
    {name:"Океан", icon:"≈", src:"https://cdn.freesound.org/previews/612/612985_5674468-lq.mp3"},
    {name:"Дождь", icon:"┊", src:"https://cdn.freesound.org/previews/620/620495_12836954-lq.mp3"},
    {name:"Лес", icon:"♣", src:"https://cdn.freesound.org/previews/600/600829_5674468-lq.mp3"},
  ],
  sleep: [
    {name:"Костёр", icon:"△", src:"https://cdn.freesound.org/previews/578/578635_5674468-lq.mp3"},
    {name:"Белый шум", icon:"◼", noise:true},
    {name:"Ручей", icon:"~", src:"https://cdn.freesound.org/previews/599/599818_5674468-lq.mp3"},
  ]
};

let currentAudio = [];

function stopAll() {
  currentAudio.forEach(a => { if(a.pause) a.pause(); if(a.stop) a.stop(); });
  currentAudio = [];
}

function loadTab(tab) {
  stopAll();
  mixer.innerHTML = '';
  sounds[tab].forEach(s => {
    const div = document.createElement('div');
    div.className = 'sound';
    div.innerHTML = `
      <div class='icon'>${s.icon}</div>
      <div class='name'>${s.name}</div>
      <input type='range' class='volume' min='0' max='100' value='0'>
      <button class='play'>▶</button>
    `;
    const audio = s.tone ? createTone(s.tone) : s.noise ? createNoise() : new Audio(s.src);
    audio.loop = true;
    currentAudio.push(audio);

    div.querySelector('.volume').oninput = e => audio.volume = e.target.value/100;
    div.querySelector('.play').onclick = () => {
      if (div.querySelector('.play').textContent === '▶') {
        audio.play();
        div.querySelector('.play').textContent = '❚❚';
      } else {
        audio.pause();
        div.querySelector('.play').textContent = '▶';
      }
    };
    mixer.appendChild(div);
  });
}

tabs.forEach(t => t.onclick = () => {
  tabs.forEach(x => x.classList.remove('active'));
  t.classList.add('active');
  loadTab(t.dataset.tab);
});

document.getElementById('random').onclick = () => {
  document.querySelectorAll('.volume').forEach(v => {
    const val = Math.random() > 0.5 ? Math.floor(Math.random()*60)+20 : 0;
    v.value = val;
    v.dispatchEvent(new Event('input'));
  });
};

loadTab('yoga');
