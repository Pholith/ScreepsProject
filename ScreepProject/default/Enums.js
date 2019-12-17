"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Job;
(function (Job) {
    Job["HARVESTER"] = "HARVESTER";
    Job["REMOTE_HARVESTER"] = "REMOTE_HARVESTER";
    Job["BUILDER"] = "BUILDER";
    Job["CLAIMER"] = "CLAIMER";
    Job["UPGRADER"] = "UPGRADER";
    Job["MINER"] = "MINER";
    Job["PROTECTOR"] = "PROTECTOR";
    Job["REPAIRER"] = "REPAIRER";
    Job["DEMOLISHER"] = "DEMOLISHER";
    Job["WALL_REPAIRER"] = "WALL_REPAIRER";
})(Job = exports.Job || (exports.Job = {}));
var State;
(function (State) {
    State[State["HARVEST"] = 1] = "HARVEST";
    State[State["ACTION"] = 2] = "ACTION";
})(State = exports.State || (exports.State = {}));
var BodyType;
(function (BodyType) {
    BodyType[BodyType["WORKER"] = 0] = "WORKER";
    BodyType[BodyType["WORKER_ONE_MOVE"] = 1] = "WORKER_ONE_MOVE";
    BodyType[BodyType["HAULER"] = 2] = "HAULER";
    BodyType[BodyType["FIGHTER"] = 3] = "FIGHTER";
    BodyType[BodyType["HEALER"] = 4] = "HEALER";
})(BodyType = exports.BodyType || (exports.BodyType = {}));
//# sourceMappingURL=Enums.js.map