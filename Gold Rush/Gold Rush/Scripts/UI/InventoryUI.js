﻿var InventoryUI = (function () {
    function InventoryUI(inv, buffs) {
        this.savedDisplayConfig = new Array();
        this.sortedItems = new Array();
        this.displayConfig = false;
        this.itemSystem = inv.itemSystem;
        this.inventory = inv;
        this.buffSystem = buffs;

        this.drawInventory();
        this.updateInventory();
    }
    InventoryUI.prototype.itemSellIsChecked = function (id) {
        var check;
        check = document.getElementById("configchecker" + id);
        if (check.checked) {
            return true;
        }
        return false;
    };

    InventoryUI.prototype.sortItems = function () {
        this.sortedItems = this.sortedItems.concat(this.itemSystem.items);

        this.sortedItems.sort(function (a, b) {
            if (a.Type < b.Type) {
                return -1;
            }
            if (a.Type > b.Type) {
                return 1;
            }
            if (a.Value < b.Value) {
                return -1;
            }
            if (a.Value > b.Value) {
                return 1;
            }
            return 0;
        });
    };

    InventoryUI.prototype.drawInventory = function () {
        while (document.getElementById("tabs-1").firstChild) {
            document.getElementById("tabs-1").removeChild(document.getElementById("tabs-1").firstChild);
        }

        this.drawSidebar();
        this.drawHeader();
        this.drawSellAll();

        var d = document.createElement("div");
        d.setAttribute("class", "inventory");
        d.setAttribute("id", "inventory");

        var configPane = document.createElement("div");
        configPane.setAttribute("class", "configpanel");
        configPane.setAttribute("id", "configpanel");

        d.appendChild(configPane);
        document.getElementById("tabs-1").appendChild(d);

        this.sortItems();

        for (var i = 0; i < this.sortedItems.length; ++i) {
            var b;
            var a = this.sortedItems[i];
            b = new MenuBox();

            b.headerElement = new ItemQuantityPair(Coins, a.Value).display(a.Name + "header");
            b.tooltip = a.Name;
            b.footer = formatNumber(a.Quantity);
            b.footerId = a.Name + "footer";
            b.image = "/Images/" + a.Name + ".png";
            b.color = ItemColor[a.Rarity];

            var e = b.buildButton();
            e.setAttribute("id", "item" + a.ID.toString());

            e.addEventListener("click", function (event) {
                game.inventory.selectItem(event);
                game.inventoryUI.updateInventory();
            }, false);

            d.appendChild(e);
        }

        this.drawConfigPanel();
    };

    InventoryUI.prototype.drawConfigPanel = function () {
        var conf;
        var table;
        var names = ["Potion", "Crafting", "Ingredient", "Gem", "Ore"];

        table = document.createElement("table");
        conf = document.getElementById("configpanel");
        table.setAttribute("id", "configtable");
        table.setAttribute("class", "configtable");
        conf.appendChild(table);

        table = document.getElementById("configtable");
        var header = table.createTHead();
        var row = header.insertRow(0);

        for (var i = 0; i < names.length; ++i) {
            var cell = row.insertCell(0);
            cell.setAttribute("class", "configtableitem");
            cell.textContent = names[i];
            var cellcheck = row.insertCell(0);
            cellcheck.setAttribute("class", "configtablecheck");
            var cellchecker = document.createElement("input");
            cellchecker.setAttribute("type", "checkbox");
            cellchecker.setAttribute("name", "configselect" + ItemType[names.length - 1 - i]);

            cellchecker.addEventListener("change", function (event) {
                game.inventory.toggleBoxes(event);
            }, false);
            cellcheck.appendChild(cellchecker);
        }

        var potion = new Array();
        var craftings = new Array();
        var ingredient = new Array();
        var gem = new Array();
        var ore = new Array();
        var longestlist = 0;

        for (var x = 0; x < this.itemSystem.items.length; ++x) {
            var item = this.itemSystem.items[x];

            switch (item.Type) {
                case 4 /* Potion */:
                    potion.push(item);
                    if (potion.length > longestlist) {
                        longestlist = potion.length;
                    }
                    break;
                case 3 /* Crafting */:
                    craftings.push(item);
                    if (craftings.length > longestlist) {
                        longestlist = craftings.length;
                    }
                    break;
                case 2 /* Ingredient */:
                    ingredient.push(item);
                    if (ingredient.length > longestlist) {
                        longestlist = ingredient.length;
                    }
                    break;
                case 1 /* Gem */:
                    gem.push(item);
                    if (gem.length > longestlist) {
                        longestlist = gem.length;
                    }
                    break;
                case 0 /* Ore */:
                    ore.push(item);
                    if (ore.length > longestlist) {
                        longestlist = ore.length;
                    }
                    break;
            }
        }

        var body = table.createTBody();

        for (var y = 0; y < longestlist; ++y) {
            row = body.insertRow();

            this.drawConfigHelper(potion, cell, cellcheck, cellchecker, row, y);
            this.drawConfigHelper(craftings, cell, cellcheck, cellchecker, row, y);
            this.drawConfigHelper(ingredient, cell, cellcheck, cellchecker, row, y);
            this.drawConfigHelper(gem, cell, cellcheck, cellchecker, row, y);
            this.drawConfigHelper(ore, cell, cellcheck, cellchecker, row, y);
        }
    };

    InventoryUI.prototype.drawConfigHelper = function (generics, cell, cellcheck, cellchecker, row, y) {
        cell = row.insertCell(0);
        cellcheck = row.insertCell(0);
        cellchecker = document.createElement("input");
        cellchecker.setAttribute("type", "checkbox");
        if (y <= generics.length - 1) {
            cell.setAttribute("class", "configtableitem");
            cell.setAttribute("id", "configitem" + generics[y].ID.toString());
            cell.appendChild(new ItemStringPair(generics[y], generics[y].Name.toString()).display("configcontent" + generics[y].ID.toString()));
            cellcheck.setAttribute("class", "configtablecheck");
            cellcheck.setAttribute("id", "configcheck" + generics[y].ID.toString());
            cellchecker.setAttribute("id", "configchecker" + generics[y].ID.toString());
            cellchecker.setAttribute("name", "configselect" + ItemType[generics[0].Type]);
            for (var x = 0; x < data.invconfigsave.length; ++x) {
                if (data.invconfigsave[x].ID === generics[y].ID) {
                    if (data.invconfigsave[x].Checked) {
                        cellchecker.setAttribute("checked", "true");
                    }
                }
            }
            cellcheck.appendChild(cellchecker);
        } else {
            cell.setAttribute("class", "configtableitemempty");
            cellcheck.setAttribute("class", "configtablecheckempty");
        }
    };

    InventoryUI.prototype.updateConfigPanel = function () {
        var cell;
        var cellchecker;
        var cellcontent;

        for (var x = 0; x < this.itemSystem.items.length; ++x) {
            var item = this.itemSystem.items[x];
            if (item.DisplayInInventory) {
                cell = document.getElementById("configitem" + item.ID);
                cellcontent = document.getElementById("configcontent" + item.ID);
                cellchecker = document.getElementById("configchecker" + item.ID);

                if (item.Alltime !== 0) {
                    cell.firstChild.firstChild.src = "/Images/" + item.Name + ".png";
                    cellchecker.style.visibility = 'visible';
                    cellcontent.textContent = item.Name;
                } else {
                    cell.firstChild.firstChild.src = "/Images/Unknown.png";
                    cellchecker.style.visibility = 'hidden';
                    cellcontent.textContent = "Not discovered";
                }
            }
        }
    };

    InventoryUI.prototype.updateInventory = function () {
        this.updateSidebar();
        this.updateHeader();
        this.updateConfigPanel();

        for (var i = 0; i < this.sortedItems.length; ++i) {
            var button;
            var el;
            var a = this.itemSystem.LookupItem(this.sortedItems[i].ID);

            button = document.getElementById("item" + a.ID.toString());

            el = document.getElementById(a.Name + "footer");
            el.textContent = formatNumber(a.Quantity);

            el = document.getElementById(a.Name + "header"); // To account for price buffs.
            el.textContent = formatNumber(a.GetValue());

            if (a.DisplayInInventory) {
                if (a.Quantity === 0) {
                    button.style.display = 'none';
                } else {
                    button.style.display = 'inline';
                }
            } else {
                button.style.display = 'none';
            }
        }
    };

    InventoryUI.prototype.updateHeader = function () {
        var panel;
        var disp;
        var drink;
        var img;

        panel = document.getElementById("configpanel");
        drink = document.getElementById("drinkoption");
        disp = document.getElementById("selecteditem");
        img = document.getElementById("selecteditemimg");

        if (this.displayConfig) {
            panel.style.display = 'block';
        } else {
            panel.style.display = 'none';
        }

        if (!this.inventory.selectedItem) {
            disp.style.display = 'none';
        } else {
            disp.style.display = 'block';

            //disp.innerText = this.inventory.selectedItem.Name;
            img.setAttribute("src", "/Images/" + this.inventory.selectedItem.Name + ".png");
            if (this.inventory.selectedItem.Type === 4 /* Potion */) {
                drink.style.display = 'inline';
            } else {
                drink.style.display = 'none';
            }
        }
    };

    InventoryUI.prototype.updateSidebar = function () {
        var coins = document.getElementById("sidebarcoins");
        coins.textContent = formatNumber(Coins.Quantity);
        var oil = document.getElementById("sidebaroil");
        oil.textContent = formatNumber(Oil.Quantity);

        var anybuffs = false;

        for (var i = 0; i < this.buffSystem.items.length; ++i) {
            var buff = this.buffSystem.items[i];
            var cont = document.getElementById("buffcont" + buff.ID);
            var timer = document.getElementById("bufftimer" + buff.ID);
            timer.textContent = "(" + Math.floor(buff.RemainingTime / 60) + ":" + ((buff.RemainingTime % 60 < 10) ? "0" : "") + buff.RemainingTime % 60 + ")";

            if (buff.RemainingTime === 0) {
                cont.style.display = "none";
            } else {
                cont.style.display = "inline-block";
                anybuffs = true;
            }

            if (anybuffs) {
                document.getElementById("buffscontainer").style.display = "block";
            } else {
                document.getElementById("buffscontainer").style.display = "none";
            }
        }
    };

    InventoryUI.prototype.drawSidebar = function () {
        var s = document.getElementById("sidebar");
        var sidebar = document.createElement("div");
        sidebar.setAttribute("class", "sidebarinventory");
        sidebar.setAttribute("id", "sidebarinventory");
        var br = document.createElement("br");

        // Items.
        s.appendChild(sidebar);
        sidebar.appendChild(br);
        sidebar.appendChild(new ItemQuantityPair(Coins, Coins.Quantity).display("sidebarcoins"));
        sidebar.appendChild(new ItemQuantityPair(Oil, Oil.Quantity).display("sidebaroil"));

        // Buffs.
        var buffcontainer = document.createElement("div");
        buffcontainer.setAttribute("class", "sidebarinventory");
        buffcontainer.id = "buffscontainer";
        buffcontainer.style.textAlign = "center";
        buffcontainer.style.verticalAlign = "top";
        buffcontainer.style.display = "block";
        var buffcontheader = document.createElement("div");
        buffcontheader.textContent = "Buffs";
        buffcontainer.appendChild(buffcontheader);
        sidebar.appendChild(buffcontainer);
        for (var i = 0; i < this.buffSystem.items.length; ++i) {
            var buff = this.buffSystem.items[i];
            var buffElement = document.createElement("div");
            buffElement.style.display = "inline-block";
            buffElement.style.width = "45%";
            buffElement.style.margin = "2%";
            buffElement.style.height = "100px";
            buffElement.style.border = "solid 1px";
            buffElement.style.textAlign = "center";
            buffElement.title = buff.Upgrade.GetTooltip();
            buffElement.style.position = "relative";
            buffElement.id = "buffcont" + buff.ID;
            var buffHeader = document.createElement("span");
            buffHeader.style.position = "absolute";
            buffHeader.style.top = "0";
            buffHeader.style.right = "0";
            buffHeader.style.width = "100%";
            buffHeader.textContent = buff.Upgrade.Name;
            var buffImage = document.createElement("img");
            buffImage.src = "/Images/" + buff.Item.Name + ".png";
            buffImage.style.width = "45%";
            buffImage.style.height = "45%";
            buffImage.style.marginTop = "35%";
            var buffTimer = document.createElement("span");
            buffTimer.style.position = "absolute";
            buffTimer.style.bottom = "0";
            buffTimer.style.right = "0";
            buffTimer.style.width = "100%";
            buffTimer.id = "bufftimer" + buff.ID;

            buffElement.appendChild(buffTimer);
            buffElement.appendChild(buffImage);
            buffElement.appendChild(buffHeader);
            buffcontainer.appendChild(buffElement);
        }
        document.getElementById("rock").addEventListener("click", function () {
            Player.Mine();
            StatRockClicked.Value++;
            game.inventoryUI.updateInventory();
        }, false);
    };

    InventoryUI.prototype.drawSellAll = function () {
        var d = document.createElement("div");
        var sellAll = document.createElement("input");
        var configOption = document.createElement("input");
        var br = document.createElement("br");

        d.setAttribute("class", "sellallitems");

        sellAll.setAttribute("type", "button");
        sellAll.setAttribute("value", "Sell all items");
        sellAll.addEventListener("click", function (event) {
            game.inventory.sellAll();
        }, false);

        configOption.setAttribute("type", "button");
        configOption.setAttribute("value", "...");
        configOption.addEventListener("click", function (event) {
            game.inventoryUI.displayConfig = !game.inventoryUI.displayConfig;
            game.inventoryUI.updateInventory();
        }, false);

        d.appendChild(sellAll);
        d.appendChild(configOption);

        document.getElementById("tabs-1").appendChild(d);
        document.getElementById("tabs-1").appendChild(br);
    };

    InventoryUI.prototype.drawHeader = function () {
        var d = document.createElement("div");
        var br = document.createElement("br");
        var image = document.createElement("img");
        var quantity = document.createElement("input");
        var text = document.createElement("span");
        var sell = document.createElement("input");
        var drink = document.createElement("input");
        var sellAll = document.createElement("input");

        d.setAttribute("class", "inventoryheader");
        d.setAttribute("id", "selecteditem");

        image.setAttribute("class", "inventoryheaderimg");
        image.setAttribute("id", "selecteditemimg");

        quantity.setAttribute("type", "text");
        quantity.setAttribute("class", "inventoryheadercontrols");
        quantity.setAttribute("id", "itemquantity");

        sell.setAttribute("type", "button");
        sell.setAttribute("value", "Sell");
        sell.setAttribute("class", "inventoryheadercontrols");
        sell.addEventListener("click", function (event) {
            game.inventory.sellItem(game.inventory.selectedItem.ID, +document.getElementById("itemquantity").value);
            game.inventoryUI.updateInventory();
        }, false);

        drink.setAttribute("type", "button");
        drink.setAttribute("value", "Drink");
        drink.setAttribute("class", "inventoryheadercontrols");
        drink.setAttribute("id", "drinkoption");
        drink.addEventListener("click", function (event) {
            game.inventory.consumePotion();
        }, false);

        sellAll.setAttribute("type", "button");
        sellAll.setAttribute("value", "Sell all");
        sellAll.setAttribute("class", "inventoryheadercontrols");
        sellAll.addEventListener("click", function (event) {
            game.inventory.sellItem(game.inventory.selectedItem.ID, game.inventory.selectedItem.Quantity);
            game.inventoryUI.updateInventory();
        }, false);

        d.appendChild(image);
        d.appendChild(text);
        d.appendChild(sellAll);
        d.appendChild(drink);
        d.appendChild(sell);
        d.appendChild(quantity);

        document.getElementById("tabs-1").appendChild(d);
        document.getElementById("tabs-1").appendChild(br);
    };
    return InventoryUI;
})();
//# sourceMappingURL=InventoryUI.js.map
