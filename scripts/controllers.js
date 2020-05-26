
// Controllers of the game

class BusinessController
{
    _businessList = [];

    _timerController = null;
    _moneyController = null;

    /////////////////////////////////////////////////////////////////////////////////////

    constructor(timerController, moneyController) {
        for (let business of BusinessDefinitions) {
            this._businessList.push(new RuntimeBusiness(business, 0));
        }

        this._timerController = timerController;
        this._moneyController = moneyController;
    }

    //==============================================================================

    buyBusiness(index) {
        let business = this._businessList[index];
        business.level++;
        this._recalculateBusinessStats(business);

        // TODO: update UI as well
    }

    _recalculateBusinessStats(business) {
        let definition = business.definition;
        if (business.level > 1) {
            business.price = definition.price * business.level;
            business.revenue = definition.revenue * business.level;
        } else {
            business.price = definition.price;
            business.revenue = definition.revenue;
        }
    }

    //==============================================================================

    startProcessing(index) {
        let business = this._businessList[index];
        if (business.timerId == -1) {
            business.timerId = this._timerController.startTimer(business.processingTime, 
                    (timerId) => { this._timerCompletionHandler(timerId); });

            // TODO: update UI
        }
    }

    _timerCompletionHandler(timerId) {
        for (let business of this._businessList) {
            if (business.timerId == timerId) {
                business.timerId = -1;

                this._moneyController.grant(business.revenue);

                // TODO: update UI

                break;
            }
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////

class TimerController
{
    _timerId = 0;
    _timerList = [];

    /////////////////////////////////////////////////////////////////////////////////////

    // start a new timer
    startTimer(duration, completionHandler) {
        let id = this._timerId;
        this._timerId++;

        this._timerList.push(new Timer(id, duration, completionHandler));

        return id;
    }

    // update all timers' time values by delta time
    // triggers corresponding handlers if any timer expires
    updateTimers(dt) {
        // update all timers' time values
        for (let timer of this._timerList) {
            timer.time += dt;
        }

        let ptr = 0;
        while (ptr < this._timerList.length) {
            let timer = this._timerList[ptr];
            if (timer.time < timer.duration) {
                ptr++;
            } else {
                // the timer list should be quite small, so it should be okay to 
                // use splice() to remove an element
                this._timerList.splice(ptr, 1);

                timer.completionHandler(timer.id);
            }
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////

class MoneyController
{
    _amount = 0;

    /////////////////////////////////////////////////////////////////////////////////////

    get amount() {
        return this._amount;
    }

    canAfford(cost) {
        return this._amount >= cost;
    }

    grant(amount) {
        this._amount += amount;

        // TODO: update UI
    }

    consume(amount) {
        if (amount <= this._amount) {
            this._amount -= amount;

            // TODO: update UI

            return true;
        }

        return false;
    }
}
