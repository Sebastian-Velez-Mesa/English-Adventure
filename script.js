/* ============================
   GRADE 3 LEARNING - JAVASCRIPT
   ============================ */

// ===== ANIMALS LIST =====
const animals = [
  { emoji: '\u{1F418}', name: 'elephant' },
  { emoji: '\u{1F981}', name: 'lion' },
  { emoji: '\u{1F42C}', name: 'dolphin' },
  { emoji: '\u{1F427}', name: 'penguin' },
  { emoji: '\u{1F98A}', name: 'fox' },
  { emoji: '\u{1F428}', name: 'koala' },
  { emoji: '\u{1F98B}', name: 'butterfly' },
  { emoji: '\u{1F422}', name: 'turtle' },
  { emoji: '\u{1F992}', name: 'giraffe' },
  { emoji: '\u{1F43A}', name: 'wolf' },
];

let currentAnimalIndex = 0;

// ===== FEEDBACK MESSAGES =====
const feedbackMessages = [
  { emoji: '\u{1F389}', title: 'Good job!', subtitle: "You're doing amazing!" },
  { emoji: '\u{1F31F}', title: 'Amazing!', subtitle: 'Keep up the great work!' },
  { emoji: '\u{1F4AA}', title: 'You can do it!', subtitle: 'Wonderful effort!' },
  { emoji: '\u{2B50}', title: 'Fantastic!', subtitle: "You're a star learner!" },
  { emoji: '\u{1F3C6}', title: 'Excellent!', subtitle: "You're a champion!" },
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
  if(typeof zenApp !== 'undefined' && zenApp) zenApp.triggerReaction('surprised');
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

// ===== Zen THE FOX & PERSISTENCE =====
let zenStarsCompleted = new Set();
const ZenMessages = {
  'home': "Hi! I'm Zen! Let's explore English together!",
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
  localStorage.setItem('ZenProgress', JSON.stringify(Array.from(zenStarsCompleted)));
}

function loadProgress() {
  const saved = localStorage.getItem('ZenProgress');
  if (saved) {
    const arr = JSON.parse(saved);
    arr.forEach(id => zenStarsCompleted.add(id));
    
    let zenStars = zenStarsCompleted.size;
    const countEl = document.getElementById('zen-stars-count');
    if (countEl) countEl.textContent = zenStars;
    
    if (zenStars === 6) {
       document.getElementById('nav-cert-btn')?.classList.remove('hidden');
    }
  }
}

function awardZenStar(activityId) {
  if (!zenStarsCompleted.has(activityId)) {
    zenStarsCompleted.add(activityId);
    saveProgress();
    playDingDongSound();
    
    let zenStars = zenStarsCompleted.size;
    const countEl = document.getElementById('zen-stars-count');
    if (countEl) countEl.textContent = zenStars;
    
    const ZenEl = document.getElementById('zen-progress');
    if (ZenEl) {
      ZenEl.style.transform = 'scale(1.15)';
      ZenEl.style.transition = 'transform 0.3s';
      setTimeout(() => { ZenEl.style.transform = 'scale(1)'; }, 300);
    }
    
    if (zenStars === 6) {
       document.getElementById('nav-cert-btn')?.classList.remove('hidden');
       setTimeout(() => {
         updateZenMessage("Wow! You got all 6 stars! You completed the journey! \u{1F389}");
         document.getElementById('certificate-modal')?.classList.remove('hidden');
       }, 1500);
    }
  }
}

function updateZenMessage(text) {
  const guide = document.getElementById('zen-floating-guide');
  const guideText = document.getElementById('zen-guide-text');
  if (!guide || !guideText) return;
  
  guide.classList.remove('visible');
  setTimeout(() => {
    guideText.textContent = text;
    guide.classList.add('visible');
  }, 400);
}

// Ensure first message is loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => updateZenMessage(ZenMessages['home']), 500);
});

// ===== SECTION NAVIGATION =====
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (ZenMessages[id]) updateZenMessage(ZenMessages[id]);
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
    btn.textContent = '\u{1F49C} Nice to meet you!';
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
    btn.textContent = '\u{1F49C} Nice to meet you!';
    btn.disabled = true;
    btn.style.opacity = '0.7';
  }
}

function selectLike(btn, message) {
  document.querySelectorAll('.like-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const response = document.getElementById('laura-response');
  response.textContent = '\u{1F497} Laura says: ' + message;
  response.classList.remove('hidden');
}

function danielActivity(message) {
  const response = document.getElementById('daniel-response');
  response.textContent = '\u{1F439} ' + message;
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
    feedback.innerHTML = '\u{26A0}\u{FE0F} Please write all 3 sentences before checking!';
    playErrorSound();
    return;
  }

  const sentenceCount = [s1, s2, s3].filter(s => s.length > 5).length;

  feedback.classList.remove('hidden', 'error');
  if (sentenceCount === 3) {
    feedback.innerHTML = '\u{1F389} Excellent! Your 3 sentences look great! Well done!';
    awardZenStar('writing');
    setTimeout(() => showFeedbackModal('writing'), 600);
  } else {
    feedback.innerHTML = '\u{1F31F} Good try! Try to write longer sentences with more details.';
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
    feedback.innerHTML = '\u{1F3A8} Please write both sentences about your drawing!';
    return;
  }

  feedback.classList.remove('hidden', 'error');
  feedback.innerHTML = '\u{1F3A8} Wonderful! Your drawing and description are amazing!';
  awardZenStar('drawing');
  setTimeout(() => showFeedbackModal('drawing'), 600);
}

// ===== READING ACTIVITY =====
const correctAnswers = { 1: 'b', 2: 'b', 3: 'a' };
let readingAnswers = {};

function checkAnswer(qNum, answer) {
  playPopSound();
  const block = document.getElementById('q' + qNum + '-block');
  const btns = block.querySelectorAll('.answer-btn');
  // Deselect all
  btns.forEach(b => {
    b.classList.remove('correct', 'wrong');
    b.disabled = true;
  });

  readingAnswers[qNum] = answer;
  const isCorrect = (answer === correctAnswers[qNum]);
  const element = document.getElementById('q' + qNum + answer);

  if (isCorrect) {
    element.classList.add('correct');
    const resultEl = document.getElementById('q' + qNum + '-result');
    resultEl.classList.remove('hidden');
    resultEl.innerHTML = '\u{2705} Correct! Well done!';
    resultEl.style.color = '#6ee7b7';
  } else {
    element.classList.add('wrong');
    document.getElementById('q' + qNum + correctAnswers[qNum]).classList.add('correct');
    const resultEl = document.getElementById('q' + qNum + '-result');
    resultEl.classList.remove('hidden');
    resultEl.innerHTML = '\u{274C} Not quite! The correct answer is highlighted.';
    resultEl.style.color = '#fca5a5';
  }
}

function checkReading() {
  const scoreEl = document.getElementById('reading-score');
  scoreEl.classList.remove('hidden', 'error');

  if (Object.keys(readingAnswers).length < 3) {
    scoreEl.classList.add('error');
    scoreEl.innerHTML = '\u{26A0}\u{FE0F} Please answer all 3 questions first!';
    playErrorSound();
    return;
  }

  const score = Object.entries(readingAnswers)
    .filter(([q, a]) => correctAnswers[q] === a).length;

  const messages = [
    { score: 3, msg: '\u{1F3C6} Perfect score! 3/3 \u2014 You\'re a reading star!' },
    { score: 2, msg: '\u{1F31F} Great job! 2/3 \u2014 Almost perfect!' },
    { score: 1, msg: '\u{1F4AA} Good effort! 1/3 \u2014 Keep practicing!' },
    { score: 0, msg: '\u{1F4D6} Keep reading! 0/3 \u2014 You\'ll get better!' },
  ];

  const entry = messages.find(m => m.score === score) || messages[3];
  scoreEl.innerHTML = entry.msg;

  if (score === 3) {
    playActivitySound();
    awardZenStar('reading');
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
  icon.textContent = '\u{23FA}\u{FE0F}';
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
  icon.textContent = '\u{1F3A4}';
  label.textContent = 'Start Speaking';
  timer.classList.add('hidden');
  waves.classList.add('hidden');

  feedback.classList.remove('hidden', 'error');
  if (completed) {
    feedback.innerHTML = '\u{1F389} Wow! You spoke clearly and confidently! Great job!';
    playActivitySound();
    awardZenStar('speaking');
    setTimeout(() => showFeedbackModal('speaking'), 800);
  } else {
    feedback.classList.add('error');
    feedback.innerHTML = '\u{274C} Recording stopped. Try to speak for a bit longer!';
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
  display.innerHTML = `${emoji} Talk about a <strong>${name}</strong>! \u{1F31F}`;
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
    result.innerHTML = '\u{26A0}\u{FE0F} Please write your sentences first!';
    return;
  }

  result.classList.remove('hidden', 'error');
  if (filled === 4) {
    result.innerHTML = '\u{1F3C6} CHALLENGE COMPLETE! All 4 sentences done! You\'re amazing!';
    awardZenStar('challenge');
    showFeedbackModal('challenge');
  } else {
    result.innerHTML = `\u{1F31F} Great start! You wrote ${filled}/4 sentences. Try to finish all 4!`;
  }
}

function submitDrawingChallenge() {
  const desc = document.getElementById('dream-place-desc').value.trim();
  const result = document.getElementById('drawing-challenge-result');

  if (!desc) {
    result.classList.remove('hidden');
    result.classList.add('error');
    result.innerHTML = '\u{1F3A8} Please describe your dream place!';
    return;
  }

  result.classList.remove('hidden', 'error');
  result.innerHTML = '\u{1F31F} Fantastic! Your dream place is beautiful!';
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
  icon.textContent = '\u{23FA}\u{FE0F}';
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
  icon.textContent = '\u{1F3A4}';
  label.textContent = 'Start!';
  timer.classList.add('hidden');
  waves.classList.add('hidden');

  result.classList.remove('hidden', 'error');
  if (completed) {
    result.innerHTML = '\u{1F3C6} CHALLENGE COMPLETE! You spoke for 30 seconds! Incredible!';
    showFeedbackModal('challenge');
  } else {
    result.innerHTML = '\u{1F3A4} Keep going! Try to speak for the full 30 seconds!';
  }
}

// ===== FEEDBACK MODAL =====
function showFeedbackModal(activityType) {
  const modal = document.getElementById('feedback-modal');
  if (!modal) return;

  const msg = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
  document.getElementById('modal-emoji').textContent = msg.emoji;
  document.getElementById('modal-title').textContent = msg.title;
  document.getElementById('modal-subtitle').textContent = msg.subtitle;

  modal.classList.remove('hidden');
  
  if (typeof zenApp !== 'undefined' && zenApp) {
      zenApp.triggerReaction('excited');
      updateZenMessage("Incredible work! You are getting closer to the certificate! \u2B50");
  }
}

function nextActivity() {
  const modal = document.getElementById('feedback-modal');
  if (modal) modal.classList.add('hidden');
  
  const currentIndex = activityOrder.indexOf(currentActivity);
  if (currentIndex < activityOrder.length - 1) {
    showActivity(activityOrder[currentIndex + 1]);
  } else {
    showSection('challenge');
  }
}

function tryAgain() {
  const modal = document.getElementById('feedback-modal');
  if (modal) modal.classList.add('hidden');
}

// ===== VOCABULARY GAME LOGIC =====
const VOCAB_BANK = [
  { level: 1, pairs: [ { w: 'dog', e: '\u{1F436}' }, { w: 'cat', e: '\u{1F431}' }, { w: 'bird', e: '\u{1F426}' }, { w: 'fish', e: '\u{1F41F}' } ] },
  { level: 2, pairs: [ { w: 'apple', e: '\u{1F34E}' }, { w: 'banana', e: '\u{1F34C}' }, { w: 'milk', e: '\u{1F95B}' }, { w: 'bread', e: '\u{1F35E}' } ] },
  { level: 3, pairs: [ { w: 'red', e: '\u{1F534}' }, { w: 'blue', e: '\u{1F535}' }, { w: 'green', e: '\u{1F7E2}' }, { w: 'yellow', e: '\u{1F7E1}' } ] },
  { level: 4, pairs: [ { w: 'sun', e: '\u{2600}\u{FE0F}' }, { w: 'moon', e: '\u{1F319}' }, { w: 'star', e: '\u2B50' }, { w: 'cloud', e: '\u{2601}\u{FE0F}' } ] },
  { level: 5, pairs: [ { w: 'happy', e: '\u{1F60A}' }, { w: 'sad', e: '\u{1F622}' }, { w: 'big', e: '\u{1F418}' }, { w: 'small', e: '\u{1F42D}' } ] }
];

let vocabCurrentLevel = 1;
let vocabSelectedWord = null;
let vocabSelectedImage = null;
let vocabMatches = [];

function loadVocabRound() {
  const round = VOCAB_BANK.find(r => r.level === vocabCurrentLevel);
  if (!round) return;

  const wordsCol = document.getElementById('words-column');
  const imagesCol = document.getElementById('images-column');
  
  wordsCol.innerHTML = '<div class="vocab-col-title">\u{1F4CD} Words</div>';
  imagesCol.innerHTML = '<div class="vocab-col-title">\u{1F5BC}\u{FE0F} Pictures</div>';
  
  vocabSelectedWord = null;
  vocabSelectedImage = null;
  vocabMatches = [];

  const words = [...round.pairs].sort(() => Math.random() - 0.5);
  const images = [...round.pairs].sort(() => Math.random() - 0.5);

  words.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'vocab-tile';
    btn.textContent = p.w;
    btn.onclick = () => selectVocabWord(btn, p.w);
    wordsCol.appendChild(btn);
  });

  images.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'vocab-tile image-tile';
    btn.textContent = p.e;
    btn.onclick = () => selectVocabImage(btn, p.w);
    imagesCol.appendChild(btn);
  });
  
  document.getElementById('vocab-next-btn').style.visibility = 'hidden';
  updateVocabScoreBar();
}

function selectVocabWord(btn, word) {
  document.querySelectorAll('#words-column .vocab-tile').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  vocabSelectedWord = { btn, word };
  if (vocabSelectedImage) attemptVocabMatch();
}

function selectVocabImage(btn, word) {
  document.querySelectorAll('#images-column .vocab-tile').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  vocabSelectedImage = { btn, word };
  if (vocabSelectedWord) attemptVocabMatch();
}

function attemptVocabMatch() {
  if (vocabSelectedWord.word === vocabSelectedImage.word) {
    vocabMatches.push(vocabSelectedWord.word);
    vocabSelectedWord.btn.classList.add('matched');
    vocabSelectedImage.btn.classList.add('matched');
    playPopSound();
  } else {
    vocabSelectedWord.btn.classList.add('shake');
    vocabSelectedImage.btn.classList.add('shake');
    setTimeout(() => {
      vocabSelectedWord.btn.classList.remove('shake', 'selected');
      vocabSelectedImage.btn.classList.remove('shake', 'selected');
    }, 500);
    playErrorSound();
  }
  vocabSelectedWord = null;
  vocabSelectedImage = null;
  updateVocabScoreBar();
}

function updateVocabScoreBar() {
  const bar = document.getElementById('vocab-score-fill');
  const count = vocabMatches.length;
  const percentage = (count / 4) * 100;
  if (bar) bar.style.width = percentage + '%';
  
  if (count === 4) {
    document.getElementById('vocab-next-btn').style.visibility = 'visible';
  }
}

function checkVocabMatches() {
  if (vocabMatches.length === 4) {
     if (vocabCurrentLevel < 5) {
       vocabCurrentLevel++;
       loadVocabRound();
     } else {
       awardZenStar('vocabulary');
       showFeedbackModal('vocabulary');
     }
  }
}

// ===== THEME TOGGLE =====
function toggleTheme() {
  const html = document.documentElement;
  const btn = document.getElementById('theme-btn');
  const current = html.getAttribute('data-theme');
  
  if (current === 'light') {
    html.removeAttribute('data-theme');
    btn.textContent = '\u{2600}\u{FE0F} Day Mode';
    btn.style.color = '#fcd34d';
    btn.style.background = 'rgba(255,255,255,0.1)';
  } else {
    html.setAttribute('data-theme', 'light');
    btn.textContent = '\u{1F319} Night Mode';
    btn.style.color = '#1e293b';
    btn.style.background = 'rgba(0,0,0,0.1)';
  }
  playPopSound();
}

// ===== EASTER EGGS =====
let ZenClickCount = 0;
let ZenTimer = null;

function ZenEasterEgg() {
  ZenClickCount++;
  const avatar = document.getElementById('zen-avatar-egg');
  if (ZenTimer) clearTimeout(ZenTimer);
  
  if (ZenClickCount >= 5) {
    avatar.classList.add('zen-spin');
    playDingDongSound();
    updateZenMessage("Wheeeee! I'm spinning! Hahaha! \u{1F98A}\u{2728}");
    setTimeout(() => {
      avatar.classList.remove('zen-spin');
      ZenClickCount = 0;
    }, 1000);
  } else {
    ZenTimer = setTimeout(() => { ZenClickCount = 0; }, 2000);
    avatar.style.transform = 'scale(1.2)';
    setTimeout(() => { avatar.style.transform = ''; }, 150);
    playPopSound();
  }
}

function starEasterEgg(el) {
  playPopSound();
  el.classList.add('star-pop');
  const rect = el.getBoundingClientRect();
  for (let i = 0; i < 5; i++) {
    const p = document.createElement('div');
    p.textContent = ['\u2728','\u2B50','\u{1F31F}','\u{1F388}'][Math.floor(Math.random()*4)];
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

// ===== INTRO OVERLAY =====
let currentIntroSlide = 1;
const totalIntroSlides = 4;

function showIntroGuide() {
  const overlay = document.getElementById('intro-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
    currentIntroSlide = 1;
    updateIntroSlide();
  }
}

function updateIntroSlide() {
  document.querySelectorAll('.intro-slide').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.intro-step-dot').forEach(d => d.classList.remove('active'));
  const slide = document.getElementById('islide-' + currentIntroSlide);
  const dot = document.getElementById('idot-' + currentIntroSlide);
  if(slide) slide.classList.add('active');
  if(dot) dot.classList.add('active');
  const prevBtn = document.getElementById('intro-prev');
  const nextBtn = document.getElementById('intro-next');
  if(prevBtn) prevBtn.style.visibility = (currentIntroSlide === 1) ? 'hidden' : 'visible';
  if(nextBtn) nextBtn.style.display = (currentIntroSlide === totalIntroSlides) ? 'none' : 'inline-block';
}

function introNext() {
  if (currentIntroSlide < totalIntroSlides) {
    currentIntroSlide++;
    updateIntroSlide();
  }
}

function introPrev() {
  if (currentIntroSlide > 1) {
    currentIntroSlide--;
    updateIntroSlide();
  }
}

function jumpToIntroSlide(n) {
  currentIntroSlide = n;
  updateIntroSlide();
}

function dismissIntro() {
  const overlay = document.getElementById('intro-overlay');
  if (overlay) overlay.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initializations
  loadProgress();
  initCanvas();
  initChallengeCanvas();
  loadVocabRound();

  // 2. Intro Guide Logic
  if (!sessionStorage.getItem('introSeen')) {
    setTimeout(showIntroGuide, 800);
    sessionStorage.setItem('introSeen', 'true');
  }
  
  // 3. Zen Mascot
  if (typeof ZenController !== 'undefined') {
    zenApp = new ZenController();
  }
});

// ===== LESSON PLAN TABS =====
function showLPTab(tabId, btnElement) {
  document.querySelectorAll('.lp-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.lp-tab').forEach(b => b.classList.remove('active'));
  const target = document.getElementById('lp-' + tabId);
  if(target) target.classList.add('active');
  if(btnElement) btnElement.classList.add('active');
}

function sendLPMessage() {
  const type = document.getElementById('lp-msg-type').value;
  const text = document.getElementById('lp-msg-text').value.trim();
  const success = document.getElementById('lp-msg-success');
  if(!type || !text) {
    alert("Please select a topic and write a message.");
    return;
  }
  success.classList.remove('hidden');
  document.getElementById('lp-msg-text').value = '';
  document.getElementById('lp-msg-type').value = '';
  setTimeout(() => { success.classList.add('hidden'); }, 4000);
}

// ===== ZEN CONTROLLER =====
class ZenController {
  constructor() {
    this.container = document.getElementById('zen-floating-guide');
    this.mainImg = document.getElementById('zen-main-img');
    if (!this.mainImg) return;
    this.isSleeping = false;
    this.isInteracting = false;
    this.idleTime = 0;
    this.originalSrc = this.mainImg.src;
    this.sleepSrc = 'zen_sleep.png';
    this.init();
  }
  init() {
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    document.addEventListener('click', () => this.wakeUp());
    setInterval(() => this.checkInactivity(), 1000);
    this.startBlinking();
    this.moveTo('right: 2rem; bottom: 2rem;');
  }
  handleMouseMove(e) {
    this.idleTime = 0;
    if (this.isSleeping) this.wakeUp();
    const rect = this.mainImg.getBoundingClientRect();
    const zenX = rect.left + rect.width / 2;
    const zenY = rect.top + rect.height / 2;
    const dx = e.clientX - zenX;
    const dy = e.clientY - zenY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const maxTilt = dist < 200 ? 25 : 15;
    const dampen = Math.min(dist / 500, 1);
    const tx = -(dy / dist || 0) * maxTilt * dampen;
    const ty = (dx / dist || 0) * maxTilt * dampen;
    this.mainImg.style.transform = `perspective(600px) rotateX(${tx}deg) rotateY(${ty}deg)`;
    if (dist < 80 && !this.isInteracting) this.dashAway();
  }
  startBlinking() {
    const blink = () => {
      if (!this.isSleeping) {
        this.mainImg.style.transform += ' scaleY(0.1)';
        setTimeout(() => { this.mainImg.style.transform = this.mainImg.style.transform.replace(' scaleY(0.1)', ''); }, 100);
      }
      setTimeout(blink, Math.random() * 5000 + 2000);
    };
    blink();
  }
  hideInCorner() {
    const corners = ['left: 2rem; bottom: 2rem;', 'right: 2rem; bottom: 2rem;', 'right: 2rem; top: 6rem;'];
    this.moveTo(corners[Math.floor(Math.random() * corners.length)]);
  }
  dashAway() {
    this.isInteracting = true;
    this.triggerReaction('surprised');
    this.hideInCorner();
    setTimeout(() => { this.isInteracting = false; }, 2000);
  }
  moveTo(cssText) {
    this.container.style.cssText = `position: fixed; z-index: 5000; pointer-events: none; transition: all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1); ${cssText}`;
  }
  checkInactivity() {
    this.idleTime++;
    if (this.idleTime >= 10 && !this.isSleeping) this.fallAsleep();
  }
  fallAsleep() {
    this.isSleeping = true;
    this.container.classList.add('zen-sleeping');
    this.mainImg.src = this.sleepSrc;
    const zzz = this.container.querySelector('.zen-sleep-z');
    if(zzz) zzz.style.opacity = '1';
    this.moveTo('right: 2rem; bottom: 2rem;');
  }
  wakeUp() {
    if (!this.isSleeping) return;
    this.isSleeping = false;
    this.container.classList.remove('zen-sleeping');
    this.mainImg.src = this.originalSrc;
    const zzz = this.container.querySelector('.zen-sleep-z');
    if(zzz) zzz.style.opacity = '0';
    this.triggerReaction('surprised');
    this.idleTime = 0;
  }
  triggerReaction(type) {
    this.container.classList.add(`zen-${type}`);
    setTimeout(() => { this.container.classList.remove(`zen-${type}`); }, 2000);
  }
}
let zenApp;
