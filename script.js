let wakeLock = null;
let timerId = null;
async function requestWakeLock() {
  if ('wakeLock' in navigator) try { wakeLock = await navigator.wakeLock.request('screen'); } catch(e) {}
}
document.addEventListener('visibilitychange', () => { if (!document.hidden && wakeLock) requestWakeLock(); });

const allSounds = {
  yoga: [
    {name: "Тибетские чаши", icon: "🪷", src: "https://archive.org/download/naturesounds-soundtheraphy/Birds%20With%20Ocean%20Waves%20on%20the%20Beach.mp3"},
    {name: "Флейта Бансори", icon: "🎋", src: "https://archive.org/download/relaxingrainsounds/Relaxing%20Music%20-%20Flute%2C%20Gentle%20Birds%20and%20Rainforest%20Sound%20-%20YouTube.mp3"},
    {name: "Мантра Ом", icon: "🕉️", src: "https://archive.org/download/jamendo-082208/Rain%20Surround.mp3"},
    {name: "432 Гц", icon: "✨", generate: true},
    {name: "528 Гц", icon: "🌟", generate: true},
    {name: "Космос", icon: "🌌", src: "https://archive.org/download/naturesounds-soundtheraphy/Sound%20Therapy%20-%20Sea%20Storm.mp3"},
    {name: "Колокольчики", icon: "🔔", src: "https://archive.org/download/relaxingrainsounds/8%20HOURS%20Gentle%20Music%20of%20Falling%20Water%20and%20Birds%27%20Songs.mp3"},
    {name: "Альфа-волны", icon: "🧠", generate: true},
    {name: "Гамма-волны", icon: "⚡", generate: true},
    {name: "Йога-дыхание", icon: "🌬️", generate: true},
    {name: "Харпа", icon: "🎶", src: "https://archive.org/download/birdsounds_202001/13.1M%20bird%20sounds%20.mp3"},
    {name: "Медитация флейта", icon: "🎵", src: "https://archive.org/download/relaxingsounds/Forest%20Surround.mp3"},
    {name: "Расслабление", icon: "🧘", src: "https://archive.org/download/nature-sounds_202104/%5BMP3FY.COM%5D%20Nature%20Sounds%20Forest%20Sounds%20Birds%20Singing%20Sound%20of%20Water-Relaxation-Mindfulness-Meditation.mp3"},
    {name: "Тибет", icon: "🏔️", src: "https://archive.org/download/relaxingsounds/Forest%20Surround.mp3"},
    {name: "Чакры", icon: "🔮", generate: true}
  ],
  meditation: [
    {name: "Джунгли ночью", icon: "🌴", src: "https://archive.org/download/relaxingsounds/Rainforest%205h%20Bubbling%20River%20Falls%28gentle%29%2CBirds%2CInsects%2CAnimals-Daytime%2CSouth%20America.mp3"},
    {name: "Пение птиц", icon: "🐦", src: "https://archive.org/download/nature-sounds_202104/%5BMP3FY.COM%5D%20Nature%20Sounds%20Forest%20Sounds%20Birds%20Singing%20Sound%20of%20Water-Relaxation-Mindfulness-Meditation.mp3"},
    {name: "Водопад", icon: "💦", src: "https://archive.org/download/8-hours-of-waterfall-peaceful-sounds/8%20HOURS%20Calming%20Sounds%20of%20a%20Forest%20Stream%20and%20Bird%20Songs.mp3"},
    {name: "Белый шум", icon: "☁️", generate: 'white'},
    {name: "Бинауральные биты", icon: "🧠", generate: true},
    {name: "Ветер в горах", icon: "💨", src: "https://archive.org/download/relaxingsounds/Snowfall%20%26%20Wind%28Lite%29%2010h%20Dusk%20into%20Night-Forest.mp3"},
    {name: "Киты", icon: "🐋", src: "https://archive.org/download/naturesounds-soundtheraphy/Birds%20With%20Ocean%20Waves%20on%20the%20Beach.mp3"},
    {name: "Лягушки", icon: "🐸", src: "https://archive.org/download/relaxingrainsounds/8%20HOURS%20Relaxing%20Jungle%20Stream%20%2B%20Exotic%20Bird%20Songs%20in%20Tropical%20Rainforest.mp3"},
    {name: "Розовый шум", icon: "🌸", generate: 'pink'},
    {name: "Город ночью", icon: "🌃", src: "https://archive.org/download/jamendo-082208/Night%20Surround.mp3"},
    {name: "Тропический дождь", icon: "🌧️", src: "https://archive.org/download/RelaxingRainAndLoudThunderFreeFieldRecordingOfNatureSoundsForSleepOrMeditation/8.1M%20Relaxing%20Rain%20and%20Loud%20Thunder%20%28Free%20Field%20Recording%20of%20Nature%20Sounds%20for%20Sleep%20or%20Meditation%20Mp3%29.mp3"},
    {name: "Птицы в лесу", icon: "🌳", src: "https://archive.org/download/birdsounds_202001/13.1M%20bird%20sounds%20.mp3"},
    {name: "Ручей в лесу", icon: "💧", src: "https://archive.org/download/8-hours-of-waterfall-peaceful-sounds/8%20HOURS%20Calming%20Sounds%20of%20a%20Forest%20Stream%20and%20Bird%20Songs.mp3"},
    {name: "Ветер листья", icon: "🍃", src: "https://archive.org/download/relaxingsounds/Forest%20Surround.mp3"},
    {name: "Медитация океан", icon: "🌊", src: "https://archive.org/download/ocean-sea-sounds/19.3M%20Those_Relaxing_Sounds_of_Waves_-_Ocean_Sounds_1080p_HD_Video_with_Tropical_Beaches%20Part%201.mp3"}
  ],
  sleep: [
    {name: "Океан", icon: "🌊", src: "https://archive.org/download/8-hours-of-waterfall-peaceful-sounds/8%20HOURS%20Ocean%20Waves%20Sounds%20for%20Sleep%20Better.mp3"},
    {name: "Дождь в лесу", icon: "🌧️", src: "https://archive.org/download/naturesounds-soundtheraphy/Light%20Gentle%20Rain.mp3"},
    {name: "Костёр", icon: "🔥", src: "https://archive.org/download/relaxingsounds/Thunder%205%205h%20Fierce%2CRain-no%20wind.ogg"},
    {name: "Ручей", icon: "💧", src: "https://archive.org/download/nature-sounds_202104/%5BMP3FY.COM%5D%20Relaxing%20River%20Sounds%20-%20Gentle%20River%2C%20Nature%20Sounds%2C%20Singing%20Birds%20Ambience.mp3"},
    {name: "Коричневый шум", icon: "🌰", generate: 'brown'},
    {name: "Ночной лес", icon: "🌲", src: "https://archive.org/download/relaxingsounds/Forest%20Surround.mp3"},
    {name: "Вентилятор", icon: "🌀", generate: 'fan'},
    {name: "Поезд ночью", icon: "🚂", src: "https://archive.org/download/8-hours-of-waterfall-peaceful-sounds/8%20HRS%20Soothing%20Sounds%20of%20a%20Spring%20Lake%20for%20Relaxation%20-%20Gentle%20Water%20Sounds%20and%20Spring%20Birds%20Chirping.mp3"},
    {name: "Океан волны", icon: "🏖️", src: "https://archive.org/download/ocean-sea-sounds/21.1M%20Those_Relaxing_Sounds_of_Waves_-_Ocean_Sounds_1080p_HD_Video_with_Tropical_Beaches%20Part%202.mp3"},
    {name: "Дождь сильный", icon: "⛈️", src: "https://archive.org/download/RelaxingRainAndLoudThunderFreeFieldRecordingOfNatureSoundsForSleepOrMeditation/8.1M%20Relaxing%20Rain%20and%20Loud%20Thunder%20%28Free%20Field%20Recording%20of%20Nature%20Sounds%20for%20Sleep%20or%20Meditation%20Mp3%29.mp3"},
    {name: "Лес ночью", icon: "🌙", src: "https://archive.org/download/relaxingsounds/Rainforest%205h%20Bubbling%20River%20Falls%28gentle%29%2CBirds%2CInsects%2CAnimals-Daytime%2CSouth%20America.mp3"},
    {name: "Шум ветра", icon: "🌪️", src: "https://archive.org/download/relaxingsounds/Snowfall%20%26%20Wind%28Lite%29%2010h%20Dusk%20into%20Night-Forest.mp3"},
    {name: "Костёр треск", icon: "🪵", src: "https://archive.org/download/relaxingsounds/Thunder%205%205h%20Fierce%2CRain-no%20wind.ogg"},
    {name: "Спокойный океан", icon: "🌅", src: "https://archive.org/download/naturesounds-soundtheraphy/Birds%20With%20Ocean%20Waves%20on%20the%20Beach.mp3"},
    {name: "Ночной дождь", icon: "🌧️", src: "https://archive.org/download/naturesounds-soundtheraphy/Light%20Gentle%20Rain.mp3"}
  ]
};

let currentTab = 'yoga';
let audioElements = {};
let volumes = {};

const mixer = document.getElementById('mixer');
const presetsDiv = document.getElementById('presets');
const visualizer = document.getElementById('visualizer');
const search = document.getElementById('search');

// Анимация фона (облака + дождь)
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let clouds = [];
for (let i = 0; i < 5; i++) clouds.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height/2, speed: Math.random()*0.5 + 0.2});
function animateBg() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Облака
  clouds.forEach(cloud => {
    ctx.beginPath();
    ctx.arc(cloud.x, cloud.y, 30, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fill();
    cloud.x += cloud.speed;
    if (cloud.x > canvas.width) cloud.x = -50;
  });
  // Капли дождя (простые линии)
  for (let i = 0; i < 50; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 10);
    ctx.strokeStyle = 'rgba(168,230,207,0.5)';
    ctx.stroke();
  }
  requestAnimationFrame(animateBg);
}
animateBg();

// Генерация аудио
function createAudio(src, generate) {
  if (generate) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    gainNode.gain.value = 0.3;
    oscillator.start();
    return { play: () => {}, pause: () => {}, volume: 0.3 };
  }
  const audio = new Audio(src);
  audio.loop = true;
  audio.preload = 'auto';
  audio.crossOrigin = 'anonymous';
  return audio;
}

function loadTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  mixer.innerHTML = '';
  audioElements = {};
  const sounds = allSounds[tab];
  sounds.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'sound show';
    div.innerHTML = `
      <div class="icon">${s.icon}</div>
      <div class="name">${s.name}</div>
      <input type="range" class="volume" min="0" max="100" value="0">
      <button class="play">▶</button>
    `;
    const audio = createAudio(s.src, s.generate);
    audioElements[i] = audio;
    const vol = div.querySelector('.volume');
    const btn = div.querySelector('.play');
    vol.addEventListener('input', (e) => { 
      audio.volume = e.target.value / 100; 
      volumes[i] = e.target.value;
      updateVisualizer();
    });
    btn.addEventListener('click', () => {
      if (btn.textContent === '▶') {
        audio.play().catch(e => console.log('Audio error:', e));
        btn.textContent = '⏸';
        requestWakeLock();
      } else {
        audio.pause();
        btn.textContent = '▶';
      }
      updateVisualizer();
    });
    mixer.appendChild(div);
  });
  filterSounds();
}

// Фикс вкладок
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    loadTab(tab.dataset.tab);
  });
});

// Поиск
search.addEventListener('input', filterSounds);
function filterSounds() {
  const query = search.value.toLowerCase();
  document.querySelectorAll('.sound').forEach(el => {
    const name = el.querySelector('.name').textContent.toLowerCase();
    el.classList.toggle('show', name.includes(query));
  });
}

// Визуализатор
function updateVisualizer() {
  visualizer.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = (Math.random() * 40 + 10) + 'px';
    visualizer.appendChild(bar);
  }
}

// Рандом микс (бесконечный)
document.getElementById('randomMix').onclick = () => {
  Object.keys(audioElements).forEach(key => {
    const audio = audioElements[key];
    const vol = Math.random() > 0.6 ? (Math.random() * 50 + 20) : 0;
    audio.volume = vol / 100;
    const sliders = document.querySelectorAll('.volume');
    if (sliders[key]) sliders[key].value = vol;
    if (vol > 0) {
      audio.play();
      document.querySelectorAll('.play')[key].textContent = '⏸';
    }
  });
  updateVisualizer();
};

// Таймер
document.getElementById('timerBtn').onclick = () => document.getElementById('timer').classList.toggle('show');
document.getElementById('startTimer').onclick = () => {
  const time = parseInt(document.getElementById('timerSelect').value) * 1000;
  if (timerId) clearTimeout(timerId);
  timerId = setTimeout(() => {
    Object.values(audioElements).forEach(a => a.pause());
    document.querySelectorAll('.play').forEach(b => b.textContent = '▶');
    alert('Таймер завершён! 🌙');
  }, time);
};

// Сохранение
document.getElementById('saveMix').onclick = () => {
  const name = prompt("Название:", `Микс ${new Date().toLocaleTimeString()}`);
  if (name) {
    const mix = { tab: currentTab, volumes: {...volumes} };
    let presets = JSON.parse(localStorage.getItem('mixes') || '[]');
    presets.push({name, ...mix});
    if (presets.length > 8) presets.shift();
    localStorage.setItem('mixes', JSON.stringify(presets));
    loadPresets();
  }
};

function loadPresets() {
  presetsDiv.innerHTML = '<h3>💾 Миксы</h3>';
  const presets = JSON.parse(localStorage.getItem('mixes') || '[]');
  presets.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'preset-btn';
    btn.textContent = p.name;
    btn.onclick = () => {
      loadTab(p.tab);
      setTimeout(() => {
        Object.keys(p.volumes).forEach((k, i) => {
          if (audioElements[i]) {
            audioElements[i].volume = p.volumes[k] / 100;
            const slider = document.querySelectorAll('.volume')[i];
            if (slider) slider.value = p.volumes[k];
            if (p.volumes[k] > 0) {
              audioElements[i].play();
              document.querySelectorAll('.play')[i].textContent = '⏸';
            }
          }
        });
        updateVisualizer();
      }, 300);
    };
    presetsDiv.appendChild(btn);
  });
}

// Запуск
loadTab('yoga');
loadPresets();
updateVisualizer();
requestWakeLock();
