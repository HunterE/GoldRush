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

        upper = document.createElement("span");
        if (this.headerId !== "" && this.headerId !== "undefined") {
            upper.setAttribute("id", this.headerId);
        }
        upper.setAttribute("class", "itemheader");
        upper.innerText = this.header;

        image = document.createElement("img");
        image.setAttribute("src", this.image);
        image.setAttribute("class", "itemimage");

        lower = document.createElement("span");
        if (this.footerId !== "" && this.footerId !== "undefined") {
            lower.setAttribute("id", this.footerId);
        }
        lower.setAttribute("class", "itemfooter");
        lower.innerText = this.footer;

        button.appendChild(upper);
        button.appendChild(image);
        button.appendChild(lower);

        return button;
    };
    return MenuBox;
})();
//# sourceMappingURL=UIHelper.js.map
