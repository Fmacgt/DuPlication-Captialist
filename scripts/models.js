
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

const BusinessDefinitions = [
    new BusinessDefinition("Lemon Cart", 4, 1, 1),
    new BusinessDefinition("Newspaper Stand", 400, 100, 2),
    new BusinessDefinition("Carwash Store", 20000, 5000, 6),
    new BusinessDefinition("Pizza Delivery", 120000, 30000, 15),
    new BusinessDefinition("Donut Shop", 440000, 110000, 30),
    new BusinessDefinition("Shrimp Boat", 20000000, 5000000, 60),
];

/////////////////////////////////////////////////////////////////////////////////////

class RuntimeBusiness
{
    constructor(definition, level) {
        this.definition = definition;
        this.level = level;

        this.name = definition.name;
        this.price = definition.price;
        this.revenue = definition.revenue;
        this.processingTime = definition.processingTime;

        this.timerId = -1;
    }
}

/////////////////////////////////////////////////////////////////////////////////////

class ManagerDefinition
{
    constructor(name, price, targetBusinessDef) {
        this.name = name;
        this.price = price;
        this.targetBusinessDef = targetBusinessDef;
    }
}

const ManagerDefinitions = [
    new ManagerDefinition("Manager 01", 100, BusinessDefinitions[0]),
    new ManagerDefinition("Manager 02", 10000, BusinessDefinitions[1]),
    new ManagerDefinition("Manager 03", 500000, BusinessDefinitions[2]),
    new ManagerDefinition("Manager 04", 3000000, BusinessDefinitions[3]),
    new ManagerDefinition("Manager 05", 11000000, BusinessDefinitions[4]),
    new ManagerDefinition("Manager 06", 500000000, BusinessDefinitions[5]),
];

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
