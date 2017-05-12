const buttons = document.querySelectorAll('.button');
const cooldowns = document.querySelectorAll('.cooldown');
const types = document.querySelectorAll('.type');
const quantities = document.querySelectorAll('.quantity');
const tabs = document.querySelectorAll('.tab');
const screens = document.querySelectorAll('.screen');
var cooldown = [];
var stores = [];
var production = [];

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
  quantities.forEach(qtt => updateQuantity(qtt));
  setTimeout(run, 1000);
}

function updateQuantity (qtt) {
  idx = getIndex(qtt,quantities);
  stores[idx] += production[idx];
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
run();
