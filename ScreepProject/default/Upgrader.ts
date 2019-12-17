import { CreepContainer } from "./CreepContainer";

export class Upgrader extends CreepContainer {
    protected findStructures(): RoomObject[] {
        return [this.creep.room.controller];
    }

    protected action(): void {
        let targets: StructureController[] = this.getTargets() as StructureController[];

        if (this.creep.upgradeController(targets[0]) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(targets[0]);
        }
    }
}
