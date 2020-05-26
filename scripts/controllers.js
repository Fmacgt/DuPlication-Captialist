
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

                timer.completionHandler();
            }
        }
    }
}
