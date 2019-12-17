
export enum Job {
    HARVESTER           = "HARVESTER",
    REMOTE_HARVESTER    = "REMOTE_HARVESTER",
    BUILDER             = "BUILDER",
    CLAIMER             = "CLAIMER",
    UPGRADER            = "UPGRADER",
    MINER               = "MINER",
    PROTECTOR           = "PROTECTOR",
    REPAIRER            = "REPAIRER",
    DEMOLISHER          = "DEMOLISHER",
    WALL_REPAIRER       = "WALL_REPAIRER"
}

export enum State {
    HARVEST = 1,
    ACTION  = 2
}

export enum BodyType {
    WORKER  = 1,
    FIGHTER = 2,
    HEALER  = 3,
    RUNNER  = 4
}
