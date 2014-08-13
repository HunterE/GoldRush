class StatisticsUI {
    constructor(items: ItemSystem) {
        this.itemSystem = items;
        this.Draw();
    }

    private headers: string[] = [ "Alltime collected", "Item"];
    private headerWidths: string[] = ["85%", "15%"];

    itemSystem: ItemSystem;

    Draw() {
        var itemStatsPanel: HTMLElement = document.createElement("div");
        itemStatsPanel.style.width = "45%";
        itemStatsPanel.style.margin = "2%";
        itemStatsPanel.appendChild(this.DrawItemStatsTable());

        document.getElementById("tabs-Statistics").appendChild(itemStatsPanel);
    }

    DrawItemStatsHeader() {
        var achievementtable: HTMLTableElement = document.createElement("table");
        achievementtable.setAttribute("class", "processortable");

        var header = <HTMLTableElement>achievementtable.createTHead();
        var titleRow = <HTMLTableRowElement>header.insertRow(0);
        var titleCell = titleRow.insertCell(0);
        titleRow.style.height = "35px";
        titleCell.textContent = "Statistics";
        titleCell.setAttribute("colspan", this.headers.length.toString());
        header.style.height = "35px";

        var descriptions = <HTMLTableRowElement>header.insertRow(1);
        descriptions.style.height = "35px";
        for (var i = 0; i < this.headers.length; ++i) {
            var cell = descriptions.insertCell(0);
            cell.style.width = this.headerWidths[i];
            cell.textContent = this.headers[i];

        }

        return achievementtable;
    }

    DrawItemStatsTable() {
        var achievementtable: HTMLTableElement = this.DrawItemStatsHeader();
        var body: HTMLTableElement = <HTMLTableElement>achievementtable.createTBody();

        for (var i = 0; i < this.itemSystem.items.length; ++i) {
            var item = this.itemSystem.items[i];

            var row = <HTMLTableRowElement>body.insertRow(body.rows.length);
            var quantity = row.insertCell(0);
            var itemcell = row.insertCell(0);
            quantity.setAttribute("id", "statsitemalltime" + i);
            itemcell.setAttribute("title", item.Name);

            var itemimg = <HTMLImageElement>document.createElement("img");
            itemimg.src = "/Images/" + item.Name + ".png";
            itemimg.style.width = "15px";
            itemimg.style.height = "15px";
            itemcell.appendChild(itemimg);
            quantity.textContent = item.Alltime.toString();
        }

        return achievementtable;
    }

    Update() {
        this.UpdateItemStatsTable();
    }

    UpdateItemStatsTable() {
        for (var i = 0; i < this.itemSystem.items.length; ++i) {
            document.getElementById("statsitemalltime" + i).textContent = formatNumber(this.itemSystem.items[i].Alltime);
        }
    }
} 