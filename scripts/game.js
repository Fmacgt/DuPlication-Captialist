
const timerController = new TimerController();
const moneyController = new MoneyController();
const businessController = new BusinessController(timerController, moneyController);
