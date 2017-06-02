/************************************ Text Update here ********************************************/
function buttonUpdate(){
  var but = document.getElementById('Cycle');
  if(pause) but.innerText = "Play";
  else but.innerText = "Pause";
};

function fuelBarUpdate(){
        if(isNaN(curFuel)) curFuel = maxFuel;
        var percent = curFuel / maxFuel * 100;
        document.getElementById("FuelText").innerHTML = "Fuel: " + curFuel.toFixed(1) + " / " + maxFuel.toFixed(1)+ " tons " + percent.toFixed(0) + "%";
        document.getElementById("FuelText").style.width = (document.body.clientWidth * 0.3 - 25) + "px";
        document.getElementById("FuelBar").style.width = percent.toFixed(0) + "%";
};

function textUpdate(){
    document.getElementById("SpeedText").innerHTML = "Speed: " + curV.toFixed(1) + " m/s";
    document.getElementById("AccelerateText").innerHTML = "Accelerate: " + curA.toFixed(1) + " m/s<sup>2<sup>";
    document.getElementById("GText").innerHTML = "g: " + g.toFixed(3) + " m/s<sup>2<sup>";
    document.getElementById("HeightText").innerHTML = "Height: " + curH.toFixed(1) + " m";
    fuelBarUpdate();
};

/**************************************** Animation ***********************************************/
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    if(tabName == "tabVel") curChart = window.velocity;
    if(tabName == "tabA") curChart = window.accelerate;
    if(tabName == "tabH") curChart = window.height;
    if(tabName == "tabFuel") curChart = window.fuel;
};

function animationUpdate(){
  // TODO
  var canvas = document.getElementById('animation');
  var ctx = document.getElementById('animation').getContext('2d');

  // background
  dynamicContext.drawImage(bg1, bg1.coorX, bg1.coorY);
  dynamicContext.drawImage(bg2, bg2.coorX, bg2.coorY);

  // rocket
  if(!pause && curFuel > 0) dynamicContext.drawImage(rocketOn, (dynamicCanvas.width - rocketOn.width) / 2, 0.95 * dynamicCanvas.height - rocketOn.height);
  else dynamicContext.drawImage(rocketOff, (dynamicCanvas.width - rocketOff.width) / 2, 0.95 * dynamicCanvas.height - rocketOff.height - (rocketOn.height - rocketOff.height));

  ctx = ctx.drawImage(dynamicCanvas, 0, 0, canvas.width, canvas.height);

  // scroll
  if(pause) return;
  bg1.coorY += Math.min(curV / 100 + 1, dynamicCanvas.width - 100);
  bg2.coorY += Math.min(curV / 100 + 1, dynamicCanvas.width - 100);
  if(bg1.coorY > dynamicCanvas.height)
    bg1.coorY = bg2.coorY - bg1.height;

  if(bg2.coorY > dynamicCanvas.height)
    bg2.coorY = bg1.coorY - bg2.height;
};

/******************************* Arguments update *********************************************/
function UpdateArg(){
    var dm = Math.min(curFuel, I * delay); 
    var all = curFuel + m0;
    var newFuel = Math.max(curFuel - I * delay, 0);
    var dv = u * Math.log( all / (m0 + newFuel));

    curT += delay;
    if(MassChanged) 
    {
      curAWithoutG = u * I / (curFuel + m0);
      MassChanged = false;
    }
    else curAWithoutG += u * I * dm / (all *(m0 + newFuel));
    curA = curAWithoutG - g;

    if(dv != 0) curV += dv - g * delay;
    else curV += curA * delay;

    curH += curV*delay + curA*delay*delay / 2;
    curFuel = newFuel;

    g = G * M / Math.pow(R + curH, 2);
};

function ResetArg(){
    // default data
    document.getElementById("CurrentButton").click();
    document.getElementById("ChangeButton").click();

    curV = 0;
    curFuel = maxFuel;
    curH = 0;
    curA = 0;
    curAWithoutG = 0;
    curT = 0;
    pause = true;
    MassChanged = true;
    g = G * M / Math.pow(R, 2);

    textUpdate();
};

/******************************* Button onclick functions *************************************/
function PlayClick(){
  pause = !pause;
  buttonUpdate();
};

function ResetClick(){
  ResetArg();
  Reset(window.velocity);
  Reset(window.accelerate);
  Reset(window.height);
  Reset(window.fuel);

  buttonUpdate();
};

function PointVisClick(){
    PointVisUpdate(curChart);
};

function ResetZoomClick(){
    curChart.resetZoom();
};

function AddFuelClick(){
    var textFuel = document.getElementById('AddFuelText').value;
    var add = parseFloat(textFuel);
    if(!isNaN(add)) curFuel = Math.max(Math.min(curFuel + add, maxFuel), 0);

    fuelBarUpdate();
};

function CurrentClick(){
    document.getElementById('MassInput').value = m0;
    document.getElementById('GasSpeedInput').value = u;
    document.getElementById('MaxFuelInput').value = maxFuel;
    document.getElementById('IInput').value = I;
};

function ChangeClick(){
    var newM = parseFloat(document.getElementById('MassInput').value);
    if(newM != m0) MassChanged = true;
    m0 = newM;

    u = parseFloat(document.getElementById('GasSpeedInput').value);
    maxFuel = parseFloat(document.getElementById('MaxFuelInput').value);
    curFuel = Math.min(curFuel, maxFuel);
    I = parseFloat(document.getElementById('IInput').value);

    fuelBarUpdate();
};