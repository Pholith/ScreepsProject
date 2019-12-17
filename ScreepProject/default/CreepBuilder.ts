import { Job } from "./Enums";
import { CreepContainer } from "./creepContainer";

import { Builder }      from "./Builder";
import { Harvester }    from "./Harvester";
import { Repairer }     from "./Repairer";
import { WallRepairer } from "./WallRepairer";
import { Upgrader }     from "./Upgrader";

export class CreepBuilder {
    public static CreateContainer(creep: Creep): CreepContainer {
        switch (creep.memory.job) {
            case null: case undefined: return new Harvester(creep);
            case Job.BUILDER: return new Builder(creep);
            case Job.HARVESTER: return new Harvester(creep);
            case Job.REPAIRER: return new Repairer(creep);
            case Job.UPGRADER: return new Upgrader(creep);
            case Job.WALL_REPAIRER: return new WallRepairer(creep);
            //case Job.CLAIMER: return new ;
            //case Job.DEMOLISHER: return new ;
            //case Job.MINER: return new ;
            //case Job.PROTECTOR: return new ;
            //case Job.REMOTE_HARVESTER: return new ;
            default:
                throw new Error("Type non reconnu! " + creep.memory.job);
        }
    }
}
