var BuffManager = (function () {
    function BuffManager() {
        this.Buffs = new Array();
    }
    BuffManager.prototype.activateBuff = function (buff) {
        buff.StartBuff();
        this.Buffs.push(buff);
    };
    BuffManager.prototype.deactivateBuff = function (buff) {
        buff.StopBuff();
        for (var b = 0; b < this.Buffs.length; ++b) {
            if (this.Buffs[b]) {
                this.Buffs.splice(b, 1);
            }
        }
    };
    BuffManager.prototype.tick = function () {
        for (var b = 0; b < this.Buffs.length; ++b) {
            this.Buffs[b].Duration--;
            if (this.Buffs[b].Duration <= 0 && this.Buffs[b].Infinite !== true) {
                this.deactivateBuff(this.Buffs[b]);
            }
        }
    };
    return BuffManager;
})();
// This is unused.
// A buff should contain both activation and deactivation logic. Unless the buff is infinite i.e. Division buffs.
var Buff = (function () {
    function Buff(name, duration) {
        this.Name = name;
        this.Duration = duration;
        if (duration < 0) {
            this.Infinite = true;
        } else {
            this.Infinite = false;
        }
    }
    Buff.prototype.StartBuff = function () {
    };
    Buff.prototype.StopBuff = function () {
    };
    return Buff;
})();
//# sourceMappingURL=Buffs.js.map
