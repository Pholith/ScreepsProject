"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreepManager_1 = require("./CreepManager");
const CreepBuilder_1 = require("./CreepBuilder");
module.exports.loop = function loop() {
    CreepManager_1.CreepManager.run();
    // delete dead creep to save memory 
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    // Update creeps
    let creeps = new Array();
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        creeps.push(CreepBuilder_1.CreepBuilder.CreateContainer(creep));
    }
    for (let creep of creeps) {
        creep.run();
    }
    // Update for Structures
    for (let name in Game.structures) {
        let structure = Game.structures[name];
        // TOWER
        if (structure.structureType == STRUCTURE_TOWER) {
            let closestHostile = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile)
                structure.attack(closestHostile);
            var closestDamagedStructure = structure.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if (closestDamagedStructure) {
                structure.repair(closestDamagedStructure);
            }
        }
    }
};
//# sourceMappingURL=main.js.map