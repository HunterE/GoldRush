var StatisticSystem = (function () {
    function StatisticSystem() {
        this.lowestUnregisteredId = 0;
        this.Name = "Statistic";
        this.Reset();
    }
    StatisticSystem.prototype.LookupStatistic = function (id) {
        return this.items[id];
    };

    StatisticSystem.prototype.RegisterItem = function (statistic) {
        statistic.SetID(this.lowestUnregisteredId);
        this.items[this.lowestUnregisteredId] = statistic;
        this.lowestUnregisteredId++;
    };

    StatisticSystem.prototype.Reset = function () {
        this.lowestUnregisteredId = 0;
        this.items = new Array();
    };
    return StatisticSystem;
})();

var Statistic = (function () {
    function Statistic() {
        this.Value = 0;
    }
    Statistic.prototype.SetValue = function (v) {
        this.Value = v;
        return this;
    };

    Statistic.prototype.SetID = function (i) {
        this.ID = i;
        return this;
    };

    Statistic.prototype.SetName = function (n) {
        this.Name = n;
        return this;
    };
    return Statistic;
})();

var StatVersionNumber = new Statistic();
var StatRockClicked = new Statistic();
var StatTimePlayed = new Statistic();
//# sourceMappingURL=StatisticSystem.js.map
