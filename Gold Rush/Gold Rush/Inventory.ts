class Inventory {
    constructor(items: ItemSystem) {
        this.itemSystem = items;
    }

    itemSystem: ItemSystem;
    selectedItem: Item;

    sellAll() {
        for (var i = 0; i < this.itemSystem.items.length; ++i) {
            if (this.itemSystem.items[i].DisplayInInventory) {
                if (game.inventoryUI.itemSellIsChecked(this.itemSystem.items[i].ID.toString())) {
                    this.sellItem(this.itemSystem.items[i].ID, this.itemSystem.items[i].Quantity);
                }
            }
        }
        game.inventoryUI.updateInventory();
    }

    consumePotion() {
        for (var i = 0; i < game.buffSystem.items.length; ++i) {
            var buff = game.buffSystem.items[i];
            if (this.selectedItem === buff.Item) {
                if (this.selectedItem.Quantity > 0 && !buff.Active) {
                    buff.Activate();
                    this.selectedItem.Quantity--;
                }
            }
        }
    }

    addItem(id: number) {
        this.itemSystem.LookupItem(id).Quantity++;
        this.itemSystem.LookupItem(id).Alltime++;
    }

    addManyItems(id: number, quantity: number) {
        this.itemSystem.LookupItem(id).Quantity += quantity;
        this.itemSystem.LookupItem(id).Alltime += quantity;
    }

    addItemQuantity(id: number, quantity: number) {
        for (var i = 0; i < quantity; i++) {
            this.addItem(id);
        }
    }

    deductFunds(ammount: number):boolean {
        if (ammount <= Coins.Quantity) {
            Coins.Quantity -= ammount;
            return true;
        }
        return false;
    }

    toggleBoxes(event) {
        var checkboxes = (<any[]><any>document.getElementsByName(event.target.name));

        for (var i in checkboxes) {
            checkboxes[i].checked = event.target.checked;
        }
    }

    selectItem(e) {
        var element = e.target;
        if (element.parentElement !== document.getElementById("inventory")) {
            element = element.parentElement;
        }
        if (element.parentElement !== document.getElementById("inventory")) {
            element = element.parentElement;
        }
        this.selectedItem = this.itemSystem.LookupItem(element.id.replace("item", ""));
        game.inventoryUI.updateHeader();
    }

    sellItem(id: number, quantity: number) {
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
    }
} 