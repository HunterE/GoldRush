var ItemSystem = (function () {
    function ItemSystem() {
        this.lowestUnregisteredId = 0;
        this.lowestUnregisteredRecipeID = 0;
        this.Name = "Item";
        this.lowestUnregisteredId = 0;
        this.lowestUnregisteredRecipeID = 0;
        this.items = new Array();
        this.recipes = new Array();
    }
    ItemSystem.prototype.LookupItem = function (id) {
        return this.items[id];
    };

    ItemSystem.prototype.Reset = function () {
        this.lowestUnregisteredRecipeID = 0;
        this.lowestUnregisteredId = 0;
        this.items = new Array();

        for (var i = 0; i < this.recipes.length; ++i) {
            this.recipes[i].Clear();
        }

        this.recipes = new Array();
    };

    ItemSystem.prototype.RegisterItem = function (item) {
        item.SetID(this.lowestUnregisteredId);
        this.items[this.lowestUnregisteredId] = item;
        this.lowestUnregisteredId++;

        if (item.Quantity < 0) {
            item.Quantity = 0;
        }
    };

    ItemSystem.prototype.RegisterRecipe = function (r) {
        r.SetID(this.lowestUnregisteredRecipeID);
        this.recipes[this.lowestUnregisteredRecipeID] = r;
        this.lowestUnregisteredRecipeID++;
    };
    return ItemSystem;
})();

var Item = (function () {
    function Item() {
        this.ValueModifier = 1;
        this.DisplayInInventory = true;
    }
    Item.prototype.Item = function () {
    };

    Item.prototype.Gather = function () {
        this.Quantity++;
        this.Alltime++;
    };
    Item.prototype.SetID = function (id) {
        this.ID = id;
    };
    Item.prototype.SetName = function (name) {
        this.Name = name;
        return this;
    };
    Item.prototype.SetValue = function (value) {
        this.Value = value;
        return this;
    };
    Item.prototype.SetQuantity = function (quantity) {
        this.Quantity = quantity;
        return this;
    };
    Item.prototype.SetAlltime = function (alltime) {
        this.Alltime = alltime;
        return this;
    };
    Item.prototype.SetRarity = function (rarity) {
        this.Rarity = rarity;
        return this;
    };
    Item.prototype.SetType = function (type) {
        this.Type = type;
        return this;
    };
    Item.prototype.SetProbability = function (p) {
        this.Probability = p;
        return this;
    };
    Item.prototype.SetDisplayInInventory = function (disp) {
        this.DisplayInInventory = disp;
        return this;
    };
    Item.prototype.SetRecipe = function (r) {
        this.Recipe = r;
        return this;
    };
    Item.prototype.SetStoreCategory = function (sc) {
        this.StoreCategory = sc;
        return this;
    };
    Item.prototype.SetPrice = function (p) {
        this.Price = p;
        return this;
    };
    Item.prototype.SetBuff = function (b) {
        this.Buff = b;
        return this;
    };
    Item.prototype.GetPrice = function () {
        return this.Price;
    };
    Item.prototype.GetValue = function () {
        return Math.floor(this.Value * this.ValueModifier);
    };
    return Item;
})();

var Recipe = (function () {
    function Recipe() {
        this.inputs = new Array();
        this.outputs = new Array();
    }
    Recipe.prototype.SetID = function (id) {
        this.ID = id;
    };
    Recipe.prototype.Clear = function () {
        this.inputs = new Array();
        this.outputs = new Array();
    };
    Recipe.prototype.AddInput = function (iq) {
        this.inputs.push(iq);
        return this;
    };
    Recipe.prototype.AddOutput = function (iq) {
        this.outputs.push(iq);
        return this;
    };
    Recipe.prototype.SetName = function (name) {
        this.name = name;
        return this;
    };
    return Recipe;
})();

var ProcessorRecipe = (function () {
    function ProcessorRecipe() {
    }
    ProcessorRecipe.prototype.SetRecipe = function (r) {
        this.Recipe = r;
        return this;
    };

    ProcessorRecipe.prototype.SetDuration = function (d) {
        this.Duration = d;
        return this;
    };
    return ProcessorRecipe;
})();

var ItemRarity;
(function (ItemRarity) {
    ItemRarity[ItemRarity["Common"] = 1] = "Common";
    ItemRarity[ItemRarity["Uncommon"] = 2] = "Uncommon";
    ItemRarity[ItemRarity["Rare"] = 3] = "Rare";
    ItemRarity[ItemRarity["Epic"] = 4] = "Epic";
    ItemRarity[ItemRarity["Legendary"] = 5] = "Legendary";
})(ItemRarity || (ItemRarity = {}));

var ItemColor;
(function (ItemColor) {
    ItemColor[ItemColor["Grey"] = 1] = "Grey";
    ItemColor[ItemColor["Green"] = 2] = "Green";
    ItemColor[ItemColor["Blue"] = 3] = "Blue";
    ItemColor[ItemColor["Purple"] = 4] = "Purple";
    ItemColor[ItemColor["Orange"] = 5] = "Orange";
})(ItemColor || (ItemColor = {}));

var ItemType;
(function (ItemType) {
    ItemType[ItemType["Ore"] = 0] = "Ore";
    ItemType[ItemType["Gem"] = 1] = "Gem";
    ItemType[ItemType["Ingredient"] = 2] = "Ingredient";
    ItemType[ItemType["Crafting"] = 3] = "Crafting";
    ItemType[ItemType["Potion"] = 4] = "Potion";
})(ItemType || (ItemType = {}));

// Items
var Stone = new Item();
var Copper = new Item();
var Iron = new Item();
var Silver = new Item();
var Gold = new Item();
var Uranium = new Item();
var Titanium = new Item();
var Opal = new Item();
var Jade = new Item();
var Topaz = new Item();
var Sapphire = new Item();
var Emerald = new Item();
var Ruby = new Item();
var Onyx = new Item();
var Quartz = new Item();
var Diamond = new Item();
var Bronze_bar = new Item();
var Iron_bar = new Item();
var Silver_bar = new Item();
var Gold_bar = new Item();
var Titanium_bar = new Item();
var Ardigal = new Item();
var Sito = new Item();
var Volencia = new Item();
var Fellstalk = new Item();
var Redberries = new Item();
var Jangerberries = new Item();
var Snape_grass = new Item();
var Vial_of_water = new Item();
var Gunpowder = new Item();
var Logs = new Item();
var Oil = new Item();
var Coins = new Item();
var Smelting_Potion = new Item();
var Clicking_Potion = new Item();
var Charming_Potion = new Item();
var Alchemy_Potion = new Item();
var TNT = new Item();
var Copper_Wire = new Item();

// Item Recipes
var Smelting_Potion_recipe = new Recipe().AddInput(new ItemQuantityPair(Ardigal, 1)).AddInput(new ItemQuantityPair(Redberries, 10)).AddOutput(new ItemQuantityPair(Smelting_Potion, 1)).AddInput(new ItemQuantityPair(Vial_of_water, 1));
var Clicking_Potion_recipe = new Recipe().AddInput(new ItemQuantityPair(Sito, 1)).AddInput(new ItemQuantityPair(Jangerberries, 10)).AddOutput(new ItemQuantityPair(Clicking_Potion, 1)).AddInput(new ItemQuantityPair(Vial_of_water, 1));
var Charming_Potion_recipe = new Recipe().AddInput(new ItemQuantityPair(Fellstalk, 1)).AddInput(new ItemQuantityPair(Quartz, 20)).AddOutput(new ItemQuantityPair(Charming_Potion, 1)).AddInput(new ItemQuantityPair(Vial_of_water, 1));
var Alchemy_Potion_recipe = new Recipe().AddInput(new ItemQuantityPair(Volencia, 5)).AddInput(new ItemQuantityPair(Gold_bar, 20)).AddOutput(new ItemQuantityPair(Alchemy_Potion, 1)).AddInput(new ItemQuantityPair(Vial_of_water, 1));

var Bronze_bar_recipe = new Recipe().AddInput(new ItemQuantityPair(Copper, 1)).AddInput(new ItemQuantityPair(Oil, 50)).AddOutput(new ItemQuantityPair(Bronze_bar, 1));
var Iron_bar_recipe = new Recipe().AddInput(new ItemQuantityPair(Iron, 1)).AddInput(new ItemQuantityPair(Oil, 165)).AddOutput(new ItemQuantityPair(Iron_bar, 1));
var Silver_bar_recipe = new Recipe().AddInput(new ItemQuantityPair(Silver, 1)).AddInput(new ItemQuantityPair(Oil, 330)).AddOutput(new ItemQuantityPair(Silver_bar, 1));
var Gold_bar_recipe = new Recipe().AddInput(new ItemQuantityPair(Gold, 1)).AddInput(new ItemQuantityPair(Oil, 685)).AddOutput(new ItemQuantityPair(Gold_bar, 1));
var Titanium_bar_recipe = new Recipe().AddInput(new ItemQuantityPair(Titanium, 1)).AddInput(new ItemQuantityPair(Oil, 1370)).AddOutput(new ItemQuantityPair(Titanium_bar, 1));

var Bronze_bar_processor_recipe = new ProcessorRecipe().SetRecipe(Bronze_bar_recipe).SetDuration(5);
var Iron_bar_processor_recipe = new ProcessorRecipe().SetRecipe(Iron_bar_recipe).SetDuration(15);
var Silver_bar_processor_recipe = new ProcessorRecipe().SetRecipe(Silver_bar_recipe).SetDuration(35);
var Gold_bar_processor_recipe = new ProcessorRecipe().SetRecipe(Gold_bar_recipe).SetDuration(75);
var Titanium_bar_processor_recipe = new ProcessorRecipe().SetRecipe(Titanium_bar_recipe).SetDuration(165);

var Smelting_Potion_processor_recipe = new ProcessorRecipe().SetRecipe(Smelting_Potion_recipe).SetDuration(10);
var Clicking_Potion_processor_recipe = new ProcessorRecipe().SetRecipe(Clicking_Potion_recipe).SetDuration(10);
var Charming_Potion_processor_recipe = new ProcessorRecipe().SetRecipe(Charming_Potion_recipe).SetDuration(10);
var Alchemy_Potion_processor_recipe = new ProcessorRecipe().SetRecipe(Alchemy_Potion_recipe).SetDuration(10);

// Item crafting recipes
var Copper_Wire_Recipe = new Recipe();
var TNT_Recipe = new Recipe();
//# sourceMappingURL=ItemSystem.js.map
