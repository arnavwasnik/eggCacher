
// const basket = document.getElementById('basket');
// const gameArea = document.getElementById('gameArea');
// const scoreDisplay = document.getElementById('score');
// const timerDisplay = document.getElementById('timer');
// const startBtn = document.getElementById('startBtn');
// const startPopup = document.getElementById('startPopup');
// const resultPopup = document.getElementById('resultPopup');
// const finalScore = document.getElementById('finalScore');
// const eggSound = document.getElementById('eggSound');
// const bombSound = document.getElementById('bombSound');

// let score = 0;
// let timeLeft = 60;
// let gameRunning = false;
// let items = [];
// let eggCount = 0;
// let keys = {};
// let isDragging = false;
// let startX = 0;
// let basketStartX = 0;
// let targetLeft = null;

// // Touch dragging (works on laptop touchscreen, tablet, mobile)
// gameArea.addEventListener("touchstart", (e) => {
//   if (e.touches.length === 1) {
//     isDragging = true;
//     startX = e.touches[0].clientX;
//     basketStartX = parseFloat(getComputedStyle(basket).left) || basket.offsetLeft;
//   }
// });

// gameArea.addEventListener("touchmove", (e) => {
//   if (!isDragging) return;
//   const touchX = e.touches[0].clientX;
//   const deltaX = touchX - startX;
//   let newLeft = basketStartX + deltaX;
//   const maxLeft = gameArea.clientWidth - basket.offsetWidth;
//   newLeft = Math.max(0, Math.min(newLeft, maxLeft));
//   targetLeft = newLeft;
// });

// gameArea.addEventListener("touchend", () => {
//   isDragging = false;
// });

// // Keyboard movement
// document.addEventListener('keydown', (e) => keys[e.key] = true);
// document.addEventListener('keyup', (e) => keys[e.key] = false);

// // Start game
// startBtn.addEventListener('click', () => {
//   startPopup.style.display = 'none';
//   resultPopup.style.display = 'none';
//   gameRunning = true;
//   score = 0;
//   timeLeft = 60;
//   eggCount = 0;
//   scoreDisplay.textContent = score;
//   timerDisplay.textContent = timeLeft;
//   basket.style.backgroundImage = "url('basket.png')";
//   basket.style.left = `${(gameArea.clientWidth - basket.offsetWidth) / 2}px`;
//   items.forEach(i => i.el.remove());
//   items = [];
//   startGame();
// });

// function startGame() {
//   countdown();
//   spawnLoop();
//   updateLoop();
//   smoothBasketMovement();
// }

// function countdown() {
//   const timer = setInterval(() => {
//     timeLeft--;
//     timerDisplay.textContent = timeLeft;
//     if (timeLeft <= 0) {
//       clearInterval(timer);
//       gameRunning = false;
//       showResult();
//     }
//   }, 1000);
// }

// function spawnLoop() {
//   if (!gameRunning) return;
//   spawnItem();
//   setTimeout(spawnLoop, 800);
// }

// function spawnItem() {
//   const item = document.createElement('div');
//   item.classList.add('item');
//   const isEgg = Math.random() > 0.3;
//   item.classList.add(isEgg ? 'egg' : 'bomb');
//   item.dataset.type = isEgg ? 'egg' : 'bomb';
//   item.style.left = `${Math.random() * (gameArea.clientWidth - 40)}px`;
//   gameArea.appendChild(item);
//   items.push({ el: item, top: 0 });
// }

// function updateLoop() {
//   if (gameRunning) requestAnimationFrame(updateLoop);
//   updateItems();
// }

// function updateItems() {
//   const basketRect = basket.getBoundingClientRect();

//   items.forEach((item, index) => {
//     item.top += 4;
//     item.el.style.top = `${item.top}px`;
//     const itemRect = item.el.getBoundingClientRect();

//     if (
//       itemRect.bottom >= basketRect.top &&
//       itemRect.left < basketRect.right &&
//       itemRect.right > basketRect.left
//     ) {
//       handleCollision(item);
//       items.splice(index, 1);
//     } else if (item.top > gameArea.clientHeight) {
//       item.el.remove();
//       items.splice(index, 1);
//     }
//   });
// }

// function handleCollision(item) {
//   item.el.remove();
//   const isEgg = item.el.dataset.type === 'egg';
//   if (isEgg) {
//     score++;
//     eggCount++;
//     eggSound.play();
//   } else {
//     score = Math.max(0, score - 1);
//     eggCount = Math.max(0, eggCount - 1);
//     bombSound.play();
//   }
//   scoreDisplay.textContent = score;

//   basket.style.backgroundImage = eggCount >= 3 ? "url('basket-full.png')" : "url('basket.png')";
// }

// function showResult() {
//   finalScore.textContent = score;
//   resultPopup.style.display = 'block';

//   // Send to backend
//   try {
//     window.parent.postMessage({ type: 'GAME_OVER', score: score }, 'http://localhost:5173');
//   } catch (err) {
//     console.error('Failed to postMessage to parent:', err);
//   }
// }

// // Smooth movement for touch and arrow keys
// function smoothBasketMovement() {
//   const currentLeft = parseFloat(getComputedStyle(basket).left) || 0;
//   const maxLeft = gameArea.clientWidth - basket.offsetWidth;

//   if (targetLeft !== null) {
//     const diff = targetLeft - currentLeft;
//     const ease = diff * 0.6;
//     if (Math.abs(diff) < 1) {
//       basket.style.left = `${targetLeft}px`;
//       targetLeft = null;
//     } else {
//       basket.style.left = `${currentLeft + ease}px`;
//     }
//   }

//   const current = parseFloat(basket.style.left) || basket.offsetLeft;
//   if (keys['ArrowLeft']) {
//     targetLeft = Math.max(0, current - 15);
//   }
//   if (keys['ArrowRight']) {
//     targetLeft = Math.min(maxLeft, current + 15);
//   }

//   requestAnimationFrame(smoothBasketMovement);
// }


const basket = document.getElementById('basket');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const startPopup = document.getElementById('startPopup');
const resultPopup = document.getElementById('resultPopup');
const finalScore = document.getElementById('finalScore');
const eggSound = document.getElementById('eggSound');
const bombSound = document.getElementById('bombSound');
const basketSlider = document.getElementById('basketSlider');

let score = 0;
let timeLeft = 60;
let gameRunning = false;
let items = [];
let eggCount = 0;
let keys = {};
let isDragging = false;
let startX = 0;
let basketStartX = 0;
let targetLeft = null;

// Touch movement
gameArea.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    isDragging = true;
    startX = e.touches[0].clientX;
    basketStartX = parseFloat(getComputedStyle(basket).left) || basket.offsetLeft;
  }
});

gameArea.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const touchX = e.touches[0].clientX;
  const deltaX = touchX - startX;
  let newLeft = basketStartX + deltaX;
  const maxLeft = gameArea.clientWidth - basket.offsetWidth;
  newLeft = Math.max(0, Math.min(newLeft, maxLeft));
  basket.style.left = `${newLeft}px`;
  updateSliderFromBasket();
});

gameArea.addEventListener("touchend", () => {
  isDragging = false;
});

// Slider movement
basketSlider.addEventListener("input", () => {
  const percent = parseInt(basketSlider.value);
  const maxLeft = gameArea.clientWidth - basket.offsetWidth;
  const newLeft = (percent / 100) * maxLeft;
  basket.style.left = `${newLeft}px`;
});

// Keyboard input
document.addEventListener('keydown', (e) => keys[e.key] = true);
document.addEventListener('keyup', (e) => keys[e.key] = false);

startBtn.addEventListener('click', () => {
  startPopup.style.display = 'none';
  resultPopup.style.display = 'none';
  gameRunning = true;
  score = 0;
  timeLeft = 60;
  eggCount = 0;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  basket.style.backgroundImage = "url('basket.png')";
  basket.style.left = `${(gameArea.clientWidth - basket.offsetWidth) / 2}px`;
  updateSliderFromBasket();
  items.forEach(i => i.el.remove());
  items = [];
  startGame();
});

function updateSliderFromBasket() {
  const maxLeft = gameArea.clientWidth - basket.offsetWidth;
  const currentLeft = parseFloat(basket.style.left) || 0;
  const percent = (currentLeft / maxLeft) * 100;
  basketSlider.value = percent;
}

function startGame() {
  countdown();
  spawnLoop();
  updateLoop();
  smoothBasketMovement();
}

function countdown() {
  const timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      gameRunning = false;
      showResult();
    }
  }, 1000);
}

function spawnLoop() {
  if (!gameRunning) return;
  spawnItem();
  setTimeout(spawnLoop, 800);
}

function spawnItem() {
  const item = document.createElement('div');
  item.classList.add('item');
  const isEgg = Math.random() > 0.3;
  item.classList.add(isEgg ? 'egg' : 'bomb');
  item.dataset.type = isEgg ? 'egg' : 'bomb';
  item.style.left = `${Math.random() * (gameArea.clientWidth - 40)}px`;
  gameArea.appendChild(item);
  items.push({ el: item, top: 0 });
}

function updateLoop() {
  if (gameRunning) requestAnimationFrame(updateLoop);
  updateItems();
  moveWithKeys();
}

function moveWithKeys() {
  const step = 20; // ⬆️ Increased speed
  const maxLeft = gameArea.clientWidth - basket.offsetWidth;
  let left = parseFloat(basket.style.left) || basket.offsetLeft;

  if (keys['ArrowLeft']) {
    left = Math.max(0, left - step);
    basket.style.left = `${left}px`;
    updateSliderFromBasket();
  }
  if (keys['ArrowRight']) {
    left = Math.min(maxLeft, left + step);
    basket.style.left = `${left}px`;
    updateSliderFromBasket();
  }
}

function updateItems() {
  const basketRect = basket.getBoundingClientRect();

  items.forEach((item, index) => {
    item.top += 4;
    item.el.style.top = `${item.top}px`;
    const itemRect = item.el.getBoundingClientRect();

    if (
      itemRect.bottom >= basketRect.top &&
      itemRect.left < basketRect.right &&
      itemRect.right > basketRect.left
    ) {
      handleCollision(item);
      items.splice(index, 1);
    } else if (item.top > gameArea.clientHeight) {
      item.el.remove();
      items.splice(index, 1);
    }
  });
}

function handleCollision(item) {
  item.el.remove();
  const isEgg = item.el.dataset.type === 'egg';
  if (isEgg) {
    score++;
    eggCount++;
    eggSound.play();
  } else {
    score = Math.max(0, score - 1);
    eggCount = Math.max(0, eggCount - 1);
    bombSound.play();
  }
  scoreDisplay.textContent = score;
  basket.style.backgroundImage = eggCount >= 3 ? "url('basket-full.png')" : "url('basket.png')";
}

function showResult() {
  finalScore.textContent = score;
  resultPopup.style.display = 'block';

  try {
    window.parent.postMessage({ type: 'GAME_OVER', score: score }, 'http://localhost:5173');
  } catch (err) {
    console.error('postMessage error:', err);
  }
}

function smoothBasketMovement() {
  requestAnimationFrame(smoothBasketMovement);
}
