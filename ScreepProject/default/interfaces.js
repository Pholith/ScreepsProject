var Job;
(function (Job) {
    Job[Job["HARVESTER"] = 0] = "HARVESTER";
    Job[Job["REMOTE_HARVESTER"] = 1] = "REMOTE_HARVESTER";
    Job[Job["BUILDER"] = 2] = "BUILDER";
    Job[Job["CLAIMER"] = 3] = "CLAIMER";
    Job[Job["UPGRADER"] = 4] = "UPGRADER";
    Job[Job["MINER"] = 5] = "MINER";
    Job[Job["PROTECTOR"] = 6] = "PROTECTOR";
    Job[Job["REPAIRER"] = 7] = "REPAIRER";
    Job[Job["DEMOLISHER"] = 8] = "DEMOLISHER";
    Job[Job["WALL_REPAIRER"] = 9] = "WALL_REPAIRER";
})(Job || (Job = {}));
var State;
(function (State) {
    State[State["HARVEST"] = 0] = "HARVEST";
    State[State["ACTION"] = 1] = "ACTION";
})(State || (State = {}));
var BodyType;
(function (BodyType) {
    BodyType[BodyType["WORKER"] = 0] = "WORKER";
    BodyType[BodyType["FIGHTER"] = 1] = "FIGHTER";
    BodyType[BodyType["HEALER"] = 2] = "HEALER";
    BodyType[BodyType["RUNNER"] = 3] = "RUNNER";
})(BodyType || (BodyType = {}));
//# sourceMappingURL=interfaces.js.map