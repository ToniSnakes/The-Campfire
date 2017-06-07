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
var hutNr = 0;
var farmNr = 0;

var buildReq = [0,1,1,1,1,1,3,2,1,2,3,1,2,2,3,2,4];
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
  if (!farmNr) {
    console.log("W");
    ++buildCurr[14];
    checkMill();
  }
  ++farmNr;
  if (stores[0] >= 40) {
    stores[0] -= 40;
    stores[1] += 5;
    quantities.forEach(qtt => updateQuantity(qtt));
    console.log("built farm");
    if (farmIdx == 29) {
      farmIdx = 32;
    }
    if (farmIdx < 36) {
      strips[++farmIdx].insertAdjacentHTML('beforeend', '<div class="button farm" data-building="Farm" data-buildID="12">farm</div>');
      updateButtonList();
      updateFarmList();
    }
  }
  //console.log(this);
}

function buildHut () {
  ++hutNr;
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
  --buildCurr[0];
  --buildCurr[4];
  --buildCurr[5];
  tab.insertAdjacentHTML('beforeend', '<div class="tab" data-tab="2">A Forest</div>');
  main.insertAdjacentHTML('beforeend', '<div class="forest screen hidden" data-screen="2"><div class="filler column"><div class="buttonStrip"><div class="button hut" data-building="Hut" data-buildID="11">hut</div></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div></div><div class="filler bigger column"><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"><div class="button" data-building="Forager" data-buildID="8">forager</div></div><div class="buttonStrip"></div><div class="buttonStrip"></div></div><div class="filler column"><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div><div class="buttonStrip"></div></div></div>');
  main.appendChild(main.childNodes[9]);
  console.log(main.childNodes);
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
  separators[13].insertAdjacentHTML('beforeend','<div class="button" data-building="InnerWall" buildID="5">inner wall</div>');
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
  updateLogs("The ability to preserve meat esentially means it can be better distributed, meaning more food");
}

function buildLeatherworker () {
  updateLogs("Dead animals can now be harvested for even more resources");
}

function buildFisher () {
  updateLogs("More ways of providing food for your people are always welcome");
}

function buildMill () {
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
