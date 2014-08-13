class MenuBox {
    color: string;
    tooltip: string;
    header: string;
    headerId: string;
    footer: string;
    footerId: string;
    image: string;
    headerElement: HTMLElement;

    constructor() {

    }

    buildButton() {
        var button: HTMLElement;
        var image: HTMLElement;
        var upper: HTMLElement;
        var lower: HTMLElement;

        button = document.createElement("button");


        if (this.tooltip !== "" && this.tooltip !== "undefined") { // If a tooltip is provided assign it.
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
    }
}

class ItemQuantityPair {
    item: Item;
    quantity: number;
    totalCount: boolean = false;
    
    constructor(item: Item, quantity: number) {
        this.item = item;
        this.quantity = quantity;
    }

    addTotalCount(): ItemQuantityPair {
        this.totalCount = true;
        return this;
    }

    display(id: string): HTMLElement {
        var div: HTMLElement;
        var span: HTMLElement;
        var img: HTMLElement;

        div = document.createElement("div");
        div.setAttribute("class", "itemquantitycontainer");
        span = document.createElement("span");
        span.setAttribute("id", id);
        span.setAttribute("class", "itemquantityvalue");
        img = document.createElement("img");
        img.setAttribute("src","/Images/" + this.item.Name + ".png");
        img.setAttribute("class", "itemquantityimg");

        div.appendChild(img);
        div.appendChild(span);
        span.textContent = formatNumber(this.quantity)+((this.totalCount)?" ("+formatNumber(this.item.Quantity)+")":"");
        return div;
    }
}

class ItemStringPair {
    item: Item;
    txt: string;

    constructor(item: Item, txt: string) {
        this.item = item;
        this.txt = txt;
    }


    display(id: string): HTMLElement {
        var div: HTMLElement;
        var span: HTMLElement;
        var img: HTMLElement;

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
    }
}

class ImgQuantityPair {
    img: string;
    quantity: number;

    constructor(img: string, quantity: number) {
        this.img = img;
        this.quantity = quantity;
    }
}