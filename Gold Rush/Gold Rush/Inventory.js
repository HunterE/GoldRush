var Inventory = (function () {
    function Inventory(items) {
        this.itemSystem = items;
    }
    Inventory.prototype.sellAll = function () {
        for (var i = 0; i < this.itemSystem.items.length; ++i) {
            if (this.itemSystem.items[i].DisplayInInventory) {
                if (game.inventoryUI.itemSellIsChecked(this.itemSystem.items[i].ID.toString())) {
                    this.sellItem(this.itemSystem.items[i].ID, this.itemSystem.items[i].Quantity);
                }
            }
        }
        game.inventoryUI.updateInventory();
    };

    Inventory.prototype.consumePotion = function () {
        for (var i = 0; i < game.buffSystem.items.length; ++i) {
            var buff = game.buffSystem.items[i];
            if (this.selectedItem === buff.Item) {
                if (this.selectedItem.Quantity > 0 && !buff.Active) {
                    buff.Activate();
                    this.selectedItem.Quantity--;
                }
            }
        }
    };

    Inventory.prototype.addItem = function (id) {
        this.itemSystem.LookupItem(id).Quantity++;
        this.itemSystem.LookupItem(id).Alltime++;
    };

    Inventory.prototype.addManyItems = function (id, quantity) {
        this.itemSystem.LookupItem(id).Quantity += quantity;
        this.itemSystem.LookupItem(id).Alltime += quantity;
    };

    Inventory.prototype.addItemQuantity = function (id, quantity) {
        for (var i = 0; i < quantity; i++) {
            this.addItem(id);
        }
    };

    Inventory.prototype.deductFunds = function (ammount) {
        if (ammount <= Coins.Quantity) {
            Coins.Quantity -= ammount;
            return true;
        }
        return false;
    };

    Inventory.prototype.toggleBoxes = function (event) {
        var checkboxes = document.getElementsByName(event.target.name);

        for (var i in checkboxes) {
            checkboxes[i].checked = event.target.checked;
        }
    };

    Inventory.prototype.selectItem = function (e) {
        var element = e.target;
        if (element.parentElement !== document.getElementById("inventory")) {
            element = element.parentElement;
        }
        if (element.parentElement !== document.getElementById("inventory")) {
            element = element.parentElement;
        }
        this.selectedItem = this.itemSystem.LookupItem(element.id.replace("item", ""));
        game.inventoryUI.updateHeader();
    };

    Inventory.prototype.sellItem = function (id, quantity) {
        var item = this.itemSystem.LookupItem(id);
        if (isNaN(quantity)) {
            quantity = 0;
        }

        if (item.Quantity < quantity) {
            quantity = item.Quantity;
        }
        item.Quantity -= quantity;
        Coins.Quantity += (quantity * item.GetValue());
        Coins.Alltime += (quantity * item.GetValue());
    };
    return Inventory;
})();
//# sourceMappingURL=Inventory.js.map
