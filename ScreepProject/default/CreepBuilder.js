"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("./Enums");
const Builder_1 = require("./Builder");
const Harvester_1 = require("./Harvester");
const Repairer_1 = require("./Repairer");
const WallRepairer_1 = require("./WallRepairer");
const Upgrader_1 = require("./Upgrader");
class CreepBuilder {
    static CreateContainer(creep) {
        switch (creep.memory.job) {
            case null:
            case undefined: return new Harvester_1.Harvester(creep);
            case Enums_1.Job.BUILDER: return new Builder_1.Builder(creep);
            case Enums_1.Job.HARVESTER: return new Harvester_1.Harvester(creep);
            case Enums_1.Job.REPAIRER: return new Repairer_1.Repairer(creep);
            case Enums_1.Job.UPGRADER: return new Upgrader_1.Upgrader(creep);
            case Enums_1.Job.WALL_REPAIRER: return new WallRepairer_1.WallRepairer(creep);
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
exports.CreepBuilder = CreepBuilder;
//# sourceMappingURL=CreepBuilder.js.map