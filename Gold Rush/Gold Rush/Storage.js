var SaveResources;

function newPlayer() {
    for (var i = 0; i < Resources.length; ++i) {
        console.log(Resources);
        SaveResources[i] = (new ResourceSaveData(Resources[i].Name, Resources[i].Quantity, Resources[i].Alltime));
    }
    savegame();
}

function load() {
    if (localStorage.getItem("save") !== null) {
        var loaddata = JSON.parse(localStorage.getItem("save"));
    } else {
        this.newPlayer();
    }
}

function savegame() {
    var savedata = { resources: this.SaveResources };
    localStorage.setItem("save", JSON.stringify(savedata));
}
//# sourceMappingURL=Storage.js.map
