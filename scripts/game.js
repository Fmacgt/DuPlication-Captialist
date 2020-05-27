
const timerController = new TimerController();
const moneyController = new MoneyController();
const businessController = new BusinessController(timerController, moneyController);

/////////////////////////////////////////////////////////////////////////////////////

let prevTimestamp = 0;

function mainLoop(timestamp)
{
    let dt = prevTimestamp == 0 ? 0 : timestamp - prevTimestamp;
    prevTimestamp = timestamp;

    timerController.updateTimers(dt * 0.001);

    requestAnimationFrame(mainLoop);
}

function saveToLocal()
{
    let localStorage = window.localStorage;
    localStorage.setItem("DuPlicationCapitalistSaveVersion", "1");

    moneyController.writeLocal(localStorage);
    businessController.writeLocal(localStorage);
}

/////////////////////////////////////////////////////////////////////////////////////

function initialize()
{
    let localStorage = window.localStorage;
    let hasSave = localStorage.getItem("DuPlicationCapitalistSaveVersion") === "1";
    if (hasSave) {
        moneyController.readLocal(localStorage);
        businessController.readLocal(localStorage);
    } else {
        saveToLocal();
    }

    window.addEventListener("load", () => { launch(); });
    window.addEventListener("beforeunload", () => { closing(); });
}

document.addEventListener("DOMContentLoaded", initialize);

/////////////////////////////////////////////////////////////////////////////////////

function launch()
{
    mainLoop(0);
}

function closing()
{
    console.log("dsfds");
    console.log(timerController);
    saveToLocal();
    return true;
}
