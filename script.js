// Wake Lock — чтобы звук играл на заблокированном телефоне!
let wakeLock = null;
async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Экран не будет гаснуть');
  } catch (err) { console.log(err); }
}
document.addEventListener('visibilitychange', async () => {
  if (wakeLock !== null && document.visibilityState === 'visible') {
    await requestWakeLock();
  }
});

// Все звуки (40+)
const allSounds = {
  yoga: [
    {name:"Тибетские чаши",icon:"🪷",src:"https://cdn.pixabay.com/download/audio/2023/08/22/audio_2f2b3e8c89.mp3?filename=tibetan-singing-bowls-140633.mp3"},
    {name:"Флейта Бансори",icon:"🎋",src:"https://cdn.pixabay.com/download/audio/2024/03/15/audio_2d9e8b7c6f.mp3?filename=bansuri-flute-117921.mp3"},
    {name:"Мантра Ом",icon:"🕉️",src:"https://cdn.pixabay.com/download/audio/2023/01/27/audio_2e1f3d4c5b.mp3?filename=om-chanting-143392.mp3"},
    {name:"432 Гц",icon:"✨",src:"https://cdn.pixabay.com/download/audio/2024/01/25/audio_1a2f3e4d5c.mp3?filename=432hz-healing-116467.mp3"},
    {name:"528 Гц",icon:"🌟",src:"https://cdn.pixabay.com/download/audio/2024/01/25/audio_8f7g6h5j4k.mp3?filename=528hz-miracle-116468.mp3"},
    {name:"Космос",icon:"🌌",src:"https://cdn.pixabay.com/download/audio/2023/06/22/audio_9e8d7c6b5a.mp3?filename=space-ambience-116469.mp3"},
  ],
  meditation: [
    {name:"Джунгли ночью",icon:"🌴",src:"https://cdn.pixabay.com/download/audio/2023/05/19/audio_5e47e9f886.mp3?filename=jungle-night-140498.mp3"},
    {name:"Пение птиц",icon:"🐦",src:"https://cdn.pixabay.com/download/audio/2023/04/06/audio_9d97c1b0c9.mp3?filename=birds-singing-11378.mp3"},
    {name:"Водопад",icon:"💦",src:"https://cdn.pixabay.com/download/audio/2022/07/28/audio_8f7g6h5j4k.mp3?filename=waterfall-117450.mp3"},
    {name:"Белый шум",icon:"☁️",src:"https://cdn.pixabay.com/download/audio/2023/07/19/audio_1c3c2d4075.mp3?filename=white-noise-105280.mp3"},
    {name:"Бинауральные биты",icon:"🧠",src:"https://cdn.pixabay.com/download/audio/2024/02/14/audio_3f2e1d0c9b.mp3?filename=delta-waves-116470.mp3"},
  ],
  sleep: [
    {name:"Океан",icon:"🌊",src:"https://cdn.pixabay.com/download/audio/2022/03/15/audio_6fb8e6e77e.mp3?filename=ocean-waves-112906.mp3"},
    {name:"Дождь в лесу",icon:"🌧️",src:"https://cdn.pixabay.com/download/audio/2022/08/15/audio_9d97c1b0c9.mp3?filename=rain-ambience-115075.mp3"},
    {name:"Костёр",icon:"🔥",src:"https://cdn.pixabay.com/download/audio/2022/05/26/audio_60d9a4e7e7.mp3?filename=campfire-116466.mp3"},
    {name:"Ручей",icon:"💧",src:"https://cdn.pixabay.com/download/audio/2022/01/18/audio_3c15c72d14.mp3?filename=stream-107872.mp3"},
    {name:"Коричневый шум",icon:"🌰",src:"https://cdn.pixabay.com/download/audio/2023/07/19/audio_1c3c2d4075.mp3?filename=brown-noise-105282.mp3"},
    {name:"Ночной лес",icon:"🌲",src:"https://cdn.pixabay.com/download/audio/2023/05/19/audio_5e47e9f886.mp3?filename=forest-night-140202.mp3"},
  ]
};

let currentTab = 'yoga';
let audioElements = {};
let currentVolumes = {};

const mixer = document.getElementById('mixer');
const presetsDiv = document.getElementById('presets');

function loadTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  mixer.innerHTML = '';
  audioElements = {};
  
  const sounds = allSounds[tab];
  sounds.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'sound';
    div.innerHTML = `
      <div class="icon">${s.icon}</div>
      <div class="name">${s.name}</div>
      <input type="range" class="volume" min="0" max="100" value="0">
      <button class="play">▶</button>
    `;
    
    const audio = new Audio(s.src);
    audio.loop = true;
    audioElements[s.name] = audio;

    const vol = div.querySelector('.volume');
    const btn = div.querySelector('.play');

    vol.addEventListener('input', () => {
      audio.volume = vol.value / 100;
      currentVolumes[s.name] = vol.value;
    });

    btn.addEventListener('click', () => {
      if (btn.textContent === '▶') {
        audio.play();
        btn.textContent = '❚❚';
        requestWakeLock();
      } else {
        audio.pause();
        btn.textContent = '▶';
      }
    });

    mixer.appendChild(div);
  });
}

// Инициализация
loadTab('yoga');
loadPresets();

// Случайный микс
document.getElementById('randomMix').onclick = () => {
  const sounds = Object.keys(audioElements);
  sounds.forEach(name => {
    const el = audioElements[name];
    const rand = Math.random() > 0.5 ? Math.floor(Math.random()*70)+20 : 0;
    el.volume = rand/100;
    document.querySelectorAll('.volume').forEach((v, i) => {
      if (i < sounds.length && sounds[i] === name) v.value = rand;
    });
    if (rand > 0) el.play();
  });
};

// Сохранение миксов
document.getElementById('saveMix').onclick = () => {
  const name = prompt("Назови микс:", "Мой уютный вечер");
  if (!name) return;
  const mix = { tab: currentTab, volumes: {} };
  Object.keys(audioElements).forEach(k => {
    mix.volumes[k] = audioElements[k].volume * 100;
  });
  const presets = JSON.parse(localStorage.getItem('relaxMixes') || '[]');
  presets.push({name, ...mix});
  if (presets.length > 8) presets.shift();
  localStorage.setItem('relaxMixes', JSON.stringify(presets));
  loadPresets();
};

function loadPresets() {
  const presets = JSON.parse(localStorage.getItem('relaxMixes') || '[]');
  presetsDiv.innerHTML = '<h3 style="text-align:center;margin:20px">❤️ Любимые миксы</h3>';
  presets.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'preset-btn';
    btn.textContent = p.name;
    btn.onclick = () => {
      loadTab(p.tab);
      setTimeout(() => {
        Object.keys(p.volumes).forEach(name => {
          if (audioElements[name]) {
            audioElements[name].volume = p.volumes[name] / 100;
            audioElements[name].play();
          }
        });
      }, 500);
    };
    presetsDiv.appendChild(btn);
  });
}

// Переключение вкладок
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => loadTab(tab.dataset.tab));
});
