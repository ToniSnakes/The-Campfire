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
var store = document.querySelectorAll('.stores');

var cooldown = [];
var hutIdx = 5;
var farmIdx = 20;
var maxLogs = 20;
var charPerLogLine = 24;
var hutNr = 0;
var farmNr = 0;

var buildReq = [0,1,1,1,1,1,3,2,1,2,3,1,2,2,3,2,4];
var buildCurr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var stores = [0,0,0,0,0,0,0,5000];
var production = [0,0,0,0,0,0,0,0];
var resReq = [[-1,0,0,0,0,0,0,0], //campfire
              [0,200,0,0,0,0,0,0], //crafter
              [0,300,0,0,0,0,50,0], //fletcher
              [0,400,0,0,0,0,0,0], //mechanic
              [0,10,0,0,0,0,0,0], //carpenter
              [0,10000,0,0,0,0,0,0], //inner wall
              [0,1000,500,0,0,0,0,0], //smokehouse
              [0,350,150,0,0,0,0,0], //hunter
              [0,100,0,0,0,0,0,0], //forager
              [0,500,200,0,0,0,0,0], //trapper
              [0,750,0,0,300,0,0,0], //leatherworker
              [-2,50,0,0,0,0,0,0], //hut
              [0,200,0,0,0,0,0,0], //farm
              [0,500,0,0,0,0,0,0], //fisher
              [0,2000,1000,0,0,0,0,0], //mill
              [0,3000,0,0,0,0,0,-15000], //storage
              [0,15000,0,3000,0,0,0,0], //keep
              ];
var resNames = ['people','wood','food','cured meat', 'fur', 'leather', 'bones', 'cap'];
var resNr = 7;
var foodMod = 0;
var upProd = [[0,0,0,0,0,0,0,0], //campfire
              [0,0,0,0,0,0,0,0], //crafter
              [0,0,0,0,0,0,0,0], //fletcher
              [0,0,0,0,0,0,0,0], //mechanic
              [0,0,0,0,0,0,0,0], //carpenter
              [0,0,0,0,0,0,0,0], //inner wall
              [0,0,0,5,0,0,0,0], //smokehouse
              [0,0,20,0,5,0,2,0], //hunter
              [0,0,2,0,0,0,0,0], //forager
              [0,0,10,0,2,0,1,0], //trapper
              [0,0,0,0,-2,1,0,0], //leatherworker
              [0,0,0,0,0,0,0,0], //hut
              [0,0,5,0,0,0,0,0], //farm
              [0,0,0,0,0,0,0,0], //fisher
              [0,0,0,0,0,0,0,0], //mill
              [0,0,0,0,0,0,0,0], //storage
              [0,0,0,0,0,0,0,0], //keep
              ];

function getIndex (e, list) {
  for (i = 0; i < list.length; ++i) {
    if (list[i] == e) {
      return i;
    }
  }
  return -1;
}

function activateButton (e) {
  var bid = this.getAttribute('data-buildID');
  if (this.getAttribute('data-building') && !this.classList.contains('built') && checkReq(bid)) {
    for (var i = 0; i <= resNr; ++i) {
      stores[i] -= resReq[bid][i];
      production[i] += upProd[bid][i];
    }
    if (this.getAttribute('data-building') != 'Campfire') {
      updateStores();
    }
    this.classList.add('built');
    var functionName = "build" + this.getAttribute('data-building') + "()";
    var buildFunction = new Function(functionName);
    buildFunction();
  }
}

function run () {
  production[1] = stores[0];
  stores[2] += Math.floor(production[2] * foodMod);
  for (var i = 0; i < resNr; ++i) {
    updateProduction(i);
    if (stores[i] > stores[7]) {
      stores[i] = stores[7];
    }
  }
  updateStores();
  setTimeout(run, 1000);
}

function updateProduction (idx) {
  stores[idx] += production[idx];
}

function updateStores () {
  clearParent(store[0]);
  resDisplay(stores, store[0]);
}

function switchScreen (e) {
  tabs.forEach(tab => {
    tab.classList.remove('active');
    tab.classList.remove('hover');
  });
  this.classList.add('hover');
  this.classList.add('active');
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
  if (!farmNr) {
    ++buildCurr[14];
    checkMill();
  }
  ++farmNr;
  resReq[12][1] += 200;
  if (farmIdx == 29) {
  farmIdx = 32;
  }
  if (farmIdx < 36) {
    strips[++farmIdx].insertAdjacentHTML('beforeend', '<div class="button farm" data-building="Farm" data-buildID="12">farm</div>');
    updateButtonList();
    updateFarmList();
  }
}

function buildHut () {
  ++hutNr;
  resReq[11][1] += 50;
  if (hutIdx == 9) {
    hutIdx = 14;
  }
  if (hutIdx < 19) {
    strips[++hutIdx].insertAdjacentHTML('beforeend', '<div class="button hut" data-building="Hut" data-buildID="11">hut</div>');
    updateButtonList();
    updateHutList();
  }
}

function updateButtonList () {
  buttons = document.querySelectorAll('.button');
  buttons.forEach(button => button.addEventListener('mouseenter', () => {
    button.classList.add('hover');
    if (!button.classList.contains('built')) {
      clearParent(store[1]);
      resDisplay(resReq[button.getAttribute('data-buildID')], store[1]);
    }
  }));
  buttons.forEach(button => button.addEventListener('mouseleave', () => {
    button.classList.remove('hover');
    clearParent(store[1]);
  }));
  buttons.forEach(button => button.addEventListener('click', activateButton));
  strips = document.querySelectorAll('.buttonStrip');
}

function updateHutList () {
  huts = document.querySelectorAll('.hut');
}

function updateFarmList () {
  farms = document.querySelectorAll('.farm');
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
    if (!tab.classList.contains('active')) {
      tab.classList.remove('hover');
    }
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
  if (!tab.classList.contains('active')) {
    tab.classList.remove('hover');
  }
}));
tabs.forEach(tab => tab.addEventListener('click', switchScreen));

function buildCampfire () {
  tab.insertAdjacentHTML('afterbegin', '<div class="tab active hover" data-tab="1">A Campfire</div>');
  updateTabList();
  columns[0].insertAdjacentHTML('afterbegin', '<div class="filler"></div><div class="logs"></div>');
  log = document.querySelector('.logs');
  updateLogs("You get a fire started");
  setTimeout(function() {updateLogs("You figure it should be able to keep you warm");}, 1000);
  columns[1].insertAdjacentHTML('afterbegin', '<div class="filler bigger"></div><div class="stores"></div><div class="stores"></div><div class="filler bigger"></div>');
  quantities = document.querySelectorAll('.quantity');
  store = document.querySelectorAll('.stores');
  setTimeout(function() {updateLogs("You start gathering wood");}, 3000);
  separators[8].insertAdjacentHTML('afterbegin', '<div class="button" data-building="Carpenter" data-buildID="4">carpenter</div>');
  ++buildCurr[4];
  updateButtonList();
  run();
}

function buildCarpenter () {
  separators[4].insertAdjacentHTML('afterbegin', '<div class="button" data-building="Crafter" data-buildID="1">crafter</div>');
  separators[6].insertAdjacentHTML('afterbegin', '<div class="button" data-building="Mechanic" data-buildID="3">mechanic</div>');
  separators[10].insertAdjacentHTML('afterbegin', '<div class="button" data-building="Fletcher" data-buildID="2">fletcher</div>');
  buildCurr = buildCurr.map(i => i + 1);
  --buildCurr[0];
  --buildCurr[4];
  --buildCurr[5];
  tab.insertAdjacentHTML('beforeend', '<div class="tab" data-tab="2">A Forest</div>');
  main.insertAdjacentHTML('beforeend', '<div class="forest screen hidden" data-screen="2"><div class="filler column"><div class="buttonStrip"><div class="button hut" data-building="Hut" data-buildID="11">hut</div></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div></div><div class="filler bigger column"><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"><div class="button" data-building="Forager" data-buildID="8">forager</div></div><div class="buttonStrip"></div><div class="buttonStrip"></div></div><div class="filler column"><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div></div></div>');
  main.appendChild(main.childNodes[9]);
  updateTabList();
  updateButtonList();
  updateHutList();
  updateLogs("You find a carpenter, he says he can build things");
}

function buildCrafter () {
  ++buildCurr[12];
  ++buildCurr[13];
  ++buildCurr[6];
  ++buildCurr[16];
  ++buildCurr[10];
  checkKeep();
  tab.insertAdjacentHTML('beforeend', '<div class="tab" data-tab="3">Empty Land</div>');
  main.insertAdjacentHTML('beforeend', '<div class="land screen hidden" data-screen="3"><div class="filler column"><div class="buttonStrip"><div class="button farm" data-building="Farm" data-buildID="12">farm</div></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div></div><div class="filler column"><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div></div><div class="filler column bigger"><div class="filler column" style="flex: 3"><div class="buttonStrip"><div class="button" data-building="Fisher" data-buildID="13">fisher</div></div><div class="buttonStrip"></div><div class="buttonStrip"></div></div><div class="filler" style="flex: 2"><div class="filler column"><div class="buttonStrip"></div><div class="buttonStrip"></div></div><div class="filler column"><div class="buttonStrip"></div><div class="buttonStrip"></div></div></div></div></div>');
  main.appendChild(main.childNodes[11]);
  updateLogs("You find someone who says he can craft various tools");
  updateTabList();
  updateButtonList();
  updateFarmList();
  checkLeatherworker();
}

function buildFletcher () {
  ++buildCurr[7];
  ++buildCurr[16];
  checkKeep();
  strips[11].insertAdjacentHTML('beforeend','<div class="button" data-building="Hunter" data-buildID="7">hunter</div>');
  updateLogs("You can now make arrows, but you still need someone who knows how to use them");
  updateButtonList();
}

function buildMechanic () {
  ++buildCurr[9];
  ++buildCurr[14];
  ++buildCurr[16];
  strips[13].insertAdjacentHTML('beforeend', '<div class="button" data-building="Trapper" data-buildID="9">trapper</div>');
  checkMill();
  updateLogs("This crazy-looking woman says she has ideas for how to build more complex things");
  updateButtonList();
  checkKeep();
}

function buildKeep () {
  ++buildCurr[5];
  separators[13].insertAdjacentHTML('beforeend','<div class="button" data-building="InnerWall" data-buildID="5">inner wall</div>');
  updateLogs("This large wooden structure is both impressive and relatively defensible in case of an attack...");
  updateButtonList();
}

function buildInnerWall () {
  var inner = document.querySelector('.inner');
  inner.style.border = "dashed white 0.2vw";
  updateLogs("This extra fortification offers an extra layer of protection against larger threats");
}

function buildForager () {
  updateLogs("You now have someone to gather food from the forest, such as it is");
}

function buildTrapper () {
  ++buildCurr[10];
  checkLeatherworker();
  updateLogs("The crazy mechanic figured out a contraption able to catch animals");
}

function buildHunter () {
  ++buildCurr[6];
  ++buildCurr[10];
  checkLeatherworker();
  strips[10].insertAdjacentHTML('beforeend', '<div class="button" data-building="Smokehouse" data-buildID="6">smokehouse</div>');
  updateLogs("Not surprisingly, larger animals give more meat, but are harder to catch. Good thing you have arrows");
  updateButtonList();
}

function buildSmokehouse () {
  foodMod += 0.3;
  updateLogs("The ability to preserve meat esentially means it can be better distributed, meaning more food");
}

function buildLeatherworker () {
  updateLogs("Dead animals can now be harvested for even more resources");
}

function buildFisher () {
  foodMod += 0.2;
  updateLogs("More ways of providing food for your people are always welcome");
}

function buildMill () {
  foodMod += 0.5;
  ++buildCurr[15];
  strips[32].insertAdjacentHTML('beforeend','<div class="button" data-building="Storage" data-buildID="15">storage</div>');
  updateLogs("The crazy mechanic came up with an even more ambitious project, allowing you to process food from farms");
  updateButtonList();
}

function buildStorage () {
  updateLogs("With dedicated storage space, you can now have more resources at once");
}

function checkKeep () {
  if (buildCurr[16] == buildReq[16]) {
    while (separators[7].hasChildNodes()) {
      separators[7].removeChild(separators[7].lastChild);
    }
    separators[7].insertAdjacentHTML('beforeend', '<div class="button" data-building="Keep" data-buildID="16">keep</div>');
    setTimeout(function() {updateLogs("With all these people now following you, better accomodations are in order");}, 500);
    updateButtonList();
  }
}

function checkLeatherworker () {
  if (buildCurr[10] > buildReq[10]) {
    buildCurr[10] = buildReq[10];
  }
  else
  if (buildCurr[10] == buildReq[10]) {
    strips[14].insertAdjacentHTML('beforeend', '<div class="button" data-building="Leatherworker" data-buildID="10">leatherworker</div>');
    updateButtonList();
  }
}

function checkMill () {
  if (buildCurr[14] == buildReq[14]) {
    strips[31].insertAdjacentHTML('beforeend', '<div class="button" data-building="Mill" data-buildID="14">mill</div>');
    updateButtonList();
  }
}

function resDisplay (set, location) {
  for (var i = resNr; i >= 0; --i) {
    if (set[i] > 0) {
      var toInsert = '<div class="supply"><div class="type">' + resNames[i] + ':</div><div class="quantity" data-resource="' + resNames[i] + '">' + set[i] + '</div></div>';
      location.insertAdjacentHTML('afterbegin', toInsert);
    }
  }
}

function clearParent (parent) {
  while (parent.hasChildNodes()) {
    parent.removeChild(parent.lastChild);
  }
}

function checkReq (idx) {
  if (buildCurr[idx] != buildReq[idx]) {
    return false;
  }
  for (var i = 0; i < resNr; ++i) {
    if (stores[i] < resReq[idx][i]) {
      return false;
    }
  }
  return true;
}
/*
BuildID building buildReq

Screen 1
0 campfire 0
1 crafter 2
2 fletcher 2
3 mechanic 2
4 carpenter 1
16 keep 4
5 inner wall 1

Screen 2
6 smokehouse 3
7 hunter 2
8 forager 2
9 trapper 2
10 leatherworker 3
11 hut 1

Screen 3
12 farm 2
13 fisher 2
14 mill 3
15 storage 2
*/


//cheats
function weAreFull () {
  for (var i = 0; i < resNr; ++i) {
    stores[i] = stores[7];
  }
}
