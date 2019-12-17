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
    BodyType[BodyType["WORKER"] = 1] = "WORKER";
    BodyType[BodyType["FIGHTER"] = 2] = "FIGHTER";
    BodyType[BodyType["HEALER"] = 3] = "HEALER";
    BodyType[BodyType["RUNNER"] = 4] = "RUNNER";
})(BodyType = exports.BodyType || (exports.BodyType = {}));
//# sourceMappingURL=Enums.js.map