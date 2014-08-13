class ItemSystem {
    items: Array<Item>;
    recipes: Array<Recipe>;
    private lowestUnregisteredId: number = 0;
    private lowestUnregisteredRecipeID: number = 0;
    public Name: string = "Item";

    constructor() {
        this.lowestUnregisteredId = 0;
        this.lowestUnregisteredRecipeID = 0;
        this.items = new Array<Item>();
        this.recipes = new Array<Recipe>();
    }

    LookupItem(id: number): Item {
        return this.items[id];
    }

    Reset() {
        this.lowestUnregisteredRecipeID = 0;
        this.lowestUnregisteredId = 0;
        this.items = new Array<Item>();

        for (var i = 0; i < this.recipes.length; ++i) {
            this.recipes[i].Clear();
        }

        this.recipes = new Array<Recipe>();
    }

    RegisterItem(item: Item) {
        item.SetID(this.lowestUnregisteredId);
        this.items[this.lowestUnregisteredId] = item;
        this.lowestUnregisteredId++;

        if (item.Quantity < 0) {
            item.Quantity = 0;
        }
    }

    RegisterRecipe(r: Recipe) {
        r.SetID(this.lowestUnregisteredRecipeID);
        this.recipes[this.lowestUnregisteredRecipeID] = r;
        this.lowestUnregisteredRecipeID++;
    }
} 

class Item {
    public Item() {
        
    }

    public Gather() {
        this.Quantity++;
        this.Alltime++;
    }
    public SetID(id: number) {
        this.ID = id;
    }
    public SetName(name: string): Item {
        this.Name = name;
        return this;
    }
    public SetValue(value: number): Item {
        this.Value = value;
        return this;
    }
    public SetQuantity(quantity: number): Item {
        this.Quantity = quantity;
        return this;
    }
    public SetAlltime(alltime: number): Item {
        this.Alltime = alltime;
        return this;
    }
    public SetRarity(rarity: ItemRarity): Item {
        this.Rarity = rarity;
        return this;
    }
    public SetType(type: ItemType): Item {
        this.Type = type;
        return this;
    }
    public SetProbability(p: number): Item {
        this.Probability = p;
        return this;
    }
    public SetDisplayInInventory(disp: boolean): Item {
        this.DisplayInInventory = disp;
        return this;
    }
    public SetRecipe(r: Recipe): Item {
        this.Recipe = r;
        return this;
    }
    public SetStoreCategory(sc: StoreCategory): Item {
        this.StoreCategory = sc;
        return this;
    }
    public SetPrice(p: number): Item {
        this.Price = p;
        return this;
    }
    public SetBuff(b: Buff): Item {
        this.Buff = b;
        return this;
    }
    public GetPrice() {
        return this.Price;
    }
    public GetValue() {
        return Math.floor(this.Value * this.ValueModifier);
    }

    public ID: number;
    public Name: string;
    public Value: number;
    public ValueModifier: number = 1;
    public Recipe: Recipe;
    public Quantity: number;
    public Alltime: number;
    public Probability: number
    public Buff: Buff;
    public Rarity: ItemRarity;
    public Type: ItemType;
    public Price: number;
    public StoreCategory: StoreCategory;
    public DisplayInInventory: boolean = true;
}

class Recipe {
    constructor() {
        this.inputs = new Array<ItemQuantityPair>();
        this.outputs = new Array<ItemQuantityPair>();
    }

    public ID: number;
    public inputs: Array<ItemQuantityPair>;
    public outputs: Array<ItemQuantityPair>;
    public name: string;

    public SetID(id: number) {
        this.ID = id;
    }
    public Clear() {
        this.inputs = new Array<ItemQuantityPair>();
        this.outputs = new Array<ItemQuantityPair>();
    }
    public AddInput(iq: ItemQuantityPair) {
        this.inputs.push(iq);
        return this;
    }
    public AddOutput(iq: ItemQuantityPair) {
        this.outputs.push(iq);
        return this;
    }
    public SetName(name: string) {
        this.name = name;
        return this;
    }
}

class ProcessorRecipe {
    public Recipe: Recipe;
    public Duration: number;

    constructor() {

    }

    public SetRecipe(r: Recipe): ProcessorRecipe {
        this.Recipe = r;
        return this;
    }

    public SetDuration(d: number): ProcessorRecipe {
        this.Duration = d;
        return this;
    }
}





enum ItemRarity {
    Common = 1,
    Uncommon = 2,
    Rare = 3,
    Epic = 4,
    Legendary = 5
}

enum ItemColor {
    Grey = 1,
    Green = 2,
    Blue = 3,
    Purple = 4,
    Orange = 5
}

enum ItemType {
    Ore,
    Gem,
    Ingredient,
    Crafting,
    Potion
}

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