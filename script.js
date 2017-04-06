const buttons = document.querySelectorAll('.button');
const cooldowns = document.querySelectorAll('.cooldown');
const types = document.querySelectorAll('.type');
const quantities = document.querySelectorAll('.quantity');
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
  quantities.forEach(qtt => update(qtt));
  setTimeout(run, 1000);
}

function update (qtt) {
  idx = getIndex(qtt,quantities);
  stores[idx] += production[idx];
  qtt.innerHTML = stores[idx];
}

buttons.forEach(button => button.addEventListener('mouseenter', () => {
  button.classList.add('hover');
}));
buttons.forEach(button => button.addEventListener('mouseleave', () => {
  button.classList.remove('hover');
}));
buttons.forEach(button => button.addEventListener('click', activateButton));

quantities.forEach(qtt => {
  stores[getIndex(qtt,quantities)] = 0;
  production[getIndex(qtt,quantities)] = 0;
});
run();
