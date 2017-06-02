var buttons = document.querySelectorAll('.button');
var cooldowns = document.querySelectorAll('.cooldown');
var types = document.querySelectorAll('.type');
var quantities = document.querySelectorAll('.quantity');
var tabs = document.querySelectorAll('.tab');
var screens = document.querySelectorAll('.screen');
var huts = document.querySelectorAll('.hut');
var farms = document.querySelectorAll('.farm');
var strips = document.querySelectorAll('.buttonStrip');
var separators = document.querySelectorAll('.buttonSeparator');
var log = document.querySelector('.logs');
var actions = document.querySelectorAll('.action');
var messages = document.querySelectorAll('.logMessage');
var tab = document.querySelector('.tabs');
var tabs = document.querySelectorAll('.tab');
var columns = document.querySelectorAll('.column');
var main = document.querySelector('.main');

var cooldown = [];
var stores = [];
var production = [];
var hutIdx = 5;
var farmIdx = 20;
var maxLogs = 22;
var charPerLogLine = 24;

var buildReq = [0,1,1,1,1,1,3,2,1,2,3,1,2,2,2,2,4];
var buildCurr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

function getIndex (e, list) {
  for (i = 0; i < list.length; ++i) {
    if (list[i] == e) {
      return i;
    }
  }
  return -1;
}

function activateButton (e) {
  //var idx = getIndex(this,buttons);
  //console.log(idx);
  var bid = this.getAttribute('data-buildID');
  console.log(buildCurr);
  console.log(buildReq);
  console.log(bid);
  if (this.getAttribute('data-building') && !this.classList.contains('built') && buildCurr[bid] == buildReq[bid]) {
    this.classList.add('built');
    console.log(this.classList);
    var functionName = "build" + this.getAttribute('data-building') + "()";
    var buildFunction = new Function(functionName);
    buildFunction();
  }
  if (this.getAttribute('data-building') == "Mechanic") {
    updateLogs("One line of text");
  }
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

function buildFarm () {
  if (stores[0] >= 40) {
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

function buildHut () {
  if (stores[0] >= 20 && stores[1] >= 4) {
    stores[0] -= 20;
    stores[1] -= 4;
    stores[2] += 4;
    quantities.forEach(qtt => updateQuantity(qtt));
    //console.log("built hut");
    if (hutIdx == 9) {
      hutIdx = 14;
    }
    if (hutIdx < 19) {
      strips[++hutIdx].insertAdjacentHTML('beforeend', '<div class="button hut" data-building="Hut" data-buildID="11">hut</div>');
      updateButtonList();
      updateHutList();
    }
  }
  //console.log(this);
}

function updateButtonList () {
  buttons = document.querySelectorAll('.button');
  buttons.forEach(button => button.addEventListener('mouseenter', () => {
    button.classList.add('hover');
  }));
  buttons.forEach(button => button.addEventListener('mouseleave', () => {
    button.classList.remove('hover');
  }));
  buttons.forEach(button => button.addEventListener('click', activateButton));
  strips = document.querySelectorAll('.buttonStrip');
}

function updateHutList () {
  huts = document.querySelectorAll('.hut');
  //huts.forEach(hut => hut.addEventListener('click', buildHut));
}

function updateFarmList () {
  farms = document.querySelectorAll('.farm');
  //farms.forEach(farm => farm.addEventListener('click', buildFarm));
}

function updateLogs (message) {
  var lines = Math.floor(message.length/25) + 1;
  var element = '<div class="logMessage" data-history=0>' + message + '</div>';
  log.insertAdjacentHTML('afterbegin', element);
  messages.forEach(message => {
    var age = message.getAttribute('data-history')/1 + lines;
    if (age >= maxLogs) {
      message.remove();
    }
    else {
      message.setAttribute('data-history', age);
      message.style.opacity = (maxLogs - age) / maxLogs;
    }
  });
  messages = document.querySelectorAll('.logMessage');
}

function updateTabList () {
  tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.addEventListener('mouseenter', () => {
    tab.classList.add('hover');
  }));
  tabs.forEach(tab => tab.addEventListener('mouseleave', () => {
    tab.classList.remove('hover');
  }));
  tabs.forEach(tab => tab.addEventListener('click', switchScreen));
  screens = document.querySelectorAll('.screen');
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

run();

//farms.forEach(farm => farm.addEventListener('click', buildFarm));

//huts.forEach(hut => hut.addEventListener('click', buildHut));

/*actions.forEach(action => action.addEventListener('transitionend', () => {
  console.log(action.classList);
  if (action.classList.contains('cooldown')) {
    var cooldown = action.getAttribute('data-cooldown');
    action.style.transitionDuration = cooldown;
    action.classList.remove('cooldown');
  }
}));*/


function buildCampfire () {
  tab.insertAdjacentHTML('afterbegin', '<div class="tab" data-tab="1">A Campfire</div>');
  updateTabList();
  columns[0].insertAdjacentHTML('afterbegin', '<div class="filler"></div><div class="logs"></div>');
  log = document.querySelector('.logs');
  updateLogs("You get a fire started");
  setTimeout(function() {updateLogs("You figure it should be able to keep you warm");}, 1000);
  columns[1].insertAdjacentHTML('afterbegin', '<div class="filler"></div><div class="stores"><div class="supply"><div class="type">wood:</div><div class="quantity" data-resource="wood">0</div></div><div class="supply"><div class="type">food:</div><div class="quantity" data-resource="food">0</div></div><div class="supply"><div class="type">people:</div><div class="quantity" data-resource="people">0</div></div></div><div class="filler"></div>');
  quantities = document.querySelectorAll('.quantity');
  quantities.forEach(qtt => {
    stores[getIndex(qtt,quantities)] = 0;
    production[getIndex(qtt,quantities)] = 0;
  });
  stores[2] = 1;
  stores[0] = 1000;
  stores[1] = 500;
  setTimeout(function() {updateLogs("You start gethering wood");}, 3000);
  separators[8].insertAdjacentHTML('afterbegin', '<div class="button" data-building="Carpenter" data-buildID="4">carpenter</div>');
  ++buildCurr[4];
  updateButtonList();
}

function buildCarpenter () {
  separators[4].insertAdjacentHTML('afterbegin', '<div class="button" data-building="Crafter" data-buildID="1">crafter</div>');
  //++buildCurr[1];
  separators[6].insertAdjacentHTML('afterbegin', '<div class="button" data-building="Mechanic" data-buildID="3">mechanic</div>');
  //++buildCurr[3];
  separators[10].insertAdjacentHTML('afterbegin', '<div class="button" data-building="Fletcher" data-buildID="2">fletcher</div>');
  //++buildCurr[2];
  buildCurr = buildCurr.map(i => i + 1);
  tab.insertAdjacentHTML('beforeend', '<div class="tab" data-tab="2">A Forest</div>');
  main.insertAdjacentHTML('beforeend', '<div class="forest screen hidden" data-screen="2"><div class="filler column"><div class="buttonStrip"><div class="button hut" data-building="Hut" data-buildID="11">hut</div></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div></div><div class="filler bigger column"><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"><div class="button" data-building="Forager" data-buildID="8">forager</div></div><div class="buttonStrip"></div><div class="buttonStrip"></div></div><div class="filler column"><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div></div></div>');
  tab.insertAdjacentHTML('beforeend', '<div class="tab" data-tab="3">Empty Land</div>');
  main.insertAdjacentHTML('beforeend', '<div class="land screen hidden" data-screen="3"><div class="filler column"><div class="buttonStrip"><div class="button farm" data-building="Farm" data-buildID="12">farm</div></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div></div><div class="filler column"><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div></div><div class="filler column bigger"><div class="filler column" style="flex: 3"><div class="buttonStrip"><div class="button" data-building="Fisher" data-buildID="13">fisher</div></div><div class="buttonStrip"><div class="button" data-building="Mill" data-buildID="14">mill</div></div><div class="buttonStrip"><div class="button" data-building="Storage" data-buildID="15">storage</div></div></div><div class="filler" style="flex: 2"><div class="filler column"><div class="buttonStrip"></div><div class="buttonStrip"></div></div><div class="filler column"><div class="buttonStrip"></div><div class="buttonStrip"></div></div></div></div></div>')
  main.appendChild(main.childNodes[9]);
  console.log(main.childNodes);
  updateTabList();
  updateButtonList();
  updateHutList();
  updateFarmList();
  updateLogs("You find a carpenter, he says he can build things");
}
