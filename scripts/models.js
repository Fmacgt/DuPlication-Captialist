
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
        this.hasManager = false;
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

/////////////////////////////////////////////////////////////////////////////////////

class Rect {
    constructor(x, y, width, height, fillColor = "#0095DD") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fillColor = fillColor;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.fillColor;
        ctx.fill();
        ctx.closePath();
    }

    containsPoint(x, y) {
        return x >= this.x && x <= this.x + this.width &&
            y >= this.y && y <= this.y + this.height;
    }
}

/////////////////////////////////////////////////////////////////////////////////////

const BusinessUIItemWidth = 300;
const BusinessUIItemHeight = 80;

const RevenueRectOffsetX = 80;
const RevenueRectWidth = 200;
const RevenueRectHeight = 40;

const UpgradeRectOffsetX = 80;
const UpgradeRectOffsetY = 40;
const UpgradeRectWidth = 140;
const UpgradeRectHeight = 40;

const TimerRectOffsetX = 220;
const TimerRectOffsetY = 40;
const TimerRectWidth = 80;
const TimerRectHeight= 40;

class BusinessUIItem
{
    constructor(x, y, business, startProcess, tryUpgrade) {
        this.business = business;
        this.startProcess = startProcess;
        this.tryUpgrade = tryUpgrade;

        this.x = x;
        this.y = y;

        this.frame = new Rect(x, y, BusinessUIItemWidth, BusinessUIItemHeight);
        this.revenueRect = new Rect(x + RevenueRectOffsetX, y, 
                RevenueRectWidth, RevenueRectHeight);
        this.upgradeRect = new Rect(x + UpgradeRectOffsetX, y + UpgradeRectOffsetY, 
                UpgradeRectWidth, UpgradeRectHeight, "#dd9500");
        this.timerRect = new Rect(x + TimerRectOffsetX, y + TimerRectOffsetY,
                TimerRectWidth, TimerRectHeight, "#00dd95");
    }

    render(ctx, timerController) {
        // draw frames
        this.frame.render(ctx);
        this.revenueRect.render(ctx);
        this.upgradeRect.render(ctx);
        this.timerRect.render(ctx);

        // draw texts & images

        // Revenue
        ctx.font = "16px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(this.business.revenue.toString(), 
                this.revenueRect.x + RevenueRectWidth / 2, this.revenueRect.y + 24);

        // Processing time
        let remainingTime = timerController.getRemainingTime(this.business.timerId);
        let timerString = remainingTime != -1 ? remainingTime.toString() : "00:00:00";
        ctx.fillText(timerString, 
                this.timerRect.x + TimerRectWidth / 2, this.timerRect.y + 24);

        // Upgrade button & Cost
        ctx.fillText(this.business.price.toString(),
                this.upgradeRect.x + UpgradeRectWidth / 2, this.upgradeRect.y + 24);
    }

    checkClicking(x, y) {
        let inside = this.frame.containsPoint(x, y);
        if (inside) {
            if (this.upgradeRect.containsPoint(x, y)) {
                if (this.tryUpgrade) {
                    this.tryUpgrade();
                }
            } else {
                if (this.startProcess) {
                    this.startProcess();
                }
            }
        }
    }
}
