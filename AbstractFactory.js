const buildEntity = {
    player: (entity) => {
        return new Player(entity.health, entity.speed, entity.damage, entity.controller);
    },
    enemy: (entity) => {
        return new Enemy(entity.health, entity.speed, entity.damage, entity.ai);
    },
};

class EntityFactory {
    static createEntity({ type, health = 3, speed = 1, damage = 1, ai = "basic", controller = 1 }) {
        const entity = { type, health, speed, damage, ai, controller };
        return buildEntity[entity.type](entity);
    }
}

const player1 = EntityFactory.createEntity({ type: "player" });
const enemy1 = EntityFactory.createEntity({ type: "enemy", health: 5, speed: 1, damage: 3, ai: "melee" });
