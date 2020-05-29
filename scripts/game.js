
const timerController = new TimerController();
const moneyController = new MoneyController();
const managerController = new ManagerController(moneyController, ManagerDefinitions);
const businessController = new BusinessController(
        timerController, moneyController, BusinessDefinitions);

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
    managerController.writeLocal(localStorage);
    businessController.writeLocal(localStorage);

    localStorage.setItem("DuPlicationCapitalistTimestamp", (new Date()).getTime().toString());
}

/////////////////////////////////////////////////////////////////////////////////////

function initialize()
{
    let localStorage = window.localStorage;
    let hasSave = localStorage.getItem("DuPlicationCapitalistSaveVersion") === "1";
    if (hasSave) {
        moneyController.readLocal(localStorage);
        managerController.readLocal(localStorage);
        businessController.readLocal(localStorage);

        let timeString = localStorage.getItem("DuPlicationCapitalistTimestamp");
        if (timeString) {
            lastTimestamp = parseInt(timeString);
            let timeDiff = ((new Date()).getTime() - lastTimestamp) / 1000;

            processOfflineChanges(timeDiff);
        }
    } else {
        saveToLocal();
    }

    window.addEventListener("load", () => { launch(); });
    window.addEventListener("beforeunload", () => { closing(); });
}

function processOfflineChanges(timeDiff)
{
    timerController.updateTimers(timeDiff);
}

document.addEventListener("DOMContentLoaded", initialize);

/////////////////////////////////////////////////////////////////////////////////////

function launch()
{
    mainLoop(0);
}

function closing()
{
    saveToLocal();
    return true;
}

/////////////////////////////////////////////////////////////////////////////////////

function resetAll()
{
    let localStorage = window.localStorage;
    localStorage.clear();

    timerController.resetAll();
    moneyController.resetAll();
    managerController.resetAll();
    businessController.resetAll();
}
