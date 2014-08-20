/// <reference path="Data.ts" />
/// <reference path="Scripts/UI/UIHelper.ts"/>
///<reference path="BuffSystem.ts"/>
/// <reference path="ItemSystem.ts"/>
/// <reference path="Scripts/UI/InventoryUI.ts"/>
/// <reference path="WorkerSystem.ts"/>
/// <reference path="UpgradeSystem.ts"/>
/// <reference path="Inventory.ts"/>
/// <reference path="Scripts/UI/StoreUI.ts"/>
///<reference path="Scripts/UI/ProcessorUI.ts"/>
///<reference path="ProcessorSystem.ts"/>
///<reference path="Scripts/UI/CraftingUI.ts"/>
///<reference path="Scripts/UI/EquipmentUI.ts"/>
///<reference path="StatisticSystem.ts"/>
///<reference path="AchievementSystem.ts"/>
///<reference path="Scripts/UI/HeaderUI.ts"/>
///<reference path="Scripts/UI/AchievementUI.ts"/>
///<reference path="PrestigeSystem.ts"/>
///<reference path="Scripts/UI/PrestigeUI.ts"/>
var game;
var data;

var Game = (function () {
    function Game() {
        this.itemSystem = new ItemSystem();
        this.gathererSystem = new GathererSystem();
        this.upgradeSystem = new UpgradeSystem();
        this.processorSystem = new ProcessorSystem();
        this.buffSystem = new BuffSystem();
        this.statisticSystem = new StatisticSystem();
        this.achievementSystem = new AchievementSystem();
        this.prestigeSystem = new PrestigeSystem();

        data = new Data(this.itemSystem, this.gathererSystem, this.upgradeSystem, this.processorSystem, this.buffSystem, this.statisticSystem, this.achievementSystem, this.prestigeSystem);

        this.inventory = new Inventory(this.itemSystem);
        this.inventoryUI = new InventoryUI(this.inventory, this.buffSystem);
        this.craftingUI = new CraftingUI(this.processorSystem, this.upgradeSystem, this.itemSystem);
        this.storeUI = new StoreUI(this.upgradeSystem, this.gathererSystem, this.itemSystem);
        this.equipmentUI = new EquipmentUI(this.upgradeSystem, this.gathererSystem);
        this.statsUI = new StatisticsUI(this.itemSystem);
        this.headerUI = new HeaderUI(data);
        this.achievementUI = new AchievementUI(this.achievementSystem);
        this.prestigeUI = new PrestigeUI(this.prestigeSystem);

        this.upgradeSystem.ActivateOnLoad(); // Activate upgrades we've already purchased
    }
    Game.prototype.reset = function () {
        data.InitializeItemSystem(data.itemSystem);
    };

    Game.prototype.tick = function () {
        game.gathererSystem.Mine();
        game.processorSystem.Process();
        game.buffSystem.tick();
        game.achievementSystem.Check();

        game.inventoryUI.updateInventory();
        game.storeUI.updateStore();
        game.equipmentUI.Update();
        game.craftingUI.Update();
        game.statsUI.Update();
        game.headerUI.update();
        game.achievementUI.Update();
        game.prestigeUI.update();

        data.save();
    };
    return Game;
})();

window.onload = function () {
    game = new Game();
    game.prestigeSystem.ActivateRewards(); // Activate prestige rewards if any exist.

    game.tick();
    document.getElementById("preloader").style.display = "none";
    setInterval(game.tick, 1000); // Start ticking
};

function formatNumber(n) {
    if (n > 999999999999) {
        return (n / 1000000000000).toFixed(3) + "T";
    }
    if (n > 999999999) {
        return (n / 1000000000).toFixed(3) + "B";
    } else if (n > 999999) {
        return (n / 1000000).toFixed(3) + "M";
    } else {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//# sourceMappingURL=app.js.map
