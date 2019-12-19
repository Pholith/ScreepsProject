import { Job } from "./Enums";

export class CreepUtils {

    public static numberOfScreeps(): number {
        let counter: number = 0;
        for (var _creep in Game.creeps) {
            counter++;
        }
        return counter;
    }

    public static numberOfRole(job: Job): number {
        let creepsThisJob = new Array<Creep>();
        for (var Creep in Game.creeps) {
            let forCreep = Game.creeps[Creep];
            if (forCreep.memory.job == job) {
                creepsThisJob.push(forCreep);
            }
        }
        return creepsThisJob.length;
    }

    public static numberOfHostiles(room : Room): number {
        let creeps: Creep[] = room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) =>
                    creep.body.map((part) => part.type).includes(ATTACK) ||
                    creep.body.map((part) => part.type).includes(RANGED_ATTACK)
        });
        return creeps.length;
    }
}
