var Data = (function () {
    function Data(items, gatherers, upgrades, processors, buffs, stats, achievements) {
        this.invconfigsave = new Array();
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
    Data.prototype.importSave = function (s) {
        var currentsave = localStorage.getItem("save");
        var stringsave;
        try  {
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
    };

    Data.prototype.InitializeItemSystem = function (items) {
        items.Reset();

        items.RegisterItem(Stone = Stone.SetName("Stone").SetQuantity(0).SetAlltime(0).SetValue(1).SetRarity(1 /* Common */).SetType(0 /* Ore */).SetProbability(1500000));
        items.RegisterItem(Copper = Copper.SetName("Copper").SetQuantity(0).SetAlltime(0).SetValue(5).SetRarity(1 /* Common */).SetType(0 /* Ore */).SetProbability(750000));
        items.RegisterItem(Iron = Iron.SetName("Iron").SetQuantity(0).SetAlltime(0).SetValue(20).SetRarity(1 /* Common */).SetType(0 /* Ore */).SetProbability(250000));
        items.RegisterItem(Silver = Silver.SetName("Silver").SetQuantity(0).SetAlltime(0).SetValue(100).SetRarity(2 /* Uncommon */).SetType(0 /* Ore */).SetProbability(100000));
        items.RegisterItem(Gold = Gold.SetName("Gold").SetQuantity(0).SetAlltime(0).SetValue(1000).SetRarity(2 /* Uncommon */).SetType(0 /* Ore */).SetProbability(50000));
        items.RegisterItem(Uranium = Uranium.SetName("Uranium").SetQuantity(0).SetAlltime(0).SetValue(5000).SetRarity(3 /* Rare */).SetType(0 /* Ore */).SetProbability(5000));
        items.RegisterItem(Titanium = Titanium.SetName("Titanium").SetQuantity(0).SetAlltime(0).SetValue(1000000).SetRarity(4 /* Epic */).SetType(0 /* Ore */).SetProbability(25));
        items.RegisterItem(Opal = Opal.SetName("Opal").SetQuantity(0).SetAlltime(0).SetValue(2000).SetRarity(2 /* Uncommon */).SetType(1 /* Gem */).SetProbability(3000));
        items.RegisterItem(Jade = Jade.SetName("Jade").SetQuantity(0).SetAlltime(0).SetValue(5000).SetRarity(2 /* Uncommon */).SetType(1 /* Gem */).SetProbability(2000));
        items.RegisterItem(Topaz = Topaz.SetName("Topaz").SetQuantity(0).SetAlltime(0).SetValue(10000).SetRarity(3 /* Rare */).SetType(1 /* Gem */).SetProbability(1000));
        items.RegisterItem(Sapphire = Sapphire.SetName("Sapphire").SetQuantity(0).SetAlltime(0).SetValue(25000).SetRarity(3 /* Rare */).SetType(1 /* Gem */).SetProbability(750));
        items.RegisterItem(Emerald = Emerald.SetName("Emerald").SetQuantity(0).SetAlltime(0).SetValue(50000).SetRarity(3 /* Rare */).SetType(1 /* Gem */).SetProbability(500));
        items.RegisterItem(Ruby = Ruby.SetName("Ruby").SetQuantity(0).SetAlltime(0).SetValue(100000).SetRarity(3 /* Rare */).SetType(1 /* Gem */).SetProbability(250));
        items.RegisterItem(Onyx = Onyx.SetName("Onyx").SetQuantity(0).SetAlltime(0).SetValue(250000).SetRarity(4 /* Epic */).SetType(1 /* Gem */).SetProbability(125));
        items.RegisterItem(Quartz = Quartz.SetName("Quartz").SetQuantity(0).SetAlltime(0).SetValue(500000).SetRarity(4 /* Epic */).SetType(1 /* Gem */).SetProbability(10));
        items.RegisterItem(Diamond = Diamond.SetName("Diamond").SetQuantity(0).SetAlltime(0).SetValue(5000000).SetRarity(5 /* Legendary */).SetType(1 /* Gem */).SetProbability(5));
        items.RegisterItem(Bronze_bar = Bronze_bar.SetName("Bronze bar").SetQuantity(0).SetAlltime(0).SetValue(250).SetRarity(2 /* Uncommon */).SetType(3 /* Crafting */));
        items.RegisterItem(Iron_bar = Iron_bar.SetName("Iron bar").SetQuantity(0).SetAlltime(0).SetValue(1000).SetRarity(2 /* Uncommon */).SetType(3 /* Crafting */));
        items.RegisterItem(Silver_bar = Silver_bar.SetName("Silver bar").SetQuantity(0).SetAlltime(0).SetValue(2500).SetRarity(2 /* Uncommon */).SetType(3 /* Crafting */));
        items.RegisterItem(Gold_bar = Gold_bar.SetName("Gold bar").SetQuantity(0).SetAlltime(0).SetValue(25000).SetRarity(3 /* Rare */).SetType(3 /* Crafting */));
        items.RegisterItem(Titanium_bar = Titanium_bar.SetName("Titanium bar").SetQuantity(0).SetAlltime(0).SetValue(5000000).SetRarity(5 /* Legendary */).SetType(3 /* Crafting */));
        items.RegisterItem(Ardigal = Ardigal.SetName("Ardigal").SetQuantity(0).SetAlltime(0).SetValue(10000).SetRarity(2 /* Uncommon */).SetType(2 /* Ingredient */).SetProbability(1000));
        items.RegisterItem(Sito = Sito.SetName("Sito").SetQuantity(0).SetAlltime(0).SetValue(25000).SetRarity(2 /* Uncommon */).SetType(2 /* Ingredient */).SetProbability(500));
        items.RegisterItem(Volencia = Volencia.SetName("Volencia").SetQuantity(0).SetAlltime(0).SetValue(500000).SetRarity(4 /* Epic */).SetType(2 /* Ingredient */).SetProbability(250));
        items.RegisterItem(Fellstalk = Fellstalk.SetName("Fellstalk").SetQuantity(0).SetAlltime(0).SetValue(1000000).SetRarity(4 /* Epic */).SetType(2 /* Ingredient */).SetProbability(100));
        items.RegisterItem(Redberries = Redberries.SetName("Redberries").SetQuantity(0).SetAlltime(0).SetValue(1000).SetRarity(2 /* Uncommon */).SetType(2 /* Ingredient */).SetProbability(2000));
        items.RegisterItem(Jangerberries = Jangerberries.SetName("Jangerberries").SetQuantity(0).SetAlltime(0).SetValue(5000).SetRarity(2 /* Uncommon */).SetType(2 /* Ingredient */).SetProbability(1000));
        items.RegisterItem(Snape_grass = Snape_grass.SetName("Snape grass").SetQuantity(0).SetAlltime(0).SetValue(10000).SetRarity(3 /* Rare */).SetType(2 /* Ingredient */).SetProbability(250));
        items.RegisterItem(Vial_of_water = Vial_of_water.SetName("Empty vial").SetQuantity(0).SetAlltime(0).SetValue(500).SetRarity(2 /* Uncommon */).SetType(3 /* Crafting */).SetPrice(1000).SetStoreCategory(4 /* Items */));
        items.RegisterItem(Gunpowder = Gunpowder.SetName("Gunpowder").SetQuantity(0).SetAlltime(0).SetValue(1250).SetRarity(2 /* Uncommon */).SetType(3 /* Crafting */).SetPrice(2500).SetStoreCategory(4 /* Items */));
        items.RegisterItem(Logs = Logs.SetName("Logs").SetQuantity(0).SetAlltime(0).SetValue(500).SetRarity(2 /* Uncommon */).SetType(3 /* Crafting */));
        items.RegisterItem(Oil = Oil.SetName("Oil").SetDisplayInInventory(false).SetQuantity(0).SetAlltime(0).SetValue(500).SetRarity(2 /* Uncommon */));
        items.RegisterItem(Coins = Coins.SetName("Coins").SetDisplayInInventory(false).SetQuantity(0).SetAlltime(0).SetValue(1));
        items.RegisterItem(Clicking_Potion = Clicking_Potion.SetName("Clicking Potion").SetQuantity(0).SetAlltime(0).SetValue(25000).SetRarity(2 /* Uncommon */).SetType(4 /* Potion */));
        items.RegisterItem(Smelting_Potion = Smelting_Potion.SetName("Smelting Potion").SetQuantity(0).SetAlltime(0).SetValue(10000).SetRarity(2 /* Uncommon */).SetType(4 /* Potion */));
        items.RegisterItem(Charming_Potion = Charming_Potion.SetName("Speech Potion").SetQuantity(0).SetAlltime(0).SetValue(50000).SetRarity(3 /* Rare */).SetType(4 /* Potion */));
        items.RegisterItem(Alchemy_Potion = Alchemy_Potion.SetName("Alchemy Potion").SetQuantity(0).SetAlltime(0).SetValue(100000).SetRarity(4 /* Epic */).SetType(4 /* Potion */));
        items.RegisterItem(Copper_Wire = Copper_Wire.SetName("Copper wire").SetQuantity(0).SetAlltime(0).SetValue(400).SetRarity(2 /* Uncommon */).SetType(3 /* Crafting */));
        items.RegisterItem(TNT = TNT.SetName("TNT").SetQuantity(0).SetAlltime(0).SetValue(100000).SetRarity(3 /* Rare */).SetType(3 /* Crafting */));

        items.RegisterRecipe(Copper_Wire_Recipe = Copper_Wire_Recipe.AddInput(new ItemQuantityPair(Bronze_bar, 10)).AddInput(new ItemQuantityPair(Copper, 1000)).AddOutput(new ItemQuantityPair(Copper_Wire, 100)));
        items.RegisterRecipe(TNT_Recipe = TNT_Recipe.AddInput(new ItemQuantityPair(Gunpowder, 100)).AddInput(new ItemQuantityPair(Copper_Wire, 25)).AddOutput(new ItemQuantityPair(TNT, 1)));
    };

    Data.prototype.InitializeGathererSystem = function (gatherers) {
        gatherers.Reset();

        gatherers.RegisterItem(Player = Player.SetAutoMine(false).SetQuantity(1).SetMaxOwned(1).SetFuelConsumed(0).SetName("Manual Clicking").SetEfficiency(1).AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]));
        gatherers.RegisterItem(Miner = Miner.SetQuantity(0).SetMaxOwned(10).SetFuelConsumed(0).SetBasePrice(1000).SetPriceModifier(1.15).SetEfficiency(1).SetName("Miner").AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]));
        gatherers.RegisterItem(Lumberjack = Lumberjack.SetQuantity(0).SetMaxOwned(10).SetFuelConsumed(0).SetName("Lumberjack").SetBasePrice(20000).SetEfficiency(1).SetPriceModifier(1.15).AddGuaranteedOre(Logs).SetNothingChance(200));
        gatherers.RegisterItem(Drill = Drill.SetQuantity(0).SetMaxOwned(10).SetFuelConsumed(0).SetName("Drill").SetBasePrice(1000000).SetEfficiency(5).SetPriceModifier(1.8).AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]));
        gatherers.RegisterItem(Crusher = Crusher.SetQuantity(0).SetMaxOwned(10).SetFuelConsumed(15).SetName("Crusher").SetBasePrice(5000000).SetEfficiency(10).SetPriceModifier(1.65).AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]));
        gatherers.RegisterItem(Excavator = Excavator.SetQuantity(0).SetMaxOwned(10).SetFuelConsumed(30).SetName("Excavator").SetBasePrice(500000000).SetEfficiency(30).SetPriceModifier(1.3).AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]));
        gatherers.RegisterItem(MegaDrill = MegaDrill.SetQuantity(0).SetMaxOwned(10).SetFuelConsumed(45).SetName("Mega Drill").SetBasePrice(5000000000).SetEfficiency(100).SetPriceModifier(1.5).AddMineableOres(Item[8] = [Stone, Copper, Iron, Silver, Gold, Opal, Jade, Topaz]));
        gatherers.RegisterItem(Pumpjack = Pumpjack.SetQuantity(0).SetMaxOwned(100).SetFuelConsumed(0).SetName("Pumpjack").SetBasePrice(100000).SetPriceModifier(1.1).AddGuaranteedOre(Oil));
        gatherers.RegisterItem(BigTexan = BigTexan.SetDisplay(false).SetQuantity(0).SetMaxOwned(0).SetFuelConsumed(0).SetName("Big Texan").SetBasePrice(1000000).SetPriceModifier(1.75).AddGuaranteedOre(Oil));
    };

    Data.prototype.InitializeUpgradeSystem = function (upgrades) {
        upgrades.Reset();

        upgrades.RegisterItem(ClickUpgrade = ClickUpgrade.SetName("Click Upgrade").SetActive(false).AddEffect(ClickUpgrade_Effect).SetType(0 /* Purchased */).SetPrice(1000).SetStoreCategory(0 /* Mining */));
        upgrades.RegisterItem(ClickUpgrade2 = ClickUpgrade2.SetName("Click Upgrade II").SetActive(false).AddEffect(ClickUpgrade2_Effect).SetType(0 /* Purchased */).SetPrice(50000).SetRequires(ClickUpgrade).SetStoreCategory(0 /* Mining */));
        upgrades.RegisterItem(ClickUpgrade3 = ClickUpgrade3.SetName("Click Upgrade III").SetActive(false).AddEffect(ClickUpgrade3_Effect).SetType(0 /* Purchased */).SetPrice(1000000).SetRequires(ClickUpgrade2).SetStoreCategory(0 /* Mining */));
        upgrades.RegisterItem(GoldenClick = GoldenClick.SetName("Gilded Clicks").SetActive(false).AddEffect(GoldenClick_Effect).SetType(1 /* Crafted */).SetRequires(ClickUpgrade3).SetRecipe(GoldenClick_Recipe));
        upgrades.RegisterItem(IronPickaxe = IronPickaxe.SetName("Iron Pickaxe").SetActive(false).AddEffect(IronPickaxe_Effect).SetType(0 /* Purchased */).SetPrice(1000).SetStoreCategory(0 /* Mining */));
        upgrades.RegisterItem(SteelPickaxe = SteelPickaxe.SetName("Steel Pickaxe").SetActive(false).AddEffect(SteelPickaxe_Effect).SetType(0 /* Purchased */).SetPrice(20000).SetRequires(IronPickaxe).SetStoreCategory(0 /* Mining */));
        upgrades.RegisterItem(GoldPickaxe = GoldPickaxe.SetName("Gold Pickaxe").SetActive(false).AddEffect(GoldPickaxe_Effect).SetType(0 /* Purchased */).SetPrice(100000).SetRequires(SteelPickaxe).SetStoreCategory(0 /* Mining */));
        upgrades.RegisterItem(DiamondPickaxe = DiamondPickaxe.SetName("Diamond Pickaxe").SetActive(false).AddEffect(DiamondPickaxe_Effect).SetType(0 /* Purchased */).SetPrice(1000000).SetRequires(GoldPickaxe).SetStoreCategory(0 /* Mining */));
        upgrades.RegisterItem(Researcher = Researcher.SetName("Researcher").SetActive(false).AddEffect(Researcher_Effect).SetType(0 /* Purchased */).SetPrice(1000000).SetStoreCategory(2 /* Gatherering */));
        upgrades.RegisterItem(Geologist = Geologist.SetName("Geologist").SetActive(false).AddEffect(Geologist_Effect).SetType(0 /* Purchased */).SetPrice(100000000).SetRequires(Researcher).SetStoreCategory(2 /* Gatherering */));
        upgrades.RegisterItem(Backpack = Backpack.SetName("Backpack").SetActive(false).AddEffect(Backpack_Effect).SetType(1 /* Crafted */).SetRecipe(Backpack_Recipe));
        upgrades.RegisterItem(Botanist = Botanist.SetName("Botanist").SetActive(false).AddEffect(Botanist_Effect).SetType(0 /* Purchased */).SetPrice(100000000).SetRequires(Backpack).SetStoreCategory(2 /* Gatherering */));
        upgrades.RegisterItem(Tunnels = Tunnels.SetName("Deeper Tunnels").SetActive(false).AddEffect(Tunnels_Effect).SetType(1 /* Crafted */).SetRecipe(Tunnels_Recipe));
        upgrades.RegisterItem(FurnaceUnlock = FurnaceUnlock.SetName("Furnace").SetActive(false).SetType(0 /* Purchased */).SetPrice(5000000).SetStoreCategory(3 /* Processing */).AddEffect(FurnaceUnlock_Effect));
        upgrades.RegisterItem(CauldronUnlock = CauldronUnlock.SetName("Cauldron").SetActive(false).SetType(0 /* Purchased */).SetPrice(25000000).SetStoreCategory(3 /* Processing */).AddEffect(CauldronUnlock_Effect));
        upgrades.RegisterItem(Foreman = Foreman.SetName("Supervisor").SetActive(false).SetType(0 /* Purchased */).SetPrice(250000).SetStoreCategory(2 /* Gatherering */).AddEffect(Foreman_Effect));
        upgrades.RegisterItem(Mechanic = Mechanic.SetName("Mechanic").SetActive(false).SetType(0 /* Purchased */).SetPrice(2500000).SetStoreCategory(2 /* Gatherering */).AddEffect(Mechanic_Effect));
        upgrades.RegisterItem(ExpertMechanic = ExpertMechanic.SetName("Journeyman Mechanic").SetActive(false).SetType(0 /* Purchased */).SetPrice(25000000).SetStoreCategory(2 /* Gatherering */).AddEffect(ExpertMechanic_Effect).SetRequires(Mechanic));
        upgrades.RegisterItem(Dictator = Dictator.SetName("Foreman").SetActive(false).SetType(0 /* Purchased */).SetPrice(2500000).SetStoreCategory(2 /* Gatherering */).AddEffect(Dictator_Effect).SetRequires(Foreman));
        upgrades.RegisterItem(LargerCauldron = LargerCauldron.SetName("Larger Cauldron").SetActive(false).AddEffect(LargerCauldron_Effect).SetType(1 /* Crafted */).SetRecipe(LargerCauldron_Recipe).SetRequires(FurnaceUnlock));
        upgrades.RegisterItem(ReinforcedFurnace = ReinforcedFurnace.SetName("Reinforced Furnace").SetActive(false).AddEffect(ReinforcedFurnace_Effect).SetType(1 /* Crafted */).SetRecipe(ReinforcedFurnace_Recipe).SetRequires(FurnaceUnlock));
        upgrades.RegisterItem(EnchantedCauldron = EnchantedCauldron.SetName("Bubblier Cauldron").SetActive(false).SetType(1 /* Crafted */).AddEffect(EnchantedCauldron_Effect).SetRecipe(EnchantedCauldron_Recipe).SetRequires(LargerCauldron));
        upgrades.RegisterItem(HotterFurnace = HotterFurnace.SetName("Hotter Furnace").SetActive(false).AddEffect(HotterFurnace_Effect).SetType(1 /* Crafted */).SetRecipe(HotterFurnace_Recipe).SetRequires(ReinforcedFurnace));
        upgrades.RegisterItem(Witch = Witch.SetName("Witch").SetActive(false).SetType(0 /* Purchased */).SetPrice(50000000).SetStoreCategory(3 /* Processing */).AddEffect(Witch_Effect).SetRequires(CauldronUnlock));
        upgrades.RegisterItem(Blacksmith = Blacksmith.SetName("Blacksmith").SetActive(false).SetType(0 /* Purchased */).SetPrice(10000000).SetStoreCategory(3 /* Processing */).AddEffect(Blacksmith_Effect).SetRequires(FurnaceUnlock));
        upgrades.RegisterItem(OilBaron = OilBaron.SetName("Oil Baron").SetActive(false).SetType(0 /* Purchased */).SetPrice(2500000).SetStoreCategory(2 /* Gatherering */).AddEffect(Oilbaron_Effect));
    };

    Data.prototype.InitializeProcessorSystem = function (processors) {
        processors.Reset();

        processors.RegisterItem(Furnace = Furnace.SetName("Furnace").Reset().AddRecipe(Bronze_bar_processor_recipe).AddRecipe(Iron_bar_processor_recipe).AddRecipe(Silver_bar_processor_recipe).AddRecipe(Gold_bar_processor_recipe).AddRecipe(Titanium_bar_processor_recipe));
        processors.RegisterItem(Cauldron = Cauldron.SetName("Cauldron").Reset().AddRecipe(Smelting_Potion_processor_recipe).AddRecipe(Clicking_Potion_processor_recipe).AddRecipe(Charming_Potion_processor_recipe).AddRecipe(Alchemy_Potion_processor_recipe).SetCapacity(1));
    };

    Data.prototype.InitializeBuffSystem = function (buffs) {
        buffs.Reset();

        buffs.RegisterItem(SpeechPotionBuff = SpeechPotionBuff.SetDuration(30).SetItem(Charming_Potion).SetUpgrade(SpeechPotionUpgrade).SetRemaining(0));
        buffs.RegisterItem(ClickingPotionBuff = ClickingPotionBuff.SetDuration(60).SetItem(Clicking_Potion).SetUpgrade(ClickingPotionUpgrade).SetRemaining(0));
        buffs.RegisterItem(AlchemyPotionBuff = AlchemyPotionBuff.SetDuration(90).SetItem(Alchemy_Potion).SetUpgrade(AlchemyPotionUpgrade).SetRemaining(0));
        buffs.RegisterItem(SmeltingPotionBuff = SmeltingPotionBuff.SetDuration(300).SetItem(Smelting_Potion).SetUpgrade(SmeltingPotionUpgrade).SetRemaining(0));
    };

    Data.prototype.InitializeStatisticSystem = function (stats) {
        stats.Reset();

        stats.RegisterItem(StatVersionNumber = StatVersionNumber.SetName("Version").SetValue(0));
        stats.RegisterItem(StatRockClicked = StatRockClicked.SetName("Manual clicks").SetValue(0));
    };

    Data.prototype.InitializeAchievementSystem = function (achievements) {
        achievements.Reset();

        achievements.RegisterItem(AchMoney1 = AchMoney1.SetName("New Money").SetCondition(new AchievementAlltime(Item[1] = [Coins], 10000)).SetCompleted(false));
        achievements.RegisterItem(AchMoney2 = AchMoney2.SetName("Millionaire").SetCondition(new AchievementAlltime(Item[1] = [Coins], 1000000)).SetRequires(AchMoney1).SetCompleted(false));
        achievements.RegisterItem(AchMoney3 = AchMoney3.SetName("Billionaire").SetCondition(new AchievementAlltime(Item[1] = [Coins], 1000000000)).SetRequires(AchMoney2).SetCompleted(false));
        achievements.RegisterItem(AchMiner1 = AchMiner1.SetName("Miner").SetCondition(new AchievementStatistic(StatRockClicked, 100)).SetCompleted(false));
        achievements.RegisterItem(AchMiner2 = AchMiner2.SetName("Carpal Tunnel").SetCondition(new AchievementStatistic(StatRockClicked, 1000)).SetRequires(AchMiner1).SetCompleted(false));
        achievements.RegisterItem(AchMiner3 = AchMiner3.SetName("Black Lung").SetCondition(new AchievementStatistic(StatRockClicked, 10000)).SetRequires(AchMiner2).SetCompleted(false));
        achievements.RegisterItem(AchItemCatOre = AchItemCatOre.SetName("Geologist").SetCondition(new AchievementItemType(0 /* Ore */)).SetCompleted(false));
        achievements.RegisterItem(AchItemCatGem = AchItemCatGem.SetName("Gemologist").SetCondition(new AchievementItemType(1 /* Gem */)).SetCompleted(false));
        achievements.RegisterItem(AchItemCatCrafting = AchItemCatCrafting.SetName("Craftsman").SetCondition(new AchievementItemType(3 /* Crafting */)).SetCompleted(false));
        achievements.RegisterItem(AchItemCatIngredient = AchItemCatIngredient.SetName("Shaman").SetCondition(new AchievementItemType(2 /* Ingredient */)).SetCompleted(false));
        achievements.RegisterItem(AchItemCatPotion = AchItemCatPotion.SetName("Wizard").SetCondition(new AchievementItemType(4 /* Potion */)).SetCompleted(false));
    };

    Data.prototype.initializeData = function () {
        this.InitializeItemSystem(this.itemSystem);
        this.InitializeGathererSystem(this.gathererSystem);
        this.InitializeUpgradeSystem(this.upgradeSystem);
        this.InitializeProcessorSystem(this.processorSystem);
        this.InitializeBuffSystem(this.buffSystem);
        this.InitializeStatisticSystem(this.statisticSystem);
        this.InitializeAchievementSystem(this.achievementSystem);
    };

    Data.prototype.save = function () {
        var savedata;
        var itemsave = new Array();
        var configsave = new Array();
        var machinesave = new Array();
        var upgradesave = new Array();
        var processorsave = new Array();
        var buffsave = new Array();
        var statsave = new Array();
        var achsave = new Array();

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

        for (i = 0; i < this.gathererSystem.items.length; ++i) {
            machinesave.push(new GathererSave(this.gathererSystem.items[i].Quantity));
        }

        for (i = 0; i < this.upgradeSystem.items.length; ++i) {
            upgradesave.push(new UpgradeSave(this.upgradeSystem.items[i].Active));
        }

        for (i = 0; i < this.processorSystem.items.length; ++i) {
            var proc = this.processorSystem.items[i];
            processorsave.push(new ProcessorSave(proc.GetRecipeIndex(), proc.ActiveJobs, proc.ActiveProgress, proc.Progress));
        }

        for (i = 0; i < this.buffSystem.items.length; ++i) {
            buffsave.push(new BuffSave(this.buffSystem.items[i].RemainingTime));
        }

        for (i = 0; i < this.statisticSystem.items.length; ++i) {
            statsave.push(new StatisticSave(this.statisticSystem.items[i].Value));
        }

        for (i = 0; i < this.achievementSystem.items.length; ++i) {
            achsave.push(new AchievementSave(this.achievementSystem.items[i].Completed));
        }

        savedata = { Items: itemsave, Gatherers: machinesave, Upgrades: upgradesave, InventoryConfig: configsave, Processors: processorsave, Buffs: buffsave, Stats: statsave, Achievements: achsave };
        localStorage.setItem("save", LZString.compressToBase64(JSON.stringify(savedata)));
    };

    Data.prototype.load = function () {
        if (localStorage.getItem("save") !== null) {
            var loaddata;
            try  {
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
    };
    return Data;
})();

var ProcessorSave = (function () {
    function ProcessorSave(ar, aj, ap, p) {
        this.ActiveRecipeInt = ar;
        this.ActiveJobs = aj;
        this.ActiveProgress = ap;
        this.Progress = p;
    }
    return ProcessorSave;
})();

var BuffSave = (function () {
    function BuffSave(rt) {
        this.RemainingTime = rt;
    }
    return BuffSave;
})();

var InventoryConfigSave = (function () {
    function InventoryConfigSave(id, checked) {
        this.ID = id;
        this.Checked = checked;
    }
    return InventoryConfigSave;
})();

var ItemSave = (function () {
    function ItemSave(quantity, alltime) {
        this.Quantity = quantity;
        this.Alltime = alltime;
    }
    return ItemSave;
})();

var GathererSave = (function () {
    function GathererSave(quantity) {
        this.Quantity = quantity;
    }
    return GathererSave;
})();

var UpgradeSave = (function () {
    function UpgradeSave(active) {
        this.Active = active;
    }
    return UpgradeSave;
})();

var StatisticSave = (function () {
    function StatisticSave(v) {
        this.Value = v;
    }
    return StatisticSave;
})();

var AchievementSave = (function () {
    function AchievementSave(c) {
        this.Completed = c;
    }
    return AchievementSave;
})();
//# sourceMappingURL=Data.js.map
