import { BodyType, Job, State } from "./Enums";
import { CreepUtils } from "./CreepUtils";
import { TUNINGS } from "./TUNINGS";

export abstract class JobContainer {

    public abstract getJob(): Job;
    public abstract numberNeededOfThisJob(forceTheNeed: boolean): number;
    public abstract numberNeededOfThisJob(): number;
    public abstract getBodyType(): BodyType;
}

export class JobHarvester extends JobContainer {
    public getJob(): Job { return Job.HARVESTER; }

    public numberNeededOfThisJob(forceTheNeed: boolean = false): number {
        if (Game.spawns[TUNINGS.MOTHER_SPAWN].room.energyCapacityAvailable > Game.spawns[TUNINGS.MOTHER_SPAWN].room.energyAvailable) return 4;
        return 1;
    }

    public getBodyType(): BodyType {
        return BodyType.WORKER;
    }
}
export class JobUpgrader extends JobContainer {
    public getJob(): Job { return Job.UPGRADER; }

    public numberNeededOfThisJob(forceTheNeed: boolean = false): number {
        if (forceTheNeed) return 3;
        return 2;
    }
    public getBodyType(): BodyType {
        return BodyType.WORKER;
    }
}
export class JobProtector extends JobContainer {
    public getJob(): Job { return Job.PROTECTOR; }

    public numberNeededOfThisJob(forceTheNeed: boolean = false): number {
        return CreepUtils.numberOfHostiles(Game.spawns[TUNINGS.MOTHER_SPAWN].room);
    }

    public getBodyType(): BodyType {
        return BodyType.FIGHTER;
    }
}
export class JobBuilder extends JobContainer {
    public getJob(): Job { return Job.BUILDER; }

    public numberNeededOfThisJob(forceTheNeed: boolean = false): number {
        let targets: ConstructionSite[] = TUNINGS.getMotherSpawn().room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length == 0) return 0;
        return Math.floor(targets.length / TUNINGS.TARGET_PER_WORKER)+1;
    }
    public getBodyType(): BodyType {
        return BodyType.WORKER;
    }
}
export class JobRepairer extends JobContainer {
    public getJob(): Job { return Job.REPAIRER; }

    public numberNeededOfThisJob(forceTheNeed: boolean = false): number {
        let targets: Structure[] = TUNINGS.getMotherSpawn().room.find(FIND_STRUCTURES);
        targets = targets.filter((target) =>  target != null && (target.structureType == STRUCTURE_RAMPART ||
            target.structureType == STRUCTURE_ROAD ||
            target.structureType == STRUCTURE_TOWER) &&
            target.hits < target.hitsMax);
        if (targets.length == 0) return 0;
        return Math.floor(targets.length / TUNINGS.TARGET_PER_WORKER)+1;
    }
    
    public getBodyType(): BodyType {
        return BodyType.WORKER;
    }
}
export class JobWallRepairer extends JobContainer {
    public getJob(): Job { return Job.WALL_REPAIRER; }

    public numberNeededOfThisJob(forceTheNeed: boolean = false): number {
        let targets: Structure[] = TUNINGS.getMotherSpawn().room.find(FIND_STRUCTURES);
        targets = targets.filter((target) => target != null && target.structureType == STRUCTURE_WALL && target.hits < target.hitsMax);
        if (targets.length == 0) return 0;
        return Math.floor(targets.length / TUNINGS.TARGET_PER_WORKER)+1;
    }
    public getBodyType(): BodyType {
        return BodyType.WORKER;
    }
}

