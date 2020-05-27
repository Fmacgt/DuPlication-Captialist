
const timerController = new TimerController();
const moneyController = new MoneyController();
const businessController = new BusinessController(timerController, moneyController);

/////////////////////////////////////////////////////////////////////////////////////

let prevTimestamp = 0;

function mainLoop(timestamp)
{
    let dt = prevTimestamp == 0 ? 0 : timestamp - prevTimestamp;
    prevTimestamp = timestamp;

    timerController.updateTimers(dt / 0.001);

    requestAnimationFrame(mainLoop);
}

/////////////////////////////////////////////////////////////////////////////////////

function initialize()
{
    console.log("initialize()");

    let localStorage = window.localStorage;
    localStorage.setItem('1', '111');

    mainLoop(0);
}

document.addEventListener("DOMContentLoaded", initialize);
