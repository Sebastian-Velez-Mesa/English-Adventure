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

// ===== SECTION NAVIGATION =====
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function showActivity(type) {
  currentActivity = type;
  showSection('activity-' + type);
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
function helloMisodis() {
  const response = document.getElementById('misodis-response');
  response.classList.remove('hidden');
  response.style.animation = 'fadeInUp 0.4s ease';
  const btn = document.getElementById('hello-btn');
  btn.textContent = '💜 Nice to meet you!';
  btn.disabled = true;
  btn.style.opacity = '0.7';
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
    return;
  }

  const sentenceCount = [s1, s2, s3].filter(s => s.length > 5).length;

  feedback.classList.remove('hidden', 'error');
  if (sentenceCount === 3) {
    feedback.innerHTML = '🎉 Excellent! Your 3 sentences look great! Well done!';
    setTimeout(() => showFeedbackModal('writing'), 600);
  } else {
    feedback.innerHTML = '🌟 Good try! Try to write longer sentences with more details.';
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
  setTimeout(() => showFeedbackModal('drawing'), 600);
}

// ===== READING ACTIVITY =====
const correctAnswers = { 1: 'b', 2: 'b', 3: 'a' };
let readingAnswers = {};

function checkAnswer(qNum, answer) {
  if (readingAnswers[qNum]) return; // already answered

  readingAnswers[qNum] = answer;
  const correct = correctAnswers[qNum];
  const resultEl = document.getElementById('q' + qNum + '-result');
  const allBtns = document.querySelectorAll('#q' + qNum + '-block .answer-btn');

  allBtns.forEach(btn => {
    btn.disabled = true;
  });

  if (answer === correct) {
    document.getElementById('q' + qNum + answer).classList.add('correct');
    resultEl.classList.remove('hidden');
    resultEl.innerHTML = '✅ Correct! Well done!';
    resultEl.style.color = '#6ee7b7';
  } else {
    document.getElementById('q' + qNum + answer).classList.add('wrong');
    document.getElementById('q' + qNum + correct).classList.add('correct');
    resultEl.classList.remove('hidden');
    resultEl.innerHTML = '❌ Not quite! The correct answer is highlighted.';
    resultEl.style.color = '#fca5a5';
  }

  // Check if all answered
  if (Object.keys(readingAnswers).length === 3) {
    setTimeout(showReadingScore, 500);
  }
}

function showReadingScore() {
  const score = Object.entries(readingAnswers)
    .filter(([q, a]) => correctAnswers[q] === a).length;

  const scoreEl = document.getElementById('reading-score');
  scoreEl.classList.remove('hidden');

  const messages = [
    { score: 3, msg: '🏆 Perfect score! 3/3 — You\'re a reading star!' },
    { score: 2, msg: '🌟 Great job! 2/3 — Almost perfect!' },
    { score: 1, msg: '💪 Good effort! 1/3 — Keep practicing!' },
    { score: 0, msg: '📖 Keep reading! 0/3 — You\'ll get better!' },
  ];

  const entry = messages.find(m => m.score === score) || messages[3];
  scoreEl.innerHTML = entry.msg;

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
    feedback.innerHTML = '🎉 Amazing! You spoke for 30 seconds! Great job!';
    setTimeout(() => showFeedbackModal('speaking'), 600);
  } else {
    feedback.innerHTML = '🎤 Practice stopped. Try again to speak for 30 seconds!';
  }
}

// ===== ANIMAL SELECTOR (SPEAKING) =====
function selectAnimal(emoji, name) {
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

  // Deselect previous
  document.querySelectorAll('.vocab-word-tile').forEach(b => b.classList.remove('selected'));
  selectedWord = wordIdx;
  document.getElementById('vword-' + wordIdx).classList.add('selected');

  // If image already selected, attempt match
  if (selectedImage !== null) attemptVocabMatch();
}

function selectVocabImage(pairIdx, displayIdx) {
  if (confirmedPairs.some(p => p.imageIdx === pairIdx)) return; // already matched

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
    setTimeout(() => {
      vocabLevel++;
      showFeedbackModal('vocabulary');
    }, 700);
  } else if (correct >= Math.ceil(total / 2)) {
    result.innerHTML = `🌟 Great job! ${correct}/${total} matched. Keep going!`;
    document.getElementById('vocab-check-btn').style.display = 'none';
    document.getElementById('vocab-next-btn').style.display = '';
  } else {
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
