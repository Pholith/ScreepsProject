"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreepContainer_1 = require("./CreepContainer");
const TUNINGS_1 = require("./TUNINGS");
class Upgrader extends CreepContainer_1.CreepContainer {
    findTarget() {
        return this.creep.room.controller;
    }
    action() {
        let target = this.getTarget();
        if (this.creep.room.controller.sign.text != TUNINGS_1.TUNINGS.SIGN_TEXT && this.creep.signController(target, TUNINGS_1.TUNINGS.SIGN_TEXT) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target, { maxRooms: 0 });
        }
        if (this.creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target, { maxRooms: 0 });
        }
    }
}
exports.Upgrader = Upgrader;
//# sourceMappingURL=Upgrader.js.map