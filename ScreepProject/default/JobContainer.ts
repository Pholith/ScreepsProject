import { BodyType, Job, State } from "./Enums";

export abstract class JobContainer {

    public abstract getJob(): Job;
    public abstract numberNeededOfThisJob(forceTheNeed: boolean): number;
    public abstract numberNeededOfThisJob(): number;
    public abstract getBodyType(): BodyType;
}

export class JobHarvester extends JobContainer {
    public getJob(): Job { return Job.HARVESTER; }

    public numberNeededOfThisJob(forceTheNeed: boolean = false): number {
        if (Game.spawns["Spawn1"].room.energyCapacityAvailable > Game.spawns["Spawn1"].room.energyAvailable) return 4;
        return 1;
    }

    public getBodyType(): BodyType {
        return BodyType.WORKER;
    }
}
export class JobBuilder extends JobContainer {
    public getJob(): Job { return Job.BUILDER; }

    public numberNeededOfThisJob(forceTheNeed: boolean = false): number {
        if (Game.spawns["Spawn1"].room.find(FIND_CONSTRUCTION_SITES).length > 1) {
            if (forceTheNeed) return Infinity;
            return 3
        }
        return 0;
    }
    public getBodyType(): BodyType {
        return BodyType.WORKER;
    }
}
export class JobRepairer extends JobContainer {
    public getJob(): Job { return Job.REPAIRER; }

    public numberNeededOfThisJob(forceTheNeed: boolean = false): number {
        // TO IMPLEMENTE
        return 2;
    }
    public getBodyType(): BodyType {
        return BodyType.WORKER;
    }
}
export class JobWallRepairer extends JobContainer {
    public getJob(): Job { return Job.WALL_REPAIRER; }

    public numberNeededOfThisJob(forceTheNeed: boolean = false): number {
        // TO IMPLEMENTE
        if (forceTheNeed) return Infinity
        return 2;
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
        // TO IMPLEMENTE
        return 0;
    }
    public getBodyType(): BodyType {
        return BodyType.FIGHTER;
    }
}
