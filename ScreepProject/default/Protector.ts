import { CreepContainer } from "./CreepContainer";
import { State, BodyType, Job } from "./Enums";

export class Protector extends CreepContainer {
    protected findTarget(): RoomObject {
        let closestHostile: Creep = this.creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: (creep) =>  creep.body.map((part) => part.type).includes(ATTACK) ||
                                creep.body.map((part) => part.type).includes(RANGED_ATTACK)
        });
        return closestHostile;
    }
    protected updateState(): void {
        this.creep.memory.state = State.ACTION;
    }

    protected action(): void {
        let target: Creep = this.getTarget() as Creep;

        if (this.creep.attack(target) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);

        }
    }
}
