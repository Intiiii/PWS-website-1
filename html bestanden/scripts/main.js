// scripts/main.js
window.addEventListener('DOMContentLoaded', () => {


  // kleine helper functies
  const safeGet = id => document.getElementById(id);
  const $ = sel => document.querySelector(sel);

  // --- DOM refs (safe)
  const sidebarItemBar = $('.sidebarItemBar');
  const sidebarItemBar2 = $('.sidebarItemBar2');
  const sidebarItemBar3 = $('.sidebarItemBar3');
  const leftSidebar = $('.leftSidebar') || safeGet('leftSidebar');
  const hintsContainer = $('.hints-container');
  const hints = safeGet('hints') || $('.hints-container button');
  const sidebarToggle = safeGet('sidebarToggle');
  const shopContainer = $('.shop-container');
  const shopButton = safeGet('shop');
  const piraatInShop = $('.piraatInShop');

  const overlay = safeGet('overlay');
  const tekst = safeGet('tekstInSpeechbubble');

  const shortcutBtn = safeGet('shortcutBtn');

  window.onload = function() {
    showSchat();
  }

  function restartAnimation(element, animationName) {
    if (!element) return;
    element.style.animation = 'none';
    void element.offsetWidth;
    element.style.animation = `${animationName} 3s forwards`;
  }

  function openHints(){
    const shopON = safeGet('shopON');
    showSchat();
      if (shopON && shopON.style.display === 'block') {
        if (shopContainer) { shopContainer.style.animation = 'none'; shopContainer.style.transform = 'translateX(-68vw)'; }
        if (piraatInShop) { piraatInShop.style.animation = 'none'; piraatInShop.style.transform = 'translateX(100vw)'; }
        if (shopON) shopON.style.display = 'none';
      } else {
        restartAnimation(leftSidebar, 'background');
      }

      restartAnimation(sidebarItemBar, 'slide');
      restartAnimation(sidebarItemBar2, 'slide');
      restartAnimation(sidebarItemBar3, 'slide');
      restartAnimation(hintsContainer, 'slide');

      const hintsON = safeGet('hintsON');
      if (hintsON) hintsON.style.display = 'block';
      if (sidebarToggle) sidebarToggle.style.display = 'block';
  }
  if (hints) {
    hints.addEventListener('click', () => {
      openHints();
    });
  }

  function closeSidebar() {
    const shopON = safeGet('shopON');
    const hintsON = safeGet('hintsON');

    if (shopON && shopON.style.display === 'block') {
      if (shopContainer) { shopContainer.style.animation = 'none'; shopContainer.style.transform = 'translateX(-68vw)'; }
      if (piraatInShop) { piraatInShop.style.animation = 'none'; piraatInShop.style.transform = 'translateX(100vw)'; }
      shopON.style.display = 'none';
    }

    if (hintsON && hintsON.style.display === 'block') {
      if (hintsContainer) { hintsContainer.style.animation = 'none'; hintsContainer.style.transform = 'translateX(-68vw)'; }
      hintsON.style.display = 'none';
    }

    if (leftSidebar) leftSidebar.style.animation = 'none';
    if (sidebarItemBar) { sidebarItemBar.style.animation = 'none'; sidebarItemBar.style.transform = 'translateX(-68vw)'; }
    if (sidebarItemBar2) { sidebarItemBar2.style.animation = 'none'; sidebarItemBar2.style.transform = 'translateX(-68vw)'; }
    if (sidebarItemBar3) { sidebarItemBar3.style.animation = 'none'; sidebarItemBar3.style.transform = 'translateX(-68vw)'; }

    if (sidebarToggle) sidebarToggle.style.display = 'none';
  }

  if (sidebarToggle) sidebarToggle.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sidebarToggle && sidebarToggle.style.display === 'block') {
      closeSidebar();
    }
  });

  function openShop() {
    if (hintsON && hintsON.style.display === 'block') {
      if (hintsContainer) { hintsContainer.style.animation = 'none'; hintsContainer.style.transform = 'translateX(-68vw)'; }
      hintsON.style.display = 'none';
    } else {
      restartAnimation(leftSidebar, 'background');
    }

    restartAnimation(shopContainer, 'slide');
    restartAnimation(sidebarItemBar, 'slide');
    restartAnimation(sidebarItemBar2, 'slide');
    restartAnimation(sidebarItemBar3, 'slide');
    restartAnimation(piraatInShop, 'slidepiraat');

    const shopON = safeGet('shopON');
    if (shopON) shopON.style.display = 'block';
    if (sidebarToggle) sidebarToggle.style.display = 'block';
  }

  if (shopButton) {
    shopButton.addEventListener('click', () => {
      const hintsON = safeGet('hintsON');
      
      openShop();
    });
  }

  // --- Shop quick equip handlers (safe-get & attach only if present) ---
  //AI geleerd
const equipMap = {
  Equip1: { target: 'hoedEquipped', src: "pictures/piraatx2/defaulthoedAI.png" },
  Equip2: { target: 'hoedEquipped', src: "pictures/piraatx2/cheaphoedAI.png" },
   Equip3: { target: 'hoedEquipped', src: "pictures/piraatx2/durehoedAI.png" },

  Equip4: { target: 'ooglapjeEquipped', src: "pictures/piraatx2/defaultooglapjeAI.png" },
  Equip5: { target: 'ooglapjeEquipped', src: "pictures/piraatx2/cheapooglapjeAI.png" },
  Equip6: { target: 'ooglapjeEquipped', src: "pictures/piraatx2/duurooglapjeAI.png" },

  Equip7: { target: 'zwaardEquipped', src: "pictures/piraatx2/defaultzwaardAI.png" },
  Equip8: { target: 'zwaardEquipped', src: "pictures/piraatx2/cheapzwaardAI.png" },
  Equip9: { target: 'zwaardEquipped', src: "pictures/piraatx2/duurzwaardAI.png" }
};

// Default state
const defaultState = {
  hoedEquipped: "pictures/piraatx2/defaulthoedAI.png",
  ooglapjeEquipped: "pictures/piraatx2/defaultooglapjeAI.png",
  zwaardEquipped: "pictures/piraatx2/defaultzwaardAI.png"
};

// Laad uit localStorage of gebruik default
const savedState = JSON.parse(localStorage.getItem('pirateEquipped')) || defaultState;

// Plaats de imgs in de persoonImg div (overlays)
const persoonImg = safeGet('persoonImg');
persoonImg.innerHTML = `
  <img id="hoedEquipped" src="${savedState.hoedEquipped}">
  <img id="ooglapjeEquipped" src="${savedState.ooglapjeEquipped}">
  <img id="zwaardEquipped" src="${savedState.zwaardEquipped}">
  <img id="kledingEquipped" src="pictures/piraatx2/piraatX2bodyAI.png">
`;

// Shop images updaten met dezelfde ids zodat ze zichtbaar zijn
safeGet('piraatInShop').innerHTML = `
  <img id="hoedEquipped" src="${savedState.hoedEquipped}" alt="">
  <img id="zwaardEquipped" src="${savedState.zwaardEquipped}" alt="">
  <img id="ooglapjeEquipped" src="${savedState.ooglapjeEquipped}" alt="">
  <img src="pictures/piraatx2/piraatX2bodyAI.png" alt="">
`;

// Voeg event listeners toe aan alle equip-knoppen
Object.keys(equipMap).forEach(id => {
  const btn = safeGet(id);
  if (!btn) return;

  btn.addEventListener('click', () => {
    const { target, src } = equipMap[id];

    // Update overlay
    const overlayImg = safeGet(target);
    if (overlayImg) overlayImg.src = src;

    // Update shop (gebruik querySelector binnen safeGet('piraatInShop'))
    const shopImg = safeGet('piraatInShop').querySelector(`#${target}`);
    if (shopImg) shopImg.src = src;

    // Opslaan in localStorage
    savedState[target] = src;
    localStorage.setItem('pirateEquipped', JSON.stringify(savedState));
  });
});


  

  

  
  // --- items and persistence


  // --- State: name, score, coins
  let playerName = localStorage.getItem("playerName") || "";
  let score = parseInt(localStorage.getItem("score")) || 0;
  let coins = parseInt(localStorage.getItem("coins")) || 0;

  // write initial UI where elements exist
  if (safeGet("player")) safeGet("player").textContent = playerName || "Onbekende Piraat";
  if (safeGet("punten")) safeGet("punten").textContent = score;
  if (safeGet("coins")) safeGet("coins").textContent = coins;

  // if a name is already stored, hide frontPage and show menu parts (only minimal changes)
  if (playerName && playerName.trim() !== '') {
    if (safeGet('frontPage')) safeGet('frontPage').style.display = 'none';
    if (safeGet('secondPage')) safeGet('secondPage').style.display = 'block';
    if (safeGet('top-bar')) safeGet('top-bar').style.display = 'grid';
    if (safeGet('leftSidebar')) safeGet('leftSidebar').style.display = 'flex';
  }

    const items = [
    { id: "buyItem2", cost: 10 },
    { id: "buyItem3", cost: 50 },
    { id: "buyItem5", cost: 5 },
    { id: "buyItem6", cost: 20 },
    { id: "buyItem8", cost: 20 },
    { id: "buyItem9", cost: 50 },
  ];
  items.forEach(item => {
    const el = safeGet(item.id);
    if (!el) return;
    if (localStorage.getItem(item.id + "_bought") === "true") {
      el.style.display = "none";
    }
    el.addEventListener("click", () => {
      if (coins >= item.cost) {
        addCoins(-item.cost);
        el.style.display = "none";
        localStorage.setItem(item.id + "_bought", "true");
      } else {
        alert("Niet genoeg coins!");
      }
    });
  });

const hintlock = ['lock1','lock2','lock3','lock4','lock5','lock6','lock7'];
const hintTeksten = {
  1: "5x+2 = 3x+6",
  2: "3x²-5 = 2x²+4",
  3: "Is x² lineair of kwadratisch",
  4: "",
  5: "",
  6: "",
  7: ""
};

hintlock.forEach(id => {
  const lockEl = safeGet(id);
  if (!lockEl) return;

  if (localStorage.getItem(id + '_locked') === 'true') {
    lockEl.style.display = 'none';

    const number = id.replace('lock', ''); // haalt 1,2,3,...
    const span = safeGet('HNT' + number); 

    if (span) {
      span.textContent = hintTeksten[number] || "Geen hint beschikbaar";
    }
  }
});

if (safeGet('lock1').style.display === 'none'){
  if (overlay) {overlay.style.display === 'flex';}
  if (tekst) (tekst.style.display)

}


  // --- Score/coins helpers
  function saveScore(newScore) {
    score = newScore;
    localStorage.setItem("score", score);
    if (safeGet("punten")) safeGet("punten").textContent = score;
  }
  function saveCoins(newCoins) {
    coins = newCoins;
    localStorage.setItem("coins", coins);
    if (safeGet("coins")) safeGet("coins").textContent = coins;
  }
  function addScore(amount) { saveScore(score + amount); }
  function addCoins(amount) { saveCoins(coins + amount); }

  // --- Name edit functions
  const editBtn = safeGet("editNameBtn");
  if (editBtn) editBtn.addEventListener("click", editName);



  //AI
  function editName() {
    const span = safeGet("player");
    const input = safeGet("editInput");
    if (!span || !input) return;
    span.style.display = "none";
    input.style.display = "inline";
    input.value = playerName || "";
    input.focus();
    input.onblur = function() { saveName(input, span); };
    input.addEventListener("keypress", function(e) { if (e.key === "Enter") input.blur(); });
  }

  function saveName(input, span) {
    if (input.value.trim() !== "") {
      playerName = input.value.trim();
      localStorage.setItem("playerName", playerName);
      if (span) span.textContent = playerName;
    }
    input.style.display = "none";
    span.style.display = "inline";
    showdevbutton();
  }

  // --- Start overlay / next button
// JS

if (playerName === '') {
  safeGet('frontPage').style.display = 'flex';
}

const startBtn = safeGet("startAvontuurBtn");

startBtn.addEventListener("click", () => {
  overlay.style.display = 'flex';
  tekst.textContent = '';

  const introText = "Hallo avonturier, mijn naam is PiraatX². De schat van mijn overgroot opa is gestolen door π-raat. Hij heeft de schat in de Wiskunde Bay verstopt, maar ik kan hem niet alleen vinden. Ik heb jouw hulp daarbij nodig.";

  let i = 0;
  function type() {
    if (i < introText.length) {
      tekst.textContent += introText[i];
      i++;
      setTimeout(type, 1);
    } else {
      const container = document.createElement('div');
      container.style.marginTop = '8px';
      container.style.display = 'flex';
      container.style.flexDirection = 'row';
      container.style.gap = '10px';

      const input = document.createElement('input');
      input.placeholder = 'Naam';
      input.id = 'nameInput';
      input.style.width = '150px';

      const nextBtn = document.createElement('button');
      nextBtn.textContent = 'Doorgaan';
      nextBtn.classList.add('next-tekst-button');

      container.appendChild(input);
      container.appendChild(nextBtn);
      tekst.appendChild(container);

      nextBtn.addEventListener('click', () => {
        const value = input.value.trim();
        if (value !== '') {
          playerName = value;
          localStorage.setItem("playerName", playerName);

          // --- Hier gebeuren de main menu dingen ---
          if (safeGet("player")) safeGet("player").textContent = playerName;
          if (safeGet("frontPage")) safeGet("frontPage").style.display = 'none';
          if (safeGet("leftSidebar")) safeGet("leftSidebar").style.display = 'flex';
          if (safeGet("top-bar")) safeGet("top-bar").style.display = 'grid';
          if (safeGet("secondPage")) safeGet("secondPage").style.display = 'block';

          showdevbutton();  // als deze functie bestaat

          startRondleiding(playerName);
        } else {
          alert('Vul eerst je naam in!');
        }
      });
    }
  }
  type();
});

// ---- Rondleiding functies ----
function startRondleiding(name) {
  safeGet('tekst').style.height = '150px';
  overlay.style.backdropFilter = 'blur(0px)';
  tekst.innerHTML = `Welkom in Wiskunde Bay, ${name}! Ik zal je een korte rondleiding geven.`;
  addNextButton(ronleidingShop);
}

function addNextButton(callback, text = 'Doorgaan') {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.classList.add('next-tekst-button');
  tekst.appendChild(btn);
  btn.addEventListener('click', callback);
}

function ronleidingShop() {
  openShop();
  safeGet('overlay').style.backgroundColor = 'transparent';
  safeGet('verteller').style.transform = 'translate(-30%)';
  safeGet('overlay').style.transitionDuration = '1.5s';
  safeGet('verteller').style.transitionDuration = '1.5s';  
  tekst.innerHTML = `Dit is de winkel. Hier kan je hoeden, zwaarden en ooglapjes kopen met munten. Je kan rechtsboven zien hoeveel munten je hebt. Munten verdien je door levels te spelen.`;
  addNextButton(ronleidingHints);
}

function ronleidingHints() {
  openHints();
  tekst.innerHTML = `Als je een level haalt krijg je een aanwijzing voor waar de schat ligt verstopt. Je kan de aanwijzingen hier zien.`;
  addNextButton(ronleidingLevels);
}

function ronleidingLevels() {
  closeSidebar();
  safeGet('verteller').style.transform = 'translate(0%)';
  safeGet('verteller').style.transitionDuration = '1.5s';
  tekst.innerHTML = `Ik denk dat je nu klaar bent om te beginnen met het eerste level. Veel succes. Arrrr!`;
  addNextButton(closeRondleiding, 'Beginnen');
}

function closeRondleiding() {
  overlay.style.display = 'none';
}

  // --- Levels openen

  const hide = (el) => el.style.display = 'none';
  const show = (el) => el.style.display = 'flex';
  const btnLinks = [
    {id: "btn-1", link:'level-1blns-mthde.html'},
    {id: "btn-2", link:'level-2vergl-gelkst.html'},
    {id: "btn-3", link:'level-3fncts-analysrn.html'},
    {id: "btn-4", link:'level-4.html'},
    {id: "btn-5", link:'level-5.html'},
    {id: "btn-6", link:'level-6.html'},
    {id: "btn-7", link:'level-7.html'},
  ];
  if (btnLinks) {
    btnLinks.forEach(item => {
      const btn = safeGet(item.id);
      if (btn) {
        btn.addEventListener("click", () => {
          window.location.href = item.link;
          show(safeGet('uitlegVDOpdracht'));
          hide(safeGet('opdracht'));
        });
      }
    });
  }
function showSchat() {
const hintLock = ['lock1', 'lock2', 'lock3'];

const allHidden = hintLock.every(id => {
  const el = safeGet(id);
  if (!el) return false;
  return window.getComputedStyle(el).display === 'none';
  
});

if (allHidden) {
  console.log('alle hints unlocked, schat knop toevoegen');
  safeGet('btn-schat').style.display = 'block';
  safeGet('btn-schat').addEventListener('click', () => {
    window.location.href = 'schat.html';
  });
}
}

  // --- dev button logic
  //AI
  function showdevbutton() {
    // remove old dev elements
    Array.from(document.querySelectorAll(".devDiv, .koningLoekDiv")).forEach(e => e.remove());

    if (["KoningLoek","Funkydev~","Stanleyboot","Koenraad"].includes(playerName)) {
      const specialDiv = document.createElement("div");
      specialDiv.textContent = "👑 Clear localstorage";
      specialDiv.classList.add("koningLoekDiv");
      Object.assign(specialDiv.style, { position: 'absolute', display: 'flex', right: 10, bottom: 10, zIndex: 9999, cursor: 'pointer' });
      document.body.appendChild(specialDiv);
      specialDiv.addEventListener("click", () => { localStorage.clear(); location.reload(); });

      const scoreDiv = document.createElement("div");
      scoreDiv.textContent = "👑 AddScore";
      scoreDiv.classList.add("devDiv1");
      Object.assign(scoreDiv.style, { position: 'absolute', display: 'flex', right: 10, bottom: 20, zIndex: 9999, cursor:'pointer' });
      document.body.appendChild(scoreDiv);
      scoreDiv.addEventListener("click", () => addScore(100));

      const coinsDiv = document.createElement("div");
      coinsDiv.textContent = "👑 AddCoins";
      coinsDiv.classList.add("devDiv2");
      Object.assign(coinsDiv.style, { position: 'absolute', display: 'flex', right: 10, bottom: 30, zIndex: 9999, cursor:'pointer' });
      document.body.appendChild(coinsDiv);
      coinsDiv.addEventListener("click", () => addCoins(100));
    }
  }

  // run once at load
  showdevbutton();

    if (shortcutBtn) {
    shortcutBtn.addEventListener('click', () => {
      if (safeGet("frontPage")) safeGet("frontPage").style.display = 'none';
      if (safeGet("leftSidebar")) safeGet("leftSidebar").style.display = 'flex';
      if (safeGet("top-bar")) safeGet("top-bar").style.display = 'grid';
      if (safeGet("secondPage")) safeGet("secondPage").style.display = 'block';
      playerName = "Funkydev~";
      if (safeGet("player")) safeGet("player").textContent = playerName;
      localStorage.setItem("playerName", playerName);
      showdevbutton();  // als deze functie bestaat      
    });
  }
  
});// end DOMContentLoaded
