﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AchievementSystem = (function () {
    function AchievementSystem() {
        this.lowestUnregisteredId = 0;
        this.Name = "Achievement";
        this.Reset();
    }
    AchievementSystem.prototype.Reset = function () {
        this.lowestUnregisteredId = 0;
        this.items = new Array();
    };

    AchievementSystem.prototype.LookupAchievement = function (id) {
        return this.items[id];
    };

    AchievementSystem.prototype.RegisterItem = function (ach) {
        ach.SetID(this.lowestUnregisteredId);
        this.items[this.lowestUnregisteredId] = ach;
        this.lowestUnregisteredId++;
    };

    AchievementSystem.prototype.Check = function () {
        for (var i = 0; i < this.items.length; ++i) {
            var ach = this.items[i];

            if (ach.Condition.condition()) {
                ach.Completed = true;
            }
        }
    };
    return AchievementSystem;
})();

var Achievement = (function () {
    function Achievement() {
        this.Completed = false;
    }
    Achievement.prototype.SetID = function (id) {
        this.ID = id;
    };
    Achievement.prototype.SetName = function (n) {
        this.Name = n;
        return this;
    };
    Achievement.prototype.SetCondition = function (c) {
        this.Condition = c;
        return this;
    };
    Achievement.prototype.SetRequires = function (r) {
        this.Requires = r;
        return this;
    };
    Achievement.prototype.SetCompleted = function (com) {
        this.Completed = com;
        return this;
    };
    Achievement.prototype.GetTooltip = function () {
        return this.Condition.tooltip();
    };
    return Achievement;
})();

var AchievementListener = (function () {
    function AchievementListener() {
    }
    AchievementListener.prototype.tooltip = function () {
        return "";
    };

    AchievementListener.prototype.condition = function () {
    };
    return AchievementListener;
})();

var AchievementAlltime = (function (_super) {
    __extends(AchievementAlltime, _super);
    function AchievementAlltime(v, r) {
        this.Variables = v;
        this.Requirement = r;
        _super.call(this);
    }
    AchievementAlltime.prototype.tooltip = function () {
        var names = new Array();
        for (var i = 0; i < this.Variables.length; ++i) {
            names.push(this.Variables[i].Name);
        }
        return "Have an all time total of " + formatNumber(this.Requirement) + " " + names.join(", ");
    };

    AchievementAlltime.prototype.condition = function () {
        var total = 0;

        for (var i = 0; i < this.Variables.length; ++i) {
            total += this.Variables[i].Alltime;
        }

        if (total >= this.Requirement) {
            return true;
        }
        return false;
    };
    return AchievementAlltime;
})(AchievementListener);

var AchievementItemType = (function (_super) {
    __extends(AchievementItemType, _super);
    function AchievementItemType(it) {
        this.ItemType = it;
        _super.call(this);
    }
    AchievementItemType.prototype.tooltip = function () {
        return "Discover every type of " + ItemType[this.ItemType];
    };

    AchievementItemType.prototype.condition = function () {
        for (var x = 0; x < game.itemSystem.items.length; ++x) {
            var item = game.itemSystem.items[x];

            if (item.Type === this.ItemType) {
                if (item.Alltime <= 0) {
                    return false;
                }
            }
        }
        return true;
    };
    return AchievementItemType;
})(AchievementListener);

var AchievementStatistic = (function (_super) {
    __extends(AchievementStatistic, _super);
    function AchievementStatistic(v, r) {
        this.Variable = v;
        this.Requirement = r;
        _super.call(this);
    }
    AchievementStatistic.prototype.tooltip = function () {
        return formatNumber(this.Requirement) + " " + this.Variable.Name;
    };

    AchievementStatistic.prototype.condition = function () {
        if (this.Variable.Value >= this.Requirement) {
            return true;
        }
        return false;
    };
    return AchievementStatistic;
})(AchievementListener);

// You need to think this through carefully.
var AchMoney1 = new Achievement();
var AchMoney2 = new Achievement();
var AchMoney3 = new Achievement();

var AchMiner1 = new Achievement();
var AchMiner2 = new Achievement();
var AchMiner3 = new Achievement();

var AchItemCatOre = new Achievement();
var AchItemCatGem = new Achievement();
var AchItemCatCrafting = new Achievement();
var AchItemCatIngredient = new Achievement();
var AchItemCatPotion = new Achievement();
//# sourceMappingURL=AchievementSystem.js.map
