/* ============================
   GRADE 3 LEARNING — JAVASCRIPT
   ============================ */

// ===== ANIMALS LIST =====
const animals = [
  { emoji: '🐘', name: 'elephant' },
  { emoji: '🦁', name: 'lion' },
  { emoji: '🐬', name: 'dolphin' },
  { emoji: '🐧', name: 'penguin' },
  { emoji: '🦊', name: 'fox' },
  { emoji: '🐨', name: 'koala' },
  { emoji: '🦋', name: 'butterfly' },
  { emoji: '🐢', name: 'turtle' },
  { emoji: '🦒', name: 'giraffe' },
  { emoji: '🐺', name: 'wolf' },
];

let currentAnimalIndex = 0;

// ===== FEEDBACK MESSAGES =====
const feedbackMessages = [
  { emoji: '🎉', title: 'Good job!', subtitle: 'You\'re doing amazing!' },
  { emoji: '🌟', title: 'Amazing!', subtitle: 'Keep up the great work!' },
  { emoji: '💪', title: 'You can do it!', subtitle: 'Wonderful effort!' },
  { emoji: '⭐', title: 'Fantastic!', subtitle: 'You\'re a star learner!' },
  { emoji: '🏆', title: 'Excellent!', subtitle: 'You\'re a champion!' },
];

let currentActivity = 'writing';
const activityOrder = ['writing', 'drawing', 'reading', 'speaking', 'vocabulary'];

// ===== AUDIO EFFECTS (SFX) =====
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function initAudio() {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playPopSound() {
  initAudio();
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(400, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}

function playDingDongSound() {
  initAudio();
  if (!audioCtx) return;
  const playTone = (freq, startTime, duration) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
  };
  const now = audioCtx.currentTime;
  playTone(523.25, now, 0.4); // C5
  playTone(659.25, now + 0.2, 0.6); // E5
}

function playErrorSound() {
  initAudio();
  if(!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(150, audioCtx.currentTime);
  osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

function playActivitySound(activity) {
  initAudio();
  if (!audioCtx) return;
  const playTone = (freq, type, startTime, duration, vol=0.2) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(vol, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  const now = audioCtx.currentTime;
  if (activity === 'writing') {
    playTone(600, 'square', now, 0.1, 0.1);
    playTone(800, 'square', now + 0.15, 0.1, 0.1);
  } else if (activity === 'drawing') {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.linearRampToValueAtTime(600, now + 0.3);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.3);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (activity === 'reading') {
    playTone(400, 'triangle', now, 0.2);
    playTone(500, 'triangle', now + 0.05, 0.2);
    playTone(600, 'triangle', now + 0.1, 0.2);
  } else if (activity === 'speaking') {
    playTone(300, 'sine', now, 0.15);
    playTone(450, 'sine', now + 0.2, 0.15);
  } else if (activity === 'vocabulary') {
    playTone(500, 'square', now, 0.1, 0.1);
    playTone(400, 'square', now + 0.1, 0.1, 0.1);
    playTone(600, 'square', now + 0.2, 0.1, 0.1);
  } else if (activity === 'challenge') {
    playTone(440, 'sawtooth', now, 0.4, 0.1);
    playTone(554.37, 'sawtooth', now, 0.4, 0.1);
    playTone(659.25, 'sawtooth', now, 0.4, 0.1);
  }
}

// ===== FOXY THE FOX & PERSISTENCE =====
let foxyStarsCompleted = new Set();
const foxyMessages = {
  'home': "Hi! I’m Foxy! Let’s explore English together!",
  'characters': "These are my friends! They will help us learn!",
  'menu': "Wow! So many adventures! Where do we go first?",
  'activity-writing': "Let's write something together! Time to create ideas!",
  'activity-drawing': "Show me your creativity! I love drawing!",
  'activity-reading': "Let's discover a story! Books are magical!",
  'activity-speaking': "Don't be shy! You can do it! I want to hear you!",
  'activity-vocabulary': "Let's find the correct word! Match them up!",
  'challenge': "Wow! This is a big challenge! You've got this!",
  'planning': "This is the instructional map of our journey!"
};

function saveProgress() {
  localStorage.setItem('foxyProgress', JSON.stringify(Array.from(foxyStarsCompleted)));
}

function loadProgress() {
  const saved = localStorage.getItem('foxyProgress');
  if (saved) {
    const arr = JSON.parse(saved);
    arr.forEach(id => foxyStarsCompleted.add(id));
    
    let foxyStars = foxyStarsCompleted.size;
    const countEl = document.getElementById('foxy-stars-count');
    if (countEl) countEl.textContent = foxyStars;
    
    if (foxyStars === 6) {
       document.getElementById('nav-cert-btn')?.classList.remove('hidden');
    }
  }
}

function awardFoxyStar(activityId) {
  if (!foxyStarsCompleted.has(activityId)) {
    foxyStarsCompleted.add(activityId);
    saveProgress();
    playDingDongSound();
    
    let foxyStars = foxyStarsCompleted.size;
    const countEl = document.getElementById('foxy-stars-count');
    if (countEl) countEl.textContent = foxyStars;
    
    const foxyEl = document.getElementById('foxy-progress');
    if (foxyEl) {
      foxyEl.style.transform = 'scale(1.15)';
      foxyEl.style.transition = 'transform 0.3s';
      setTimeout(() => { foxyEl.style.transform = 'scale(1)'; }, 300);
    }
    
    if (foxyStars === 6) {
       document.getElementById('nav-cert-btn')?.classList.remove('hidden');
       setTimeout(() => {
         updateFoxyMessage("Wow! You got all 6 stars! You completed the journey! 🎉");
         document.getElementById('certificate-modal')?.classList.remove('hidden');
       }, 1500);
    }
  }
}

function updateFoxyMessage(text) {
  const guide = document.getElementById('foxy-floating-guide');
  const guideText = document.getElementById('foxy-guide-text');
  if (!guide || !guideText) return;
  
  guide.classList.remove('visible');
  setTimeout(() => {
    guideText.textContent = text;
    guide.classList.add('visible');
  }, 400);
}

// Ensure first message is loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => updateFoxyMessage(foxyMessages['home']), 500);
});

// ===== SECTION NAVIGATION =====
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (foxyMessages[id]) updateFoxyMessage(foxyMessages[id]);
    if (id === 'challenge') playActivitySound('challenge');
  }
}

function showActivity(type) {
  currentActivity = type;
  showSection('activity-' + type);
  playActivitySound(type);
}

// ===== MOBILE NAV =====
function toggleMobileNav() {
  const links = document.querySelector('.nav-links');
  links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  links.style.flexDirection = 'column';
  links.style.position = 'absolute';
  links.style.top = '64px';
  links.style.right = '0';
  links.style.background = 'rgba(15,10,30,0.98)';
  links.style.padding = '1rem';
  links.style.borderRadius = '0 0 16px 16px';
  links.style.zIndex = '999';
}

// ===== CHARACTER INTERACTIONS =====
function helloLaura() {
  const response = document.getElementById('laura-hello-response');
  response.classList.remove('hidden');
  response.style.animation = 'fadeInUp 0.4s ease';
  const btn = document.querySelector('.laura-btn');
  if(btn) {
    btn.textContent = '💜 Nice to meet you!';
    btn.disabled = true;
    btn.style.opacity = '0.7';
  }
}

function helloDanny() {
  const response = document.getElementById('danny-hello-response');
  response.classList.remove('hidden');
  response.style.animation = 'fadeInUp 0.4s ease';
  const btn = document.querySelector('.daniel-btn');
  if(btn) {
    btn.textContent = '💜 Nice to meet you!';
    btn.disabled = true;
    btn.style.opacity = '0.7';
  }
}

function selectLike(btn, message) {
  document.querySelectorAll('.like-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const response = document.getElementById('laura-response');
  response.textContent = '💕 Laura says: ' + message;
  response.classList.remove('hidden');
}

function danielActivity(message) {
  const response = document.getElementById('daniel-response');
  response.textContent = '🧸 ' + message;
  response.classList.remove('hidden');
  response.style.animation = 'fadeInUp 0.4s ease';
}

// ===== WRITING ACTIVITY =====
function checkWriting() {
  const s1 = document.getElementById('sentence1').value.trim();
  const s2 = document.getElementById('sentence2').value.trim();
  const s3 = document.getElementById('sentence3').value.trim();

  const feedback = document.getElementById('writing-feedback');

  if (!s1 || !s2 || !s3) {
    feedback.classList.remove('hidden');
    feedback.classList.add('error');
    feedback.innerHTML = '✏️ Please write all 3 sentences before checking!';
    playErrorSound();
    return;
  }

  const sentenceCount = [s1, s2, s3].filter(s => s.length > 5).length;

  feedback.classList.remove('hidden', 'error');
  if (sentenceCount === 3) {
    feedback.innerHTML = '🎉 Excellent! Your 3 sentences look great! Well done!';
    awardFoxyStar('writing');
    setTimeout(() => showFeedbackModal('writing'), 600);
  } else {
    feedback.innerHTML = '🌟 Good try! Try to write longer sentences with more details.';
    playErrorSound();
  }
}

function changeAnimal() {
  currentAnimalIndex = (currentAnimalIndex + 1) % animals.length;
  const animal = animals[currentAnimalIndex];
  const emojiEl = document.getElementById('animal-emoji');
  emojiEl.style.animation = 'none';
  emojiEl.textContent = animal.emoji;
  setTimeout(() => { emojiEl.style.animation = ''; }, 10);

  // Clear inputs and feedback
  ['sentence1','sentence2','sentence3'].forEach(id => document.getElementById(id).value = '');
  const fb = document.getElementById('writing-feedback');
  fb.classList.add('hidden');
  fb.innerHTML = '';
}

// ===== DRAWING ACTIVITY =====
let isDrawing = false;
let currentColor = '#333';
let currentBrush = 10;
let ctx, challengeCtx;

function initCanvas() {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = currentBrush;

  const draw = (e) => {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    ctx.lineTo((clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY);
    ctx.stroke();
  };

  const startDraw = (e) => {
    e.preventDefault();
    isDrawing = true;
    ctx.beginPath();
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    ctx.moveTo((clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY);
  };

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', () => { isDrawing = false; });
  canvas.addEventListener('mouseleave', () => { isDrawing = false; });
  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', () => { isDrawing = false; });
}

function initChallengeCanvas() {
  const canvas = document.getElementById('challengeCanvas');
  if (!canvas) return;
  challengeCtx = canvas.getContext('2d');
  challengeCtx.fillStyle = '#ffffff';
  challengeCtx.fillRect(0, 0, canvas.width, canvas.height);
  challengeCtx.lineCap = 'round';
  challengeCtx.lineJoin = 'round';
  challengeCtx.strokeStyle = '#333';
  challengeCtx.lineWidth = 8;

  let challengeDrawing = false;
  let challengeColor = '#333';

  const draw = (e) => {
    if (!challengeDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    challengeCtx.lineTo((clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY);
    challengeCtx.stroke();
  };

  const startDraw = (e) => {
    e.preventDefault();
    challengeDrawing = true;
    challengeCtx.beginPath();
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    challengeCtx.moveTo((clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY);
  };

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', () => { challengeDrawing = false; });
  canvas.addEventListener('mouseleave', () => { challengeDrawing = false; });
  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', () => { challengeDrawing = false; });

  // Store color setter on canvas element
  canvas._setColor = (c) => {
    challengeColor = c;
    challengeCtx.strokeStyle = c;
  };
}

function setColor(color) {
  currentColor = color;
  if (ctx) {
    ctx.strokeStyle = color;
    ctx.lineWidth = currentBrush;
  }
}

function setBrush(size) {
  currentBrush = size;
  if (ctx) ctx.lineWidth = size;
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  if (size === 4) document.getElementById('size-sm').classList.add('active');
  else if (size === 10) document.getElementById('size-md').classList.add('active');
  else document.getElementById('size-lg').classList.add('active');
}

function clearCanvas() {
  if (!ctx) return;
  const canvas = document.getElementById('drawingCanvas');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setChallengeColor(color) {
  const canvas = document.getElementById('challengeCanvas');
  if (canvas && canvas._setColor) canvas._setColor(color);
  if (challengeCtx) challengeCtx.strokeStyle = color;
}

function clearChallengeCanvas() {
  if (!challengeCtx) return;
  const canvas = document.getElementById('challengeCanvas');
  challengeCtx.clearRect(0, 0, canvas.width, canvas.height);
  challengeCtx.fillStyle = '#ffffff';
  challengeCtx.fillRect(0, 0, canvas.width, canvas.height);
}

function checkDrawing() {
  const s1 = document.getElementById('draw-sentence1').value.trim();
  const s2 = document.getElementById('draw-sentence2').value.trim();
  const feedback = document.getElementById('drawing-feedback');

  if (!s1 || !s2) {
    feedback.classList.remove('hidden');
    feedback.classList.add('error');
    feedback.innerHTML = '✏️ Please write both sentences about your drawing!';
    return;
  }

  feedback.classList.remove('hidden', 'error');
  feedback.innerHTML = '🎨 Wonderful! Your drawing and description are amazing!';
  awardFoxyStar('drawing');
  setTimeout(() => showFeedbackModal('drawing'), 600);
}

// ===== READING ACTIVITY =====
const correctAnswers = { 1: 'b', 2: 'b', 3: 'a' };
let readingAnswers = {};

function selectReadingAnswer(qNum, element, isCorrect) {
  playPopSound();
  const block = document.getElementById('q' + qNum + '-block');
  const btns = block.querySelectorAll('.answer-btn');
  // Deselect all
  btns.forEach(b => {
    b.classList.remove('correct', 'wrong');
    b.disabled = true;
  });

  readingAnswers[qNum] = element.dataset.answer;
  if (isCorrect) {
    element.classList.add('correct');
    const resultEl = document.getElementById('q' + qNum + '-result');
    resultEl.classList.remove('hidden');
    resultEl.innerHTML = '✅ Correct! Well done!';
    resultEl.style.color = '#6ee7b7';
  } else {
    element.classList.add('wrong');
    document.getElementById('q' + qNum + correctAnswers[qNum]).classList.add('correct');
    const resultEl = document.getElementById('q' + qNum + '-result');
    resultEl.classList.remove('hidden');
    resultEl.innerHTML = '❌ Not quite! The correct answer is highlighted.';
    resultEl.style.color = '#fca5a5';
  }
}

function checkReading() {
  const scoreEl = document.getElementById('reading-score');
  scoreEl.classList.remove('hidden', 'error');

  if (Object.keys(readingAnswers).length < 3) {
    scoreEl.classList.add('error');
    scoreEl.innerHTML = '⚠️ Please answer all 3 questions first!';
    playErrorSound();
    return;
  }

  const score = Object.entries(readingAnswers)
    .filter(([q, a]) => correctAnswers[q] === a).length;

  const messages = [
    { score: 3, msg: '🏆 Perfect score! 3/3 — You\'re a reading star!' },
    { score: 2, msg: '🌟 Great job! 2/3 — Almost perfect!' },
    { score: 1, msg: '💪 Good effort! 1/3 — Keep practicing!' },
    { score: 0, msg: '📖 Keep reading! 0/3 — You\'ll get better!' },
  ];

  const entry = messages.find(m => m.score === score) || messages[3];
  scoreEl.innerHTML = entry.msg;

  if (score === 3) {
    playActivitySound();
    awardFoxyStar('reading');
  } else {
    playErrorSound();
  }

  setTimeout(() => showFeedbackModal('reading'), 800);
}

function resetReading() {
  readingAnswers = {};
  for (let i = 1; i <= 3; i++) {
    const btns = document.querySelectorAll('#q' + i + '-block .answer-btn');
    btns.forEach(b => { b.disabled = false; b.classList.remove('correct', 'wrong'); });
    const res = document.getElementById('q' + i + '-result');
    res.classList.add('hidden');
    res.innerHTML = '';
  }
  document.getElementById('reading-score').classList.add('hidden');
}

// ===== SPEAKING ACTIVITY =====
let speakingInterval = null;
let isSpeaking = false;
let speakingTimeLeft = 30;

function toggleSpeaking() {
  if (isSpeaking) {
    stopSpeaking();
  } else {
    startSpeaking();
  }
}

function startSpeaking() {
  isSpeaking = true;
  speakingTimeLeft = 30;
  const btn = document.getElementById('mic-btn');
  const icon = document.getElementById('mic-icon');
  const label = document.getElementById('mic-label');
  const timer = document.getElementById('speaking-timer');
  const waves = document.getElementById('speaking-waves');
  const feedback = document.getElementById('speaking-feedback');

  btn.classList.add('recording');
  icon.textContent = '⏹️';
  label.textContent = 'Stop';
  timer.classList.remove('hidden');
  waves.classList.remove('hidden');
  feedback.classList.add('hidden');
  document.getElementById('timer-count').textContent = speakingTimeLeft;

  speakingInterval = setInterval(() => {
    speakingTimeLeft--;
    document.getElementById('timer-count').textContent = speakingTimeLeft;
    if (speakingTimeLeft <= 0) {
      stopSpeaking(true);
    }
  }, 1000);
}

function stopSpeaking(completed = false) {
  isSpeaking = false;
  clearInterval(speakingInterval);

  const btn = document.getElementById('mic-btn');
  const icon = document.getElementById('mic-icon');
  const label = document.getElementById('mic-label');
  const timer = document.getElementById('speaking-timer');
  const waves = document.getElementById('speaking-waves');
  const feedback = document.getElementById('speaking-feedback');

  btn.classList.remove('recording');
  icon.textContent = '🎤';
  label.textContent = 'Start Speaking';
  timer.classList.add('hidden');
  waves.classList.add('hidden');

  feedback.classList.remove('hidden', 'error');
  if (completed) {
    feedback.innerHTML = '🎉 Wow! You spoke clearly and confidently! Great job!';
    playActivitySound();
    awardFoxyStar('speaking');
    setTimeout(() => showFeedbackModal('speaking'), 800);
  } else {
    feedback.classList.add('error');
    feedback.innerHTML = '❌ Recording stopped. Try to speak for a bit longer!';
    playErrorSound();
  }
}

// ===== ANIMAL SELECTOR (SPEAKING) =====
function selectAnimal(emoji, name) {
  playPopSound();
  document.querySelectorAll('.animal-opt').forEach(b => b.classList.remove('selected'));
  event.target.classList.add('selected');
  const display = document.getElementById('selected-animal-display');
  display.classList.remove('hidden');
  display.innerHTML = `${emoji} Talk about a <strong>${name}</strong>! 🎤`;
}

// ===== CHALLENGE SUBMISSIONS =====
function submitWritingChallenge() {
  const inputs = [
    document.getElementById('ch1').value.trim(),
    document.getElementById('ch2').value.trim(),
    document.getElementById('ch3').value.trim(),
    document.getElementById('ch4').value.trim(),
  ];

  const result = document.getElementById('writing-challenge-result');
  const filled = inputs.filter(s => s.length > 3).length;

  if (filled === 0) {
    result.classList.remove('hidden');
    result.classList.add('error');
    result.innerHTML = '✏️ Please write your sentences first!';
    return;
  }

  result.classList.remove('hidden', 'error');
  if (filled === 4) {
    result.innerHTML = '🏆 CHALLENGE COMPLETE! All 4 sentences done! You\'re amazing!';
    awardFoxyStar('challenge');
    showFeedbackModal('challenge');
  } else {
    result.innerHTML = `🌟 Great start! You wrote ${filled}/4 sentences. Try to finish all 4!`;
  }
}

function submitDrawingChallenge() {
  const desc = document.getElementById('dream-place-desc').value.trim();
  const result = document.getElementById('drawing-challenge-result');

  if (!desc) {
    result.classList.remove('hidden');
    result.classList.add('error');
    result.innerHTML = '🎨 Please describe your dream place!';
    return;
  }

  result.classList.remove('hidden', 'error');
  result.innerHTML = '🌟 Fantastic! Your dream place is beautiful!';
  showFeedbackModal('challenge');
}

// ===== CHALLENGE SPEAKING =====
let challengeSpeakingInterval = null;
let isChallengeSpeaking = false;
let challengeTimeLeft = 30;

function toggleChallengeSpeaking() {
  if (isChallengeSpeaking) {
    stopChallengeSpeaking();
  } else {
    startChallengeSpeaking();
  }
}

function startChallengeSpeaking() {
  isChallengeSpeaking = true;
  challengeTimeLeft = 30;
  const btn = document.getElementById('challenge-mic-btn');
  const icon = document.getElementById('challenge-mic-icon');
  const label = document.getElementById('challenge-mic-label');
  const timer = document.getElementById('challenge-timer');
  const waves = document.getElementById('challenge-waves');
  const result = document.getElementById('challenge-speaking-result');

  btn.classList.add('recording');
  icon.textContent = '⏹️';
  label.textContent = 'Stop';
  timer.classList.remove('hidden');
  waves.classList.remove('hidden');
  result.classList.add('hidden');
  document.getElementById('challenge-timer-count').textContent = challengeTimeLeft;

  challengeSpeakingInterval = setInterval(() => {
    challengeTimeLeft--;
    document.getElementById('challenge-timer-count').textContent = challengeTimeLeft;
    if (challengeTimeLeft <= 0) {
      stopChallengeSpeaking(true);
    }
  }, 1000);
}

function stopChallengeSpeaking(completed = false) {
  isChallengeSpeaking = false;
  clearInterval(challengeSpeakingInterval);

  const btn = document.getElementById('challenge-mic-btn');
  const icon = document.getElementById('challenge-mic-icon');
  const label = document.getElementById('challenge-mic-label');
  const timer = document.getElementById('challenge-timer');
  const waves = document.getElementById('challenge-waves');
  const result = document.getElementById('challenge-speaking-result');

  btn.classList.remove('recording');
  icon.textContent = '🎤';
  label.textContent = 'Start!';
  timer.classList.add('hidden');
  waves.classList.add('hidden');

  result.classList.remove('hidden', 'error');
  if (completed) {
    result.innerHTML = '🏆 CHALLENGE COMPLETE! You spoke for 30 seconds! Incredible!';
    showFeedbackModal('challenge');
  } else {
    result.innerHTML = '🎤 Keep going! Try to speak for the full 30 seconds!';
  }
}

// ===== FEEDBACK MODAL =====
function showFeedbackModal(activityType) {
  const msg = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
  document.getElementById('modal-emoji').textContent = msg.emoji;
  document.getElementById('modal-title').textContent = msg.title;
  document.getElementById('modal-subtitle').textContent = msg.subtitle;
  currentActivity = activityType;
  document.getElementById('feedback-modal').classList.remove('hidden');
}

function tryAgain() {
  document.getElementById('feedback-modal').classList.add('hidden');
  // Reset the current activity
  if (currentActivity === 'writing') {
    ['sentence1','sentence2','sentence3'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('writing-feedback').classList.add('hidden');
  } else if (currentActivity === 'drawing') {
    clearCanvas();
    ['draw-sentence1','draw-sentence2'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('drawing-feedback').classList.add('hidden');
  } else if (currentActivity === 'reading') {
    resetReading();
  } else if (currentActivity === 'speaking') {
    document.getElementById('speaking-feedback').classList.add('hidden');
  } else if (currentActivity === 'vocabulary') {
    loadVocabRound();
  }
}

// ===== VOCABULARY GAME ENGINE =====
const VOCAB_BANK = [
  // Level 1 — basic objects
  [
    { word: 'cat',     emoji: '🐱' },
    { word: 'dog',     emoji: '🐶' },
    { word: 'sun',     emoji: '☀️' },
    { word: 'tree',    emoji: '🌳' },
    { word: 'apple',   emoji: '🍎' },
  ],
  // Level 2 — animals
  [
    { word: 'lion',    emoji: '🦁' },
    { word: 'fish',    emoji: '🐟' },
    { word: 'bird',    emoji: '🐦' },
    { word: 'frog',    emoji: '🐸' },
    { word: 'horse',   emoji: '🐴' },
  ],
  // Level 3 — food
  [
    { word: 'bread',   emoji: '🍞' },
    { word: 'milk',    emoji: '🥛' },
    { word: 'cake',    emoji: '🎂' },
    { word: 'pizza',   emoji: '🍕' },
    { word: 'egg',     emoji: '🥚' },
  ],
  // Level 4 — places/things
  [
    { word: 'house',   emoji: '🏠' },
    { word: 'school',  emoji: '🏫' },
    { word: 'car',     emoji: '🚗' },
    { word: 'book',    emoji: '📚' },
    { word: 'ball',    emoji: '⚽' },
  ],
  // Level 5 — nature
  [
    { word: 'star',    emoji: '⭐' },
    { word: 'moon',    emoji: '🌙' },
    { word: 'cloud',   emoji: '☁️' },
    { word: 'rain',    emoji: '🌧️' },
    { word: 'flower',  emoji: '🌸' },
  ],
];

let vocabLevel     = 0;
let vocabScore     = 0;
let vocabTotal     = 0;
let vocabPairs     = [];
let selectedWord   = null;
let selectedImage  = null;
let confirmedPairs = [];   // [{wordIdx, imageIdx}]

function loadVocabRound() {
  // Reset state
  selectedWord  = null;
  selectedImage = null;
  confirmedPairs = [];

  const level = VOCAB_BANK[vocabLevel % VOCAB_BANK.length];
  // Shuffle a copy and pick 4 items
  const shuffled = [...level].sort(() => Math.random() - 0.5).slice(0, 4);
  vocabPairs = shuffled;

  // Build word tiles (in order)
  const wordsCol = document.getElementById('words-column');
  wordsCol.innerHTML = '<div class="vocab-col-title">📝 Words</div>';
  vocabPairs.forEach((pair, i) => {
    const btn = document.createElement('button');
    btn.className = 'vocab-word-tile';
    btn.textContent = pair.word;
    btn.dataset.idx = i;
    btn.id = 'vword-' + i;
    btn.onclick = () => selectVocabWord(i);
    wordsCol.appendChild(btn);
  });

  // Build image tiles (shuffled order)
  const imagesCol = document.getElementById('images-column');
  imagesCol.innerHTML = '<div class="vocab-col-title">🖼️ Pictures</div>';
  const imageOrder = [...Array(vocabPairs.length).keys()].sort(() => Math.random() - 0.5);
  imageOrder.forEach((pairIdx, displayIdx) => {
    const btn = document.createElement('button');
    btn.className = 'vocab-image-tile';
    btn.textContent = vocabPairs[pairIdx].emoji;
    btn.dataset.pairIdx = pairIdx;
    btn.dataset.displayIdx = displayIdx;
    btn.id = 'vimage-' + displayIdx;
    btn.onclick = () => selectVocabImage(pairIdx, displayIdx);
    imagesCol.appendChild(btn);
  });

  // Clear SVG lines
  clearVocabLines();

  // Reset result + buttons
  const result = document.getElementById('vocab-result');
  result.classList.add('hidden');
  result.innerHTML = '';
  document.getElementById('vocab-check-btn').style.display = '';
  document.getElementById('vocab-next-btn').style.display = 'none';

  // Update level display
  document.getElementById('vocab-level').textContent = (vocabLevel % VOCAB_BANK.length) + 1;
  updateVocabScoreBar();
}

function selectVocabWord(wordIdx) {
  if (confirmedPairs.some(p => p.wordIdx === wordIdx)) return; // already matched
  playPopSound();
  
  // Deselect previous
  document.querySelectorAll('.vocab-word-tile').forEach(b => b.classList.remove('selected'));
  selectedWord = wordIdx;
  document.getElementById('vword-' + wordIdx).classList.add('selected');

  // If image already selected, attempt match
  if (selectedImage !== null) attemptVocabMatch();
}

function selectVocabImage(pairIdx, displayIdx) {
  if (confirmedPairs.some(p => p.imageIdx === pairIdx)) return; // already matched
  playPopSound();

  // Deselect previous
  document.querySelectorAll('.vocab-image-tile').forEach(b => b.classList.remove('selected'));
  selectedImage = pairIdx;
  document.getElementById('vimage-' + displayIdx).classList.add('selected');

  // If word already selected, attempt match
  if (selectedWord !== null) attemptVocabMatch();
}

function attemptVocabMatch() {
  const wordTile  = document.getElementById('vword-' + selectedWord);
  const imageTile = findImageTileByPairIdx(selectedImage);

  if (selectedWord === selectedImage) {
    // Correct!
    playPopSound();
    confirmedPairs.push({ wordIdx: selectedWord, imageIdx: selectedImage });
    wordTile.classList.remove('selected');
    wordTile.classList.add('matched');
    imageTile.classList.remove('selected');
    imageTile.classList.add('matched');
    // Add checkmark
    const check = document.createElement('span');
    check.className = 'tile-check';
    check.textContent = '✅';
    imageTile.appendChild(check);
  } else {
    // Wrong
    playErrorSound();
    wordTile.classList.add('wrong-match');
    imageTile.classList.add('wrong-match');
    setTimeout(() => {
      wordTile.classList.remove('wrong-match', 'selected');
      imageTile.classList.remove('wrong-match', 'selected');
    }, 600);
  }

  selectedWord  = null;
  selectedImage = null;

  // Auto check if all matched
  if (confirmedPairs.length === vocabPairs.length) {
    setTimeout(() => checkVocabMatches(true), 400);
  }
}

function findImageTileByPairIdx(pairIdx) {
  return document.querySelector(`.vocab-image-tile[data-pair-idx="${pairIdx}"]`);
}

function checkVocabMatches(autoChecked = false) {
  const result = document.getElementById('vocab-result');
  const correct = confirmedPairs.length;
  const total   = vocabPairs.length;

  vocabScore += correct;
  vocabTotal += total;

  document.getElementById('vocab-score').textContent = vocabScore;
  updateVocabScoreBar();

  result.classList.remove('hidden', 'error');

  if (correct === total) {
    result.innerHTML = `🏆 Perfect! ${correct}/${total} — You matched all the words! Amazing!`;
    document.getElementById('vocab-check-btn').style.display = 'none';
    document.getElementById('vocab-next-btn').style.display = '';
    awardFoxyStar('vocabulary');
    setTimeout(() => {
      vocabLevel++;
      showFeedbackModal('vocabulary');
    }, 700);
  } else if (correct >= Math.ceil(total / 2)) {
    result.innerHTML = `🌟 Great job! ${correct}/${total} matched. Keep going!`;
    document.getElementById('vocab-check-btn').style.display = 'none';
    document.getElementById('vocab-next-btn').style.display = '';
  } else {
    playErrorSound();
    result.innerHTML = `💪 You got ${correct}/${total}. Try again — you can do it!`;
    result.classList.add('error');
  }
}

function updateVocabScoreBar() {
  const el = document.getElementById('vocab-score');
  if (el) el.textContent = vocabScore;
  const fill = document.getElementById('vocab-progress-fill');
  if (fill && vocabTotal > 0) {
    const pct = Math.min(100, Math.round((vocabScore / Math.max(vocabTotal, 1)) * 100));
    fill.style.width = pct + '%';
  }
}

function clearVocabLines() {
  const svg = document.getElementById('vocab-svg');
  if (svg) svg.innerHTML = '';
}

// ===== NEXT ACTIVITY (updated) =====
function nextActivity() {
  document.getElementById('feedback-modal').classList.add('hidden');
  const idx = activityOrder.indexOf(currentActivity);
  if (idx === -1 || currentActivity === 'challenge') {
    showSection('menu');
    return;
  }
  const next = activityOrder[(idx + 1) % activityOrder.length];
  showActivity(next);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Init canvases
  initCanvas();
  initChallengeCanvas();

  // Set initial animal
  document.getElementById('animal-emoji').textContent = animals[0].emoji;

  // Init vocabulary game
  loadVocabRound();
  
  // Load saved progress
  loadProgress();

  // Keyboard shortcut: Escape closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.getElementById('feedback-modal').classList.add('hidden');
    }
  });

  // Click outside modal to close
  document.getElementById('feedback-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('feedback-modal')) {
      document.getElementById('feedback-modal').classList.add('hidden');
    }
  });

  console.log('🌞 Grade 3 Learning App Ready! Vocabulary Game loaded.');
});

// ===== HELP FORM =====
function openContactForm(type) {
  const container = document.getElementById('help-form-container');
  const buttons = document.getElementById('help-buttons');
  const title = document.getElementById('help-form-title');
  const textarea = document.getElementById('help-textarea');
  const success = document.getElementById('help-success');
  
  if(success) success.classList.add('hidden');
  if(textarea) textarea.value = '';
  
  if (type === 'teacher') title.textContent = '👩‍🏫 Ask Teacher Laura';
  else if (type === 'question') title.textContent = '❓ Ask Teacher Danny';
  else if (type === 'suggestion') title.textContent = '💌 Suggestions Box';
  
  buttons.classList.add('hidden');
  container.classList.remove('hidden');
}

function closeContactForm() {
  document.getElementById('help-form-container').classList.add('hidden');
  document.getElementById('help-buttons').classList.remove('hidden');
}

function sendContactForm() {
  const textarea = document.getElementById('help-textarea');
  if (!textarea.value.trim()) {
    alert("Please write something first!");
    return;
  }
  
  document.getElementById('help-success').classList.remove('hidden');
  textarea.value = '';
  
  setTimeout(() => {
    closeContactForm();
    document.getElementById('help-success').classList.add('hidden');
  }, 2500);
}

// ===== CERTIFICATE =====
function showCertificateModal() {
  const modal = document.getElementById('certificate-modal');
  if (modal) {
    modal.classList.remove('hidden');
    const foxyGuide = document.getElementById('foxy-floating-guide');
    if (foxyGuide) foxyGuide.classList.remove('visible');
    playPopSound();
  }
}
function printCertificate() {
  window.print();
}
function closeCertificate() {
  document.getElementById('certificate-modal').classList.add('hidden');
}

// ===== MISSING STARS CHECK =====
function checkMissingStars() {
  const allActivities = ['writing', 'drawing', 'reading', 'speaking', 'vocabulary', 'challenge'];
  const missing = allActivities.filter(act => !foxyStarsCompleted.has(act));
  
  if (missing.length === 0) {
    updateFoxyMessage("You have all the stars! Time to get your Certificate! 🏆");
  } else {
    // translate activity keys to nice words
    const niceNames = {
      'writing': 'Writing ✍️',
      'drawing': 'Drawing 🎨',
      'reading': 'Reading 📖',
      'speaking': 'Speaking 💬',
      'vocabulary': 'Vocabulary 🎮',
      'challenge': 'Final Challenge 🌟'
    };
    const missingNames = missing.map(act => niceNames[act]).join(', ');
    updateFoxyMessage(`You are missing: ${missingNames}. Let's go get them!`);
  }
}

// ===== THEME TOGGLE =====
function toggleTheme() {
  const html = document.documentElement;
  const btn = document.getElementById('theme-btn');
  const current = html.getAttribute('data-theme');
  
  if (current === 'light') {
    html.removeAttribute('data-theme');
    btn.textContent = '☀️ Day Mode';
    btn.style.color = '#fcd34d';
    btn.style.background = 'rgba(255,255,255,0.1)';
  } else {
    html.setAttribute('data-theme', 'light');
    btn.textContent = '🌙 Night Mode';
    btn.style.color = '#1e293b';
    btn.style.background = 'rgba(0,0,0,0.1)';
  }
  playPopSound();
}

// ===== EASTER EGGS =====
let foxyClickCount = 0;
let foxyTimer = null;

function foxyEasterEgg() {
  foxyClickCount++;
  const avatar = document.getElementById('foxy-avatar-egg');
  
  // Clear timer if clicking fast
  if (foxyTimer) clearTimeout(foxyTimer);
  
  if (foxyClickCount >= 5) {
    // TRIGGER SPIN!
    avatar.classList.add('foxy-spin');
    playDingDongSound();
    updateFoxyMessage("Wheeeee! I'm spinning! Hahaha! 🦊✨");
    
    setTimeout(() => {
      avatar.classList.remove('foxy-spin');
      foxyClickCount = 0;
    }, 1000);
  } else {
    // Reset if no clicks for 2 seconds
    foxyTimer = setTimeout(() => {
      foxyClickCount = 0;
    }, 2000);
    
    // Tiny bounce on click
    avatar.style.transform = 'scale(1.2)';
    setTimeout(() => { avatar.style.transform = ''; }, 150);
    playPopSound();
  }
}

function starEasterEgg(el) {
  playPopSound();
  el.classList.add('star-pop');
  
  // Create tiny confetti effect
  const rect = el.getBoundingClientRect();
  for (let i = 0; i < 5; i++) {
    const p = document.createElement('div');
    p.textContent = ['✨','⭐','🌟','🎈'][Math.floor(Math.random()*4)];
    p.style.position = 'fixed';
    p.style.left = rect.left + rect.width/2 + 'px';
    p.style.top = rect.top + rect.height/2 + 'px';
    p.style.pointerEvents = 'none';
    p.style.zIndex = '2000';
    p.style.fontSize = '1.2rem';
    p.style.transition = 'all 0.8s ease-out';
    document.body.appendChild(p);
    
    setTimeout(() => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * 50;
      p.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px) rotate(${Math.random()*360}deg)`;
      p.style.opacity = '0';
    }, 10);
    
    setTimeout(() => p.remove(), 1000);
  }
  
  setTimeout(() => { el.classList.remove('star-pop'); }, 400);
}
