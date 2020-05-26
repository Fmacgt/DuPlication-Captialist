
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

mainLoop(0);
