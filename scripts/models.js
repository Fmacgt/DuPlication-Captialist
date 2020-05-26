
// definitions for data types of the game

class BusinessDefinition
{
    constructor(name, price, revenue, processingTime) {
        this.name = name;
        this.price = price;
        this.revenue = revenue;
        this.processingTime = processingTime;
    }
}

class RuntimeBusiness
{
    constructor(definition, level) {
        this.level = level;

        this.name = definition.name;
        this.price = definition.price;
        this.revenue = definition.revenue;
        this.processingTime = definition.processingTime;

        this.timerId = -1;
    }
}

/////////////////////////////////////////////////////////////////////////////////////

class Timer
{
    constructor(id, duration, completionHandler) {
        this.id = id;
        this.time = 0;
        this.duration = duration;
        this.completionHandler = completionHandler;
    }
}
