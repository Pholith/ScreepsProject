import { CreepContainer } from "./CreepContainer";
import { TUNINGS } from "./TUNINGS";

export class Upgrader extends CreepContainer {
    protected findTarget(): RoomObject {
        return this.creep.room.controller;
    }

    protected action(): void {
        let target: StructureController = this.getTarget() as StructureController;
        if (this.creep.room.controller.sign.text != TUNINGS.SIGN_TEXT && this.creep.signController(target, TUNINGS.SIGN_TEXT) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target, { maxRooms: 0 });
        }
        if (this.creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target, { maxRooms: 0 });
        }
    }
}
