var StoreCategory;
(function (StoreCategory) {
    StoreCategory[StoreCategory["Mining"] = 0] = "Mining";
    StoreCategory[StoreCategory["Machines"] = 1] = "Machines";
    StoreCategory[StoreCategory["Gatherering"] = 2] = "Gatherering";
    StoreCategory[StoreCategory["Processing"] = 3] = "Processing";
    StoreCategory[StoreCategory["Items"] = 4] = "Items";
})(StoreCategory || (StoreCategory = {}));

var StoreUI = (function () {
    function StoreUI(upgrades, gatherers, items) {
        this.items = new Array();
        this.upgradeSystem = upgrades;
        this.gathererSystem = gatherers;
        this.itemSystem = items;

        this.drawStore();
    }
    StoreUI.prototype.drawStore = function () {
        var storePanel = document.createElement("div");

        for (var cat in StoreCategory) {
            if (typeof StoreCategory[cat] === 'number') {
                storePanel.appendChild(this.drawStoreCategory(cat));
            }
        }

        storePanel.setAttribute("class", "storecontainer");
        document.getElementById("tabs-3").appendChild(storePanel);
    };

    StoreUI.prototype.drawStoreCategory = function (scname) {
        var catPanel = document.createElement("div");
        var catHeader = document.createElement("div");
        catPanel.setAttribute("class", "storecategory");
        catHeader.setAttribute("class", "storecategoryheader");
        catHeader.textContent = scname;

        catPanel.appendChild(catHeader);

        for (var upgrade in this.upgradeSystem.items) {
            if (this.upgradeSystem.items[upgrade].StoreCategory === StoreCategory[scname]) {
                catPanel.appendChild(this.drawStoreItem(this.upgradeSystem, upgrade, "Upgrade"));
            }
        }

        for (var gatherer in this.gathererSystem.items) {
            if (this.gathererSystem.items[gatherer].StoreCategory === StoreCategory[scname]) {
                catPanel.appendChild(this.drawStoreItem(this.gathererSystem, gatherer, "Gatherer"));
            }
        }

        for (var item in this.itemSystem.items) {
            var i = this.itemSystem.items[item];
            if (i.StoreCategory === StoreCategory[scname]) {
                this.items.push(i);
                catPanel.appendChild(this.drawStoreItem(this.itemSystem, item, "Item"));
            }
        }

        return catPanel;
    };

    StoreUI.prototype.drawStoreItem = function (a, id, gu) {
        var storeItemContainer = document.createElement("div");
        var storeItemHeader = document.createElement("div");
        var storeItemFooter = document.createElement("div");

        var storeItemButton = document.createElement("input");
        var storeItemPrice = new ItemQuantityPair(Coins, a.items[id].GetPrice()).display(gu + "cost" + id.toString());

        storeItemContainer.setAttribute("id", gu + "item" + id.toString());
        storeItemContainer.setAttribute("class", "storeitemcontainer");

        storeItemHeader.setAttribute("class", "storeitemheader");
        storeItemHeader.setAttribute("id", gu + "itemheader" + id);
        storeItemHeader.textContent = a.items[id].Name;
        storeItemFooter.setAttribute("class", "storeitemfooter");

        storeItemButton.setAttribute("type", "button");
        storeItemButton.setAttribute("value", "Buy");
        if (gu === "Gatherer") {
            storeItemButton.addEventListener("click", function () {
                game.gathererSystem.Purchase(id);
                game.storeUI.updateStore();
            }, false);
        }
        if (gu === "Upgrade") {
            storeItemContainer.setAttribute("title", this.upgradeSystem.items[id].GetTooltip());

            storeItemButton.addEventListener("click", function () {
                game.upgradeSystem.Purchase(id);
                game.storeUI.updateStore();
            }, false);
        }

        //var storeItemPrice: HTMLElement = new ItemQuantityPair(Coins, a.items[id].GetPrice()).display(gu+"cost"+ id.toString());
        if (gu === "Item") {
            this.items.push(this.itemSystem.items[id]);
            var quantitySelector = document.createElement("input");
            quantitySelector.setAttribute("type", "text");
            quantitySelector.setAttribute("id", "itemquantityselector" + id);
            quantitySelector.style.width = "35px";

            quantitySelector.onkeyup = function (event) {
                var element = (event.target);
                var quantity = +element.value;
                var item = game.itemSystem.items[element.id.replace("itemquantityselector", "")];

                if (!isNaN(quantity)) {
                    var price = document.getElementById("Itemcost" + item.ID);
                    price.textContent = formatNumber(quantity * item.Price);
                }
            };

            storeItemButton.addEventListener("click", function (event) {
                var element = document.getElementById("itemquantityselector" + id);
                var quantity = +element.value;

                if (isNaN(quantity)) {
                    quantity = 0;
                }

                if (game.itemSystem.items[id].Price * quantity <= Coins.Quantity) {
                    game.inventory.addManyItems(id, quantity);
                    game.inventory.deductFunds(game.itemSystem.items[id].Price * quantity);
                }
            });

            storeItemFooter.appendChild(quantitySelector);
        }

        storeItemFooter.appendChild(storeItemButton);
        storeItemFooter.appendChild(storeItemPrice);

        storeItemContainer.appendChild(storeItemHeader);
        storeItemContainer.appendChild(storeItemFooter);
        return storeItemContainer;
    };

    StoreUI.prototype.updateStore = function () {
        for (var upgrade in this.upgradeSystem.items) {
            var itemContainer = document.getElementById("Upgradeitem" + upgrade);
            var item = this.upgradeSystem.items[upgrade];

            if (item.Type === 0 /* Purchased */) {
                if (item.Active) {
                    itemContainer.style.display = 'none';
                } else if (item.Requires) {
                    if (item.Requires.Active) {
                        itemContainer.style.display = 'inline-block';
                    } else {
                        itemContainer.style.display = 'none';
                    }
                } else {
                    itemContainer.style.display = 'inline-block';
                }
            }
        }

        for (var gatherer in this.gathererSystem.items) {
            var itemContainerG = document.getElementById("Gathereritem" + gatherer);
            var gathererCost = document.getElementById("Gatherercost" + gatherer);
            var itemG = this.gathererSystem.items[gatherer];

            var itemHeader = document.getElementById("Gathereritemheader" + gatherer);
            itemHeader.textContent = itemG.Name + " (" + itemG.Quantity + "/" + itemG.MaxOwned + ")";

            if (itemG.Quantity < itemG.MaxOwned) {
                itemContainerG.style.display = 'inline-block';
            } else {
                itemContainerG.style.display = 'none';
            }

            gathererCost.textContent = formatNumber(itemG.GetPrice());
        }
    };
    return StoreUI;
})();
//# sourceMappingURL=StoreUI.js.map
