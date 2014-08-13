var MenuBox = (function () {
    function MenuBox() {
    }
    MenuBox.prototype.buildButton = function () {
        var button;
        var image;
        var upper;
        var lower;

        button = document.createElement("button");

        if (this.tooltip !== "" && this.tooltip !== "undefined") {
            button.setAttribute("title", this.tooltip);
        }
        if (this.color !== "" && this.color !== "undefined") {
            button.setAttribute("style", "background-color:" + this.color);
        }
        button.setAttribute("class", "item"); // Identify button for CSS.

        if (!this.header) {
            upper = this.headerElement;
        } else {
            upper = document.createElement("span");
            upper.textContent = this.header;
        }

        if (this.headerId !== "" && this.headerId !== "undefined") {
            upper.setAttribute("id", this.headerId);
        }
        upper.setAttribute("class", "itemheader");

        image = document.createElement("img");
        image.setAttribute("src", this.image);
        image.setAttribute("class", "itemimage");

        lower = document.createElement("span");
        if (this.footerId !== "" && this.footerId !== "undefined") {
            lower.setAttribute("id", this.footerId);
        }
        lower.setAttribute("class", "itemfooter");
        lower.textContent = this.footer;

        button.appendChild(upper);
        button.appendChild(image);
        button.appendChild(lower);

        return button;
    };
    return MenuBox;
})();

var ItemQuantityPair = (function () {
    function ItemQuantityPair(item, quantity) {
        this.totalCount = false;
        this.item = item;
        this.quantity = quantity;
    }
    ItemQuantityPair.prototype.addTotalCount = function () {
        this.totalCount = true;
        return this;
    };

    ItemQuantityPair.prototype.display = function (id) {
        var div;
        var span;
        var img;

        div = document.createElement("div");
        div.setAttribute("class", "itemquantitycontainer");
        span = document.createElement("span");
        span.setAttribute("id", id);
        span.setAttribute("class", "itemquantityvalue");
        img = document.createElement("img");
        img.setAttribute("src", "/Images/" + this.item.Name + ".png");
        img.setAttribute("class", "itemquantityimg");

        div.appendChild(img);
        div.appendChild(span);
        span.textContent = formatNumber(this.quantity) + ((this.totalCount) ? " (" + formatNumber(this.item.Quantity) + ")" : "");
        return div;
    };
    return ItemQuantityPair;
})();

var ItemStringPair = (function () {
    function ItemStringPair(item, txt) {
        this.item = item;
        this.txt = txt;
    }
    ItemStringPair.prototype.display = function (id) {
        var div;
        var span;
        var img;

        div = document.createElement("div");
        div.setAttribute("class", "itemtextcontainer");
        span = document.createElement("span");
        span.setAttribute("id", id);
        span.setAttribute("class", "itemtextvalue");
        img = document.createElement("img");
        img.setAttribute("src", "/Images/" + this.item.Name + ".png");
        img.setAttribute("class", "itemquantityimg");

        div.appendChild(img);
        div.appendChild(span);
        span.textContent = this.txt;
        return div;
    };
    return ItemStringPair;
})();

var ImgQuantityPair = (function () {
    function ImgQuantityPair(img, quantity) {
        this.img = img;
        this.quantity = quantity;
    }
    return ImgQuantityPair;
})();
//# sourceMappingURL=UIHelper.js.map
