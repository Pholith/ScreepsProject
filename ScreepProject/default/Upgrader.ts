import { CreepContainer } from "./CreepContainer";

export class Upgrader extends CreepContainer {
    protected findTarget(): RoomObject {
        return this.creep.room.controller;
    }

    protected action(): void {
        let target: StructureController = this.getTarget() as StructureController;

        if (this.creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    }
}
