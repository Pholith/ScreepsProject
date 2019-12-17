import { CreepManager } from "./CreepManager";
import { CreepBuilder } from "./CreepBuilder";
import { CreepContainer } from "./creepContainer";

module.exports.loop = function loop() {

    CreepManager.run();

    // delete dead creep to save memory 
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    // Update creeps
    let creeps : Array <CreepContainer> = new Array();
    for (let name in Game.creeps) {
        let creep: Creep = Game.creeps[name];
        creeps.push(CreepBuilder.CreateContainer(creep));
    }

    for (let creep of creeps) {
        creep.run() 
    }

    // Update for Structures
    for (let name in Game.structures) {
        let structure: Structure = Game.structures[name];

        // TOWER
        if (structure.structureType == STRUCTURE_TOWER) {

            let closestHostile: Creep = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: (creep) =>  creep.body.map((part) => part.type).includes(ATTACK) ||
                                    creep.body.map((part) => part.type).includes(RANGED_ATTACK)
            });
            if (closestHostile) (structure as StructureTower).attack(closestHostile);

            /*var closestDamagedStructure = structure.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });*/
            /*if (closestDamagedStructure) {
                (structure as StructureTower).repair(closestDamagedStructure);
            }*/
        }
    }
}
