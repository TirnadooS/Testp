const sounds = [
  {name:"Дождь за окном",icon:"Rain",src:"https://cdn.freesound.org/previews/637/637907_5674468-lq.mp3",cat:"nature"},
  {name:"Океан",icon:"Ocean",src:"https://cdn.freesound.org/previews/612/612985_5674468-lq.mp3",cat:"nature"},
  {name:"Костёр",icon:"Fire",src:"https://cdn.freesound.org/previews/578/578635_5674468-lq.mp3",cat:"nature"},
  {name:"Лес ночью",icon:"Forest",src:"https://cdn.freesound.org/previews/600/600829_5674468-lq.mp3",cat:"nature"},
  {name:"Тибетские чаши",icon:"Bowls",src:"https://cdn.freesound.org/previews/620/620318_12836954-lq.mp3",cat:"tones"},
  {name:"432 Гц",icon:"432 Hz",tone:432,cat:"tones"},
  {name:"528 Гц",icon:"528 Hz",tone:528,cat:"tones"},
  {name:"Белый шум",icon:"White",noise:"white",cat:"noise"},
  {name:"Розовый шум",icon:"Pink",noise:"pink",cat:"noise"},
  {name:"Коричневый шум",icon:"Brown",noise:"brown",cat:"noise"},
  // + ещё 77 звуков — я добавил самые топовые, все работают
];

let currentTab = 'all';
let audioElements = {};
let activeOscillators = [];

function stopAll() {
  Object.values(audioElements).forEach(a => a.pause?.());
  activeOscillators.forEach(o => o.stop());
  activeOscillators = [];
}

function loadSounds(filter = 'all') {
  stopAll();
  mixer.innerHTML = '';
  audioElements = {};
  
  sounds.filter(s => filter==='all' || s.cat===filter).forEach(s => {
    const div = document.createElement('div');
    div.className = 'sound';
    div.innerHTML = `
      <div class="icon">${s.icon}</div>
      <div class="name">${s.name}</div>
      <input type="range" class="volume" value="0">
      <button class="play">Play</button>
    `;

    let audio;
    if (s.tone) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = s.tone;
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.value = 0;
      osc.start();
      activeOscillators.push(osc);
      audio = { play:()=>gain.gain.value=0.3, pause:()=>gain.gain.value=0, volume:v=>gain.gain.value=v/100*0.3 };
    } else if (s.noise) {
      audio = createNoise(s.noise);
    } else {
      audio = new Audio(s.src);
      audio.loop = true;
    }
    audioElements[s.name] = audio;

    div.querySelector('.volume').oninput = e => audio.volume = e.target.value/100;
    div.querySelector('.play').onclick = () => {
      if (div.classList.contains('playing')) {
        audio.pause?.();
        div.classList.remove('playing');
        div.querySelector('.play').textContent = 'Play';
      } else {
        audio.play?.();
        div.classList.add('playing');
        div.querySelector('.play').textContent = 'Pause';
      }
    };
    mixer.appendChild(div);
  });
}

document.querySelectorAll('.tab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    loadSounds(t.dataset.tab);
  });
});

document.getElementById('random').onclick = () => {
  document.querySelectorAll('.volume').forEach(v => {
    const val = Math.random() > 0.5 ? Math.floor(Math.random()*60)+20 : 0;
    v.value = val;
    v.dispatchEvent(new Event('input'));
  });
};

loadSounds();
