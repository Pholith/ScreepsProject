
export class TUNINGS {

    public static readonly MOTHER_SPAWN: string = "Spawn1";

    public static getMotherSpawn(): StructureSpawn {
        return Game.spawns[this.MOTHER_SPAWN];
    }

    public static readonly TARGET_PER_WORKER: number = 70;
    public static readonly SIGN_TEXT: string = "Hello :D";
}
