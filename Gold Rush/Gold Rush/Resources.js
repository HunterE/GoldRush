var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ResourceSaveData = (function () {
    function ResourceSaveData(name, quantity, alltime) {
        this.Name = name;
        this.Quantity = quantity;
        this.Alltime = alltime;
    }
    return ResourceSaveData;
})();

var ResourceRarity;
(function (ResourceRarity) {
    ResourceRarity[ResourceRarity["Common"] = 0] = "Common";
    ResourceRarity[ResourceRarity["Uncommon"] = 1] = "Uncommon";
    ResourceRarity[ResourceRarity["Rare"] = 2] = "Rare";
    ResourceRarity[ResourceRarity["Legendary"] = 3] = "Legendary";
})(ResourceRarity || (ResourceRarity = {}));

var ResourceCategory;
(function (ResourceCategory) {
    ResourceCategory[ResourceCategory["Ore"] = 0] = "Ore";
    ResourceCategory[ResourceCategory["Bar"] = 1] = "Bar";
    ResourceCategory[ResourceCategory["Gem"] = 2] = "Gem";
    ResourceCategory[ResourceCategory["Ingredient"] = 3] = "Ingredient";
    ResourceCategory[ResourceCategory["Crafting"] = 4] = "Crafting";
})(ResourceCategory || (ResourceCategory = {}));

var Resource = (function (_super) {
    __extends(Resource, _super);
    function Resource(name, quantity, alltime, value, rarity, category) {
        _super.call(this, name, quantity, alltime);

        this.Name = name;
        this.Quantity = quantity;
        this.Alltime = alltime;
        this.Value = value;
        this.Rarity = rarity;
        this.Category = category;
    }
    return Resource;
})(ResourceSaveData);
var Resources;

Resources = [
    new Resource("Stone", 0, 0, 1, 0 /* Common */, 0 /* Ore */),
    new Resource("Copper", 0, 0, 5, 0 /* Common */, 0 /* Ore */),
    new Resource("Iron", 0, 0, 20, 0 /* Common */, 0 /* Ore */),
    new Resource("Gold", 0, 0, 20, 0 /* Common */, 0 /* Ore */),
    new Resource("Uranium", 0, 0, 5000, 1 /* Uncommon */, 0 /* Ore */),
    new Resource("Titanium", 0, 0, 1000000, 2 /* Rare */, 0 /* Ore */),
    new Resource("Opal", 0, 0, 2000, 0 /* Common */, 2 /* Gem */),
    new Resource("Jade", 0, 0, 5000, 0 /* Common */, 2 /* Gem */),
    new Resource("Topaz", 0, 0, 10000, 0 /* Common */, 2 /* Gem */),
    new Resource("Sapphire", 0, 0, 25000, 1 /* Uncommon */, 2 /* Gem */),
    new Resource("Emerald", 0, 0, 50000, 1 /* Uncommon */, 2 /* Gem */),
    new Resource("Ruby", 0, 0, 100000, 1 /* Uncommon */, 2 /* Gem */),
    new Resource("Onyx", 0, 0, 250000, 2 /* Rare */, 2 /* Gem */),
    new Resource("Quartz", 0, 0, 500000, 2 /* Rare */, 2 /* Gem */),
    new Resource("Onyx", 0, 0, 250000, 2 /* Rare */, 2 /* Gem */),
    new Resource("Diamond", 0, 0, 5000000, 3 /* Legendary */, 2 /* Gem */),
    new Resource("Bronze bar", 0, 0, 250, 0 /* Common */, 1 /* Bar */),
    new Resource("Iron bar", 0, 0, 1000, 0 /* Common */, 1 /* Bar */),
    new Resource("Silver bar", 0, 0, 2500, 0 /* Common */, 1 /* Bar */),
    new Resource("Gold bar", 0, 0, 25000, 0 /* Common */, 1 /* Bar */),
    new Resource("Titanium bar", 0, 0, 1000000, 3 /* Legendary */, 1 /* Bar */),
    new Resource("Ardigal", 0, 0, 10000, 0 /* Common */, 3 /* Ingredient */),
    new Resource("Sito", 0, 0, 50000, 0 /* Common */, 3 /* Ingredient */),
    new Resource("Volencia", 0, 0, 100000, 1 /* Uncommon */, 3 /* Ingredient */),
    new Resource("Fellstalk", 0, 0, 1000000, 2 /* Rare */, 3 /* Ingredient */),
    new Resource("Redberries", 0, 0, 1000, 0 /* Common */, 3 /* Ingredient */),
    new Resource("Jangerberries", 0, 0, 5000, 0 /* Common */, 3 /* Ingredient */),
    new Resource("Snape grass", 0, 0, 10000, 0 /* Common */, 3 /* Ingredient */),
    new Resource("Vial of water", 0, 0, 500, 0 /* Common */, 4 /* Crafting */),
    new Resource("Gunpowder", 0, 0, 500, 0 /* Common */, 4 /* Crafting */)
];
//# sourceMappingURL=Resources.js.map
