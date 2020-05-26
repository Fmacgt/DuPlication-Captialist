
// Controllers of the game

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

//const timerController = new TimerController;

/////////////////////////////////////////////////////////////////////////////////////

// controller for runtime business
// 1. buy/upgrade a business
// 2. re-calculate a business' stats after leveling up
// 3. start a timer for a business, and register callback for completion
class BusinessController
{
    _businessList = [];

    /////////////////////////////////////////////////////////////////////////////////////

    constructor() {
        for (let business of BusinessDefinitions) {
            this._businessList.push(new RuntimeBusiness(business, 0));
        }
    }

    buyBusiness(business) {
        business.level++;
        updateBusinessStats(business);

        // TODO: update UI as well

        break;
    }

    updateBusinessStats(business) {
        let definition = business.definition;
        business.price = definition.price * (business.level * 2 + 1);
        business.revenue = definition.revenue * (business.level + 1);
    }

    startProcessing(business) {
        if (business.timerId == -1) {
            business.timerId = timerController.startTimer(business.processingTime, 
                    (timerId) => { this.timerCompletionHandler(timerId); });

            // TODO: update UI
        }
    }

    timerCompletionHandler(timerId) {
        console.log(this);
        for (let business of this._businessList) {
            if (business.timerId == timerId) {
                business.timerId = -1;

                // TODO: grant revenue
                console.log(business.revenue);

                // TODO: update UI

                break;
            }
        }
    }
}
