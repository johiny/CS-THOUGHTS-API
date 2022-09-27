"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class coolDownService {
    constructor() {
        this.ipList = {};
        this.coolDownTime = 360000;
    }
    addToIpList(ip, thoughtId, feeling) {
        if (!this.ipList[ip]) {
            this.ipList[ip] = {};
        }
        if (this.ipList[ip][feeling]) {
            this.ipList[ip][feeling].push(thoughtId);
            setTimeout(() => {
                this.removeFromIpList(ip, thoughtId, feeling);
            }, this.coolDownTime);
        }
        else {
            this.ipList[ip][feeling] = [thoughtId];
            setTimeout(() => {
                this.removeFromIpList(ip, thoughtId, feeling);
            }, this.coolDownTime);
        }
    }
    removeFromIpList(ip, thoughtId, feeling) {
        this.ipList[ip][feeling] = this.ipList[ip][feeling].filter(id => !(id === thoughtId));
        for (const key in this.ipList[ip]) {
            if (this.ipList[ip][key].length === 0) {
                delete this.ipList[ip][key];
            }
        }
        if (Object.keys(this.ipList[ip]).length === 0) {
            delete this.ipList[ip];
        }
    }
    verifyCoolDown(ip, thoughtId, feeling) {
        var _a;
        if (this.ipList[ip]) {
            let coolDown = false;
            (_a = this.ipList[ip][feeling]) === null || _a === void 0 ? void 0 : _a.forEach((id) => {
                if (id === thoughtId) {
                    coolDown = true;
                }
            });
            return coolDown;
        }
        else {
            return false;
        }
    }
}
exports.default = coolDownService;
//# sourceMappingURL=coolDownService.js.map