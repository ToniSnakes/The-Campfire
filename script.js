const buttons = document.querySelectorAll('.button');
const cooldowns = document.querySelectorAll('.cooldown');
const types = document.querySelectorAll('.type');
const quantities = document.querySelectorAll('.quantity');
const tabs = document.querySelectorAll('.tab');
const screens = document.querySelectorAll('.screen');
const huts = document.querySelectorAll('.hut');
const farms = document.querySelectorAll('.farm');
const strips = document.querySelectorAll('.buttonStrip');
var cooldown = [];
var stores = [];
var production = [];
var hutIdx = 5;
var farmIdx = 20;

function getIndex (e, list) {
  for (i = 0; i < list.length; ++i) {
    if (list[i] == e) {
      return i;
    }
  }
  return -1;
}

function activateButton (e) {
  var idx = getIndex(this,buttons);
  console.log(idx);
}

function run () {
  production[0] = stores[2];
  quantities.forEach(qtt => updateProduction(qtt));
  quantities.forEach(qtt => updateQuantity(qtt));
  setTimeout(run, 1000);
}

function updateProduction (qtt) {
  idx = getIndex(qtt,quantities);
  stores[idx] += production[idx];
}

function updateQuantity (qtt) {
  idx = getIndex(qtt,quantities);
  qtt.innerHTML = Math.floor(stores[idx]);
}

function switchScreen (e) {
  screens.forEach(screen => {
    if (this.getAttribute("data-tab") == screen.getAttribute("data-screen")) {
      screen.classList.remove('hidden');
    }
    else {
      screen.classList.add('hidden');
    }
  });
}

function buildFarm (e) {
  if (!this.classList.contains('built') && stores[0] >= 40) {
    this.classList.add('built');
    stores[0] -= 40;
    stores[1] += 5;
    quantities.forEach(qtt => updateQuantity(qtt));
    console.log("built farm");
    if (farmIdx == 29) {
      farmIdx = 32;
    }
    if (farmIdx < 36) {
      strips[++farmIdx].insertAdjacentHTML('beforeend', '<div class="button farm">farm</div>');
      updateButtonList();
      updateFarmList();
    }
  }
  //console.log(this);
}

function buildHut (e) {
  if (!this.classList.contains('built') && stores[0] >= 20 && stores[1] >= 4) {
    this.classList.add('built');
    stores[0] -= 20;
    stores[1] -= 4;
    stores[2] += 4;
    quantities.forEach(qtt => updateQuantity(qtt));
    console.log("built hut");
    if (hutIdx == 9) {
      hutIdx = 14;
    }
    if (hutIdx < 19) {
      strips[++hutIdx].insertAdjacentHTML('beforeend', '<div class="button hut">hut</div>');
      updateButtonList();
      updateHutList();
    }
  }
  //console.log(this);
}

function updateButtonList () {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => button.addEventListener('mouseenter', () => {
    button.classList.add('hover');
  }));
  buttons.forEach(button => button.addEventListener('mouseleave', () => {
    button.classList.remove('hover');
  }));
  buttons.forEach(button => button.addEventListener('click', activateButton));
}

function updateHutList () {
  const huts = document.querySelectorAll('.hut');
  huts.forEach(hut => hut.addEventListener('click', buildHut));
}

function updateFarmList () {
  const farms = document.querySelectorAll('.farm');
  farms.forEach(farm => farm.addEventListener('click', buildFarm));
}

buttons.forEach(button => button.addEventListener('mouseenter', () => {
  button.classList.add('hover');
}));
buttons.forEach(button => button.addEventListener('mouseleave', () => {
  button.classList.remove('hover');
}));
buttons.forEach(button => button.addEventListener('click', activateButton));

tabs.forEach(tab => tab.addEventListener('mouseenter', () => {
  tab.classList.add('hover');
}));
tabs.forEach(tab => tab.addEventListener('mouseleave', () => {
  tab.classList.remove('hover');
}));
tabs.forEach(tab => tab.addEventListener('click', switchScreen));

quantities.forEach(qtt => {
  stores[getIndex(qtt,quantities)] = 0;
  production[getIndex(qtt,quantities)] = 0;
});
stores[2] = 1;
stores[0] = 1000;
stores[1] = 500;
run();

farms.forEach(farm => farm.addEventListener('click', buildFarm));

huts.forEach(hut => hut.addEventListener('click', buildHut));
