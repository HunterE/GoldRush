﻿class Data {
    constructor(items: ItemSystem, gatherers: GathererSystem, upgrades: UpgradeSystem, processors: ProcessorSystem, buffs: BuffSystem, stats: StatisticSystem, achievements: AchievementSystem) {
        this.itemSystem = items;

        this.gathererSystem = gatherers;

        this.upgradeSystem = upgrades;

        this.processorSystem = processors;

        this.buffSystem = buffs;

        this.statisticSystem = stats;

        this.achievementSystem = achievements;

        this.initializeData();
        this.load();
    }
    itemSystem: ItemSystem;
    gathererSystem: GathererSystem;
    upgradeSystem: UpgradeSystem;
    processorSystem: ProcessorSystem; 
    buffSystem: BuffSystem;
    statisticSystem: StatisticSystem;
    achievementSystem: AchievementSystem;

    invconfigsave = new Array<InventoryConfigSave>();

    public importSave(s: string): boolean {
        var currentsave = localStorage.getItem("save");
        var stringsave;
        try {
            stringsave = JSON.parse(LZString.decompressFromBase64(s));
            this.initializeData();
            localStorage.setItem("save", s);
            this.load();
        } catch (e) {
            console.log("invalid save data");
            this.initializeData();
            localStorage.setItem("save", currentsave);
            this.load();
            return false;
        }
    }

    public InitializeItemSystem(items: ItemSystem) {
        items.Reset();

        items.RegisterItem(Stone = Stone.SetName("Stone").SetQuantity(0).SetAlltime(0).SetValue(1).SetRarity(ItemRarity.Common).SetType(ItemType.Ore).SetProbability(1500000));
        items.RegisterItem(Copper = Copper.SetName("Copper").SetQuantity(0).SetAlltime(0).SetValue(5).SetRarity(ItemRarity.Common).SetType(ItemType.Ore).SetProbability(750000));
        items.RegisterItem(Iron= Iron.SetName("Iron").SetQuantity(0).SetAlltime(0).SetValue(20).SetRarity(ItemRarity.Common).SetType(ItemType.Ore).SetProbability(250000));
        items.RegisterItem(Silver=Silver.SetName("Silver").SetQuantity(0).SetAlltime(0).SetValue(100).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Ore).SetProbability(100000));
        items.RegisterItem(Gold=Gold.SetName("Gold").SetQuantity(0).SetAlltime(0).SetValue(1000).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Ore).SetProbability(50000));
        items.RegisterItem(Uranium=Uranium.SetName("Uranium").SetQuantity(0).SetAlltime(0).SetValue(5000).SetRarity(ItemRarity.Rare).SetType(ItemType.Ore).SetProbability(5000));
        items.RegisterItem(Titanium=Titanium.SetName("Titanium").SetQuantity(0).SetAlltime(0).SetValue(1000000).SetRarity(ItemRarity.Epic).SetType(ItemType.Ore).SetProbability(25));
        items.RegisterItem(Opal=Opal.SetName("Opal").SetQuantity(0).SetAlltime(0).SetValue(2000).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Gem).SetProbability(3000));
        items.RegisterItem(Jade=Jade.SetName("Jade").SetQuantity(0).SetAlltime(0).SetValue(5000).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Gem).SetProbability(2000));
        items.RegisterItem(Topaz=Topaz.SetName("Topaz").SetQuantity(0).SetAlltime(0).SetValue(10000).SetRarity(ItemRarity.Rare).SetType(ItemType.Gem).SetProbability(1000));
        items.RegisterItem(Sapphire=Sapphire.SetName("Sapphire").SetQuantity(0).SetAlltime(0).SetValue(25000).SetRarity(ItemRarity.Rare).SetType(ItemType.Gem).SetProbability(750));
        items.RegisterItem(Emerald=Emerald.SetName("Emerald").SetQuantity(0).SetAlltime(0).SetValue(50000).SetRarity(ItemRarity.Rare).SetType(ItemType.Gem).SetProbability(500));
        items.RegisterItem(Ruby=Ruby.SetName("Ruby").SetQuantity(0).SetAlltime(0).SetValue(100000).SetRarity(ItemRarity.Rare).SetType(ItemType.Gem).SetProbability(250));
        items.RegisterItem(Onyx=Onyx.SetName("Onyx").SetQuantity(0).SetAlltime(0).SetValue(250000).SetRarity(ItemRarity.Epic).SetType(ItemType.Gem).SetProbability(125));
        items.RegisterItem(Quartz=Quartz.SetName("Quartz").SetQuantity(0).SetAlltime(0).SetValue(500000).SetRarity(ItemRarity.Epic).SetType(ItemType.Gem).SetProbability(10));
        items.RegisterItem(Diamond=Diamond.SetName("Diamond").SetQuantity(0).SetAlltime(0).SetValue(5000000).SetRarity(ItemRarity.Legendary).SetType(ItemType.Gem).SetProbability(5));
        items.RegisterItem(Bronze_bar=Bronze_bar.SetName("Bronze bar").SetQuantity(0).SetAlltime(0).SetValue(250).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Crafting));
        items.RegisterItem(Iron_bar=Iron_bar.SetName("Iron bar").SetQuantity(0).SetAlltime(0).SetValue(1000).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Crafting));
        items.RegisterItem(Silver_bar=Silver_bar.SetName("Silver bar").SetQuantity(0).SetAlltime(0).SetValue(2500).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Crafting));
        items.RegisterItem(Gold_bar=Gold_bar.SetName("Gold bar").SetQuantity(0).SetAlltime(0).SetValue(25000).SetRarity(ItemRarity.Rare).SetType(ItemType.Crafting));
        items.RegisterItem(Titanium_bar=Titanium_bar.SetName("Titanium bar").SetQuantity(0).SetAlltime(0).SetValue(5000000).SetRarity(ItemRarity.Legendary).SetType(ItemType.Crafting));
        items.RegisterItem(Ardigal=Ardigal.SetName("Ardigal").SetQuantity(0).SetAlltime(0).SetValue(10000).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Ingredient).SetProbability(1000));
        items.RegisterItem(Sito=Sito.SetName("Sito").SetQuantity(0).SetAlltime(0).SetValue(25000).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Ingredient).SetProbability(500));
        items.RegisterItem(Volencia=Volencia.SetName("Volencia").SetQuantity(0).SetAlltime(0).SetValue(500000).SetRarity(ItemRarity.Epic).SetType(ItemType.Ingredient).SetProbability(250));
        items.RegisterItem(Fellstalk=Fellstalk.SetName("Fellstalk").SetQuantity(0).SetAlltime(0).SetValue(1000000).SetRarity(ItemRarity.Epic).SetType(ItemType.Ingredient).SetProbability(100));
        items.RegisterItem(Redberries=Redberries.SetName("Redberries").SetQuantity(0).SetAlltime(0).SetValue(1000).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Ingredient).SetProbability(2000));
        items.RegisterItem(Jangerberries=Jangerberries.SetName("Jangerberries").SetQuantity(0).SetAlltime(0).SetValue(5000).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Ingredient).SetProbability(1000));
        items.RegisterItem(Snape_grass=Snape_grass.SetName("Snape grass").SetQuantity(0).SetAlltime(0).SetValue(10000).SetRarity(ItemRarity.Rare).SetType(ItemType.Ingredient).SetProbability(250));
        items.RegisterItem(Vial_of_water=Vial_of_water.SetName("Empty vial").SetQuantity(0).SetAlltime(0).SetValue(500).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Crafting).SetPrice(1000).SetStoreCategory(StoreCategory.Items));
        items.RegisterItem(Gunpowder=Gunpowder.SetName("Gunpowder").SetQuantity(0).SetAlltime(0).SetValue(1250).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Crafting).SetPrice(2500).SetStoreCategory(StoreCategory.Items));
        items.RegisterItem(Logs=Logs.SetName("Logs").SetQuantity(0).SetAlltime(0).SetValue(500).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Crafting));
        items.RegisterItem(Oil=Oil.SetName("Oil").SetDisplayInInventory(false).SetQuantity(0).SetAlltime(0).SetValue(500).SetRarity(ItemRarity.Uncommon));
        items.RegisterItem(Coins=Coins.SetName("Coins").SetDisplayInInventory(false).SetQuantity(0).SetAlltime(0).SetValue(1));
        items.RegisterItem(Clicking_Potion=Clicking_Potion.SetName("Clicking Potion").SetQuantity(0).SetAlltime(0).SetValue(25000).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Potion));
        items.RegisterItem(Smelting_Potion=Smelting_Potion.SetName("Smelting Potion").SetQuantity(0).SetAlltime(0).SetValue(10000).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Potion));
        items.RegisterItem(Charming_Potion=Charming_Potion.SetName("Speech Potion").SetQuantity(0).SetAlltime(0).SetValue(50000).SetRarity(ItemRarity.Rare).SetType(ItemType.Potion));
        items.RegisterItem(Alchemy_Potion=Alchemy_Potion.SetName("Alchemy Potion").SetQuantity(0).SetAlltime(0).SetValue(100000).SetRarity(ItemRarity.Epic).SetType(ItemType.Potion));
        items.RegisterItem(Copper_Wire=Copper_Wire.SetName("Copper wire").SetQuantity(0).SetAlltime(0).SetValue(400).SetRarity(ItemRarity.Uncommon).SetType(ItemType.Crafting));
        items.RegisterItem(TNT=TNT.SetName("TNT").SetQuantity(0).SetAlltime(0).SetValue(100000).SetRarity(ItemRarity.Rare).SetType(ItemType.Crafting));
   
        items.RegisterRecipe(Copper_Wire_Recipe = Copper_Wire_Recipe.AddInput(new ItemQuantityPair(Bronze_bar, 10)).AddInput(new ItemQuantityPair(Copper, 1000)).AddOutput(new ItemQuantityPair(Copper_Wire, 100)));
        items.RegisterRecipe(TNT_Recipe = TNT_Recipe.AddInput(new ItemQuantityPair(Gunpowder, 100)).AddInput(new ItemQuantityPair(Copper_Wire, 25)).AddOutput(new ItemQuantityPair(TNT, 1)));
    
    }

    public InitializeGathererSystem(gatherers: GathererSystem) {
        gatherers.Reset();

        gatherers.RegisterItem(Player=Player.SetAutoMine(false).SetQuantity(1).SetMaxOwned(1).SetFuelConsumed(0).SetName("Manual Clicking").SetEfficiency(1).AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]));
        gatherers.RegisterItem(Miner = Miner.SetQuantity(0).SetMaxOwned(10).SetFuelConsumed(0).SetBasePrice(1000).SetPriceModifier(1.15).SetEfficiency(1).SetName("Miner").AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]));
        gatherers.RegisterItem(Lumberjack = Lumberjack.SetQuantity(0).SetMaxOwned(10).SetFuelConsumed(0).SetName("Lumberjack").SetBasePrice(20000).SetEfficiency(1).SetPriceModifier(1.15).AddGuaranteedOre(Logs).SetNothingChance(200));
        gatherers.RegisterItem(Drill = Drill.SetQuantity(0).SetMaxOwned(10).SetFuelConsumed(0).SetName("Drill").SetBasePrice(1000000).SetEfficiency(5).SetPriceModifier(1.8).AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]));
        gatherers.RegisterItem(Crusher = Crusher.SetQuantity(0).SetMaxOwned(10).SetFuelConsumed(15).SetName("Crusher").SetBasePrice(5000000).SetEfficiency(10).SetPriceModifier(1.65).AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]));
        gatherers.RegisterItem(Excavator = Excavator.SetQuantity(0).SetMaxOwned(10).SetFuelConsumed(30).SetName("Excavator").SetBasePrice(500000000).SetEfficiency(30).SetPriceModifier(1.3).AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]));
        gatherers.RegisterItem(MegaDrill = MegaDrill.SetQuantity(0).SetMaxOwned(10).SetFuelConsumed(45).SetName("Mega Drill").SetBasePrice(5000000000).SetEfficiency(100).SetPriceModifier(1.5).AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]));
        gatherers.RegisterItem(Pumpjack = Pumpjack.SetQuantity(0).SetMaxOwned(100).SetFuelConsumed(0).SetName("Pumpjack").SetBasePrice(100000).SetPriceModifier(1.1).AddGuaranteedOre(Oil));
        gatherers.RegisterItem(BigTexan = BigTexan.SetDisplay(false).SetQuantity(0).SetMaxOwned(0).SetFuelConsumed(0).SetName("Big Texan").SetBasePrice(1000000).SetPriceModifier(1.75).AddGuaranteedOre(Oil));
    }

    public InitializeUpgradeSystem(upgrades: UpgradeSystem) {
        upgrades.Reset();

        upgrades.RegisterItem(ClickUpgrade = ClickUpgrade.SetName("Click Upgrade").SetActive(false).AddEffect(ClickUpgrade_Effect).SetType(UpgradeType.Purchased).SetPrice(1000).SetStoreCategory(StoreCategory.Mining));
        upgrades.RegisterItem(ClickUpgrade2 = ClickUpgrade2.SetName("Click Upgrade II").SetActive(false).AddEffect(ClickUpgrade2_Effect).SetType(UpgradeType.Purchased).SetPrice(50000).SetRequires(ClickUpgrade).SetStoreCategory(StoreCategory.Mining));
        upgrades.RegisterItem(ClickUpgrade3 = ClickUpgrade3.SetName("Click Upgrade III").SetActive(false).AddEffect(ClickUpgrade3_Effect).SetType(UpgradeType.Purchased).SetPrice(1000000).SetRequires(ClickUpgrade2).SetStoreCategory(StoreCategory.Mining));
        upgrades.RegisterItem(GoldenClick = GoldenClick.SetName("Gilded Clicks").SetActive(false).AddEffect(GoldenClick_Effect).SetType(UpgradeType.Crafted).SetRequires(ClickUpgrade3).SetRecipe(GoldenClick_Recipe));
        upgrades.RegisterItem(IronPickaxe = IronPickaxe.SetName("Iron Pickaxe").SetActive(false).AddEffect(IronPickaxe_Effect).SetType(UpgradeType.Purchased).SetPrice(1000).SetStoreCategory(StoreCategory.Mining));
        upgrades.RegisterItem(SteelPickaxe = SteelPickaxe.SetName("Steel Pickaxe").SetActive(false).AddEffect(SteelPickaxe_Effect).SetType(UpgradeType.Purchased).SetPrice(20000).SetRequires(IronPickaxe).SetStoreCategory(StoreCategory.Mining));
        upgrades.RegisterItem(GoldPickaxe = GoldPickaxe.SetName("Gold Pickaxe").SetActive(false).AddEffect(GoldPickaxe_Effect).SetType(UpgradeType.Purchased).SetPrice(100000).SetRequires(SteelPickaxe).SetStoreCategory(StoreCategory.Mining));
        upgrades.RegisterItem(DiamondPickaxe = DiamondPickaxe.SetName("Diamond Pickaxe").SetActive(false).AddEffect(DiamondPickaxe_Effect).SetType(UpgradeType.Purchased).SetPrice(1000000).SetRequires(GoldPickaxe).SetStoreCategory(StoreCategory.Mining));
        upgrades.RegisterItem(Researcher = Researcher.SetName("Researcher").SetActive(false).AddEffect(Researcher_Effect).SetType(UpgradeType.Purchased).SetPrice(1000000).SetStoreCategory(StoreCategory.Gatherering));
        upgrades.RegisterItem(Geologist = Geologist.SetName("Geologist").SetActive(false).AddEffect(Geologist_Effect).SetType(UpgradeType.Purchased).SetPrice(100000000).SetRequires(Researcher).SetStoreCategory(StoreCategory.Gatherering));
        upgrades.RegisterItem(Backpack = Backpack.SetName("Backpack").SetActive(false).AddEffect(Backpack_Effect).SetType(UpgradeType.Crafted).SetRecipe(Backpack_Recipe));
        upgrades.RegisterItem(Botanist = Botanist.SetName("Botanist").SetActive(false).AddEffect(Botanist_Effect).SetType(UpgradeType.Purchased).SetPrice(100000000).SetRequires(Backpack).SetStoreCategory(StoreCategory.Gatherering));
        upgrades.RegisterItem(Tunnels = Tunnels.SetName("Deeper Tunnels").SetActive(false).AddEffect(Tunnels_Effect).SetType(UpgradeType.Crafted).SetRecipe(Tunnels_Recipe));
        upgrades.RegisterItem(FurnaceUnlock = FurnaceUnlock.SetName("Furnace").SetActive(false).SetType(UpgradeType.Purchased).SetPrice(5000000).SetStoreCategory(StoreCategory.Processing).AddEffect(FurnaceUnlock_Effect));
        upgrades.RegisterItem(CauldronUnlock = CauldronUnlock.SetName("Cauldron").SetActive(false).SetType(UpgradeType.Purchased).SetPrice(25000000).SetStoreCategory(StoreCategory.Processing).AddEffect(CauldronUnlock_Effect));
        upgrades.RegisterItem(Foreman = Foreman.SetName("Supervisor").SetActive(false).SetType(UpgradeType.Purchased).SetPrice(250000).SetStoreCategory(StoreCategory.Gatherering).AddEffect(Foreman_Effect));
        upgrades.RegisterItem(Mechanic = Mechanic.SetName("Mechanic").SetActive(false).SetType(UpgradeType.Purchased).SetPrice(2500000).SetStoreCategory(StoreCategory.Gatherering).AddEffect(Mechanic_Effect));
        upgrades.RegisterItem(ExpertMechanic = ExpertMechanic.SetName("Journeyman Mechanic").SetActive(false).SetType(UpgradeType.Purchased).SetPrice(25000000).SetStoreCategory(StoreCategory.Gatherering).AddEffect(ExpertMechanic_Effect).SetRequires(Mechanic));
        upgrades.RegisterItem(Dictator = Dictator.SetName("Foreman").SetActive(false).SetType(UpgradeType.Purchased).SetPrice(2500000).SetStoreCategory(StoreCategory.Gatherering).AddEffect(Dictator_Effect).SetRequires(Foreman));
        upgrades.RegisterItem(LargerCauldron = LargerCauldron.SetName("Larger Cauldron").SetActive(false).AddEffect(LargerCauldron_Effect).SetType(UpgradeType.Crafted).SetRecipe(LargerCauldron_Recipe).SetRequires(FurnaceUnlock));
        upgrades.RegisterItem(ReinforcedFurnace = ReinforcedFurnace.SetName("Reinforced Furnace").SetActive(false).AddEffect(ReinforcedFurnace_Effect).SetType(UpgradeType.Crafted).SetRecipe(ReinforcedFurnace_Recipe).SetRequires(FurnaceUnlock));
        upgrades.RegisterItem(EnchantedCauldron = EnchantedCauldron.SetName("Bubblier Cauldron").SetActive(false).SetType(UpgradeType.Crafted).AddEffect(EnchantedCauldron_Effect).SetRecipe(EnchantedCauldron_Recipe).SetRequires(LargerCauldron));
        upgrades.RegisterItem(HotterFurnace = HotterFurnace.SetName("Hotter Furnace").SetActive(false).AddEffect(HotterFurnace_Effect).SetType(UpgradeType.Crafted).SetRecipe(HotterFurnace_Recipe).SetRequires(ReinforcedFurnace));
        upgrades.RegisterItem(Witch = Witch.SetName("Witch").SetActive(false).SetType(UpgradeType.Purchased).SetPrice(50000000).SetStoreCategory(StoreCategory.Processing).AddEffect(Witch_Effect).SetRequires(CauldronUnlock));
        upgrades.RegisterItem(Blacksmith = Blacksmith.SetName("Blacksmith").SetActive(false).SetType(UpgradeType.Purchased).SetPrice(10000000).SetStoreCategory(StoreCategory.Processing).AddEffect(Blacksmith_Effect).SetRequires(FurnaceUnlock));
        upgrades.RegisterItem(OilBaron = OilBaron.SetName("Oil Baron").SetActive(false).SetType(UpgradeType.Purchased).SetPrice(2500000).SetStoreCategory(StoreCategory.Gatherering).AddEffect(Oilbaron_Effect));
    }

    public InitializeProcessorSystem(processors: ProcessorSystem) {
        processors.Reset();

        processors.RegisterItem(Furnace = Furnace.SetName("Furnace").Reset().AddRecipe(Bronze_bar_processor_recipe).AddRecipe(Iron_bar_processor_recipe).AddRecipe(Silver_bar_processor_recipe).AddRecipe(Gold_bar_processor_recipe).AddRecipe(Titanium_bar_processor_recipe));
        processors.RegisterItem(Cauldron = Cauldron.SetName("Cauldron").Reset().AddRecipe(Smelting_Potion_processor_recipe).AddRecipe(Clicking_Potion_processor_recipe).AddRecipe(Charming_Potion_processor_recipe).AddRecipe(Alchemy_Potion_processor_recipe).SetCapacity(1));
    }

    public InitializeBuffSystem(buffs: BuffSystem) {
        buffs.Reset();

        buffs.RegisterItem(SpeechPotionBuff = SpeechPotionBuff.SetDuration(30).SetItem(Charming_Potion).SetUpgrade(SpeechPotionUpgrade).SetRemaining(0));
        buffs.RegisterItem(ClickingPotionBuff = ClickingPotionBuff.SetDuration(60).SetItem(Clicking_Potion).SetUpgrade(ClickingPotionUpgrade).SetRemaining(0));
        buffs.RegisterItem(AlchemyPotionBuff = AlchemyPotionBuff.SetDuration(90).SetItem(Alchemy_Potion).SetUpgrade(AlchemyPotionUpgrade).SetRemaining(0));
        buffs.RegisterItem(SmeltingPotionBuff = SmeltingPotionBuff.SetDuration(300).SetItem(Smelting_Potion).SetUpgrade(SmeltingPotionUpgrade).SetRemaining(0));
    }

    public InitializeStatisticSystem(stats: StatisticSystem) {
        stats.Reset();

        stats.RegisterItem(StatVersionNumber = StatVersionNumber.SetName("Version").SetValue(0));
        stats.RegisterItem(StatRockClicked = StatRockClicked.SetName("Manual clicks").SetValue(0));
    }

    public InitializeAchievementSystem(achievements: AchievementSystem) {
        achievements.Reset();

        achievements.RegisterItem(AchMoney1 = AchMoney1.SetName("New Money").SetCondition(new AchievementAlltime(Item[1] = [Coins], 10000)).SetCompleted(false));
        achievements.RegisterItem(AchMoney2 = AchMoney2.SetName("Millionaire").SetCondition(new AchievementAlltime(Item[1] = [Coins], 1000000)).SetRequires(AchMoney1).SetCompleted(false));
        achievements.RegisterItem(AchMoney3 = AchMoney3.SetName("Billionaire").SetCondition(new AchievementAlltime(Item[1] = [Coins], 1000000000)).SetRequires(AchMoney2).SetCompleted(false));
        achievements.RegisterItem(AchMiner1 = AchMiner1.SetName("Miner").SetCondition(new AchievementStatistic(StatRockClicked, 100)).SetCompleted(false));
        achievements.RegisterItem(AchMiner2 = AchMiner2.SetName("Carpal Tunnel").SetCondition(new AchievementStatistic(StatRockClicked, 1000)).SetRequires(AchMiner1).SetCompleted(false));
        achievements.RegisterItem(AchMiner3 = AchMiner3.SetName("Black Lung").SetCondition(new AchievementStatistic(StatRockClicked, 10000)).SetRequires(AchMiner2).SetCompleted(false));
        achievements.RegisterItem(AchItemCatOre = AchItemCatOre.SetName("Geologist").SetCondition(new AchievementItemType(ItemType.Ore)).SetCompleted(false));
        achievements.RegisterItem(AchItemCatGem = AchItemCatGem.SetName("Gemologist").SetCondition(new AchievementItemType(ItemType.Gem)).SetCompleted(false));
        achievements.RegisterItem(AchItemCatCrafting = AchItemCatCrafting.SetName("Craftsman").SetCondition(new AchievementItemType(ItemType.Crafting)).SetCompleted(false));
        achievements.RegisterItem(AchItemCatIngredient = AchItemCatIngredient.SetName("Shaman").SetCondition(new AchievementItemType(ItemType.Ingredient)).SetCompleted(false));
        achievements.RegisterItem(AchItemCatPotion = AchItemCatPotion.SetName("Wizard").SetCondition(new AchievementItemType(ItemType.Potion)).SetCompleted(false));

    }

    initializeData() {
        this.InitializeItemSystem(this.itemSystem);
        this.InitializeGathererSystem(this.gathererSystem);
        this.InitializeUpgradeSystem(this.upgradeSystem);
        this.InitializeProcessorSystem(this.processorSystem);
        this.InitializeBuffSystem(this.buffSystem);
        this.InitializeStatisticSystem(this.statisticSystem);
        this.InitializeAchievementSystem(this.achievementSystem);
    }


    save() {
        var savedata;
        var itemsave = new Array<ItemSave>();
        var configsave = new Array<InventoryConfigSave>();
        var machinesave = new Array<GathererSave>();
        var upgradesave = new Array<UpgradeSave>();
        var processorsave = new Array<ProcessorSave>();
        var buffsave = new Array<BuffSave>();
        var statsave = new Array<StatisticSave>();
        var achsave = new Array<AchievementSave>();

        // SAVE ITEMS
        var i;
        for (i = 0; i < this.itemSystem.items.length; ++i) {
            var item = this.itemSystem.items[i];
            itemsave.push(new ItemSave(item.Quantity, item.Alltime));
        }
        // SAVE Inventory Config
        if (game) {
            for (i = 0; i < this.itemSystem.items.length; ++i) {
                item = this.itemSystem.items[i];
                if (item.DisplayInInventory) {
                    if (game.inventoryUI.itemSellIsChecked(i)) {
                        configsave.push(new InventoryConfigSave(i, true));
                    } else {
                        configsave.push(new InventoryConfigSave(i, false));
                    }
                }
            }
        }

        // SAVE MACHINES
        for (i = 0; i < this.gathererSystem.items.length; ++i) {
            machinesave.push(new GathererSave(this.gathererSystem.items[i].Quantity));
        }
        // SAVE Upgrades
        for (i = 0; i < this.upgradeSystem.items.length; ++i) {
            upgradesave.push(new UpgradeSave(this.upgradeSystem.items[i].Active));
        }
        // Save processor states
        for (i = 0; i < this.processorSystem.items.length; ++i) {
            var proc = this.processorSystem.items[i];
            processorsave.push(new ProcessorSave(proc.GetRecipeIndex(), proc.ActiveJobs, proc.ActiveProgress, proc.Progress));
        }
        // Save buffs
        for (i = 0; i < this.buffSystem.items.length; ++i) {
            buffsave.push(new BuffSave(this.buffSystem.items[i].RemainingTime));
        }
        // Save statistics
        for (i = 0; i < this.statisticSystem.items.length; ++i) {
            statsave.push(new StatisticSave(this.statisticSystem.items[i].Value));
        }
        // Save achievements
        for (i = 0; i < this.achievementSystem.items.length; ++i) {
            achsave.push(new AchievementSave(this.achievementSystem.items[i].Completed));
        }

        savedata = { Items: itemsave, Gatherers: machinesave, Upgrades : upgradesave, InventoryConfig: configsave, Processors: processorsave, Buffs: buffsave, Stats: statsave, Achievements: achsave};
        localStorage.setItem("save", LZString.compressToBase64(JSON.stringify(savedata)));

    }

    load() {
        if (localStorage.getItem("save") !== null) {
            var loaddata;
            try {
                var loadtext = LZString.decompressFromBase64(localStorage.getItem("save"));
                loaddata = JSON.parse(loadtext);
            } catch (e) {
                console.log(e + ": Looks like you're transfering to the new save format. This error should not occur again.");
                loaddata = JSON.parse(localStorage.getItem("save"));
            }
            // Load items.
            var i;
            if (loaddata.Items) {
                for (i = 0; i < loaddata.Items.length; ++i) {
                    var current = loaddata.Items[i];

                    if (current.Quantity) {
                        this.itemSystem.items[i].Quantity = current.Quantity; // Avoid incrementing all time stats
                    }
                    if (current.Alltime) {
                        this.itemSystem.items[i].Alltime = current.Alltime;
                    }
                }
            }
            if (loaddata.InventoryConfig) {
                for (i = 0; i < loaddata.InventoryConfig.length; ++i) {
                    this.invconfigsave.push(loaddata.InventoryConfig[i]);
                }
            }
            // Load machines.

            if (loaddata.Gatherers) {
                for (i = 0; i < loaddata.Gatherers.length; ++i) {
                    var currentM = loaddata.Gatherers[i];

                    if (currentM.Quantity) {
                        this.gathererSystem.items[i].Quantity = currentM.Quantity;
                    }
                    this.gathererSystem.items[i].CalculateMiningStuff();
                }
            }

           
            // Load upgrades.
            if (loaddata.Upgrades) {
                for (i = 0; i < loaddata.Upgrades.length; ++i) {
                    var currentU = loaddata.Upgrades[i];

                    if (currentU.Active) {
                        this.upgradeSystem.items[i].Active = currentU.Active;
                    }
                }
            }

            // Load processor saves.
            if (loaddata.Processors) {
                for (i = 0; i < loaddata.Processors.length; ++i) {
                    if (loaddata.Processors[i]) {
                        var sp = loaddata.Processors[i];
                        var processor = this.processorSystem.items[i];
                        processor.ActiveJobs = sp.ActiveJobs;
                        processor.Jobs = sp.ActiveJobs;
                        processor.ActiveRecipe = processor.Recipes[sp.ActiveRecipeInt];
                        processor.ActiveProgress = sp.ActiveProgress;
                        processor.Progress = sp.Progress;
                    }
                }
            }

            // Load buffs
            if (loaddata.Buffs) {
                for (i = 0; i < loaddata.Buffs.length; ++i) {
                    if (loaddata.Buffs[i]) {
                        this.buffSystem.items[i].RemainingTime = loaddata.Buffs[i].RemainingTime;
                    }
                }
            }
            // Load Stats
            if (loaddata.Stats) {
                for (i = 0; i < loaddata.Stats.length; ++i) {
                    if (loaddata.Stats[i]) {
                        this.statisticSystem.items[i].Value = loaddata.Stats[i].Value;
                    }
                }
            }
            // Load achievements
            if (loaddata.Achievements) {
                for (i = 0; i < loaddata.Achievements.length; ++i) {
                    if (loaddata.Achievements[i]) {
                        this.achievementSystem.items[i].Completed = loaddata.Achievements[i].Completed;
                    }
                }
            }

        } else {
            this.save();
        }
    }
}

class ProcessorSave {
    public ActiveRecipeInt: number; // Current recipe.
    public ActiveJobs: number; // Number of iterations total.
    public ActiveProgress: number; // Number of iterations completed.

    public Progress: number;
    
    constructor(ar: number, aj: number, ap: number, p:number) {
        this.ActiveRecipeInt = ar;
        this.ActiveJobs = aj;
        this.ActiveProgress = ap;
        this.Progress = p;
    }
}

class BuffSave {
    RemainingTime: number;

    constructor(rt: number) {
        this.RemainingTime = rt;
    }
}

class InventoryConfigSave {
    ID: number;
    Checked: boolean;

    constructor(id: number, checked: boolean) {
        this.ID = id;
        this.Checked = checked;
    }
}

class ItemSave {
    Quantity: number;
    Alltime: number;

    constructor(quantity: number, alltime: number) {
        this.Quantity = quantity;
        this.Alltime = alltime;
    }

}

class GathererSave {
    Quantity: number;

    constructor(quantity: number) {
        this.Quantity = quantity;
    }
}

class UpgradeSave {
    Active: boolean;

    constructor(active: boolean) {
        this.Active = active;
    }
}

class StatisticSave {
    Value: number;

    constructor(v: number) {
        this.Value = v;
    }
}

class AchievementSave {
    Completed: boolean;

    constructor(c: boolean) {
        this.Completed = c;
    }
}