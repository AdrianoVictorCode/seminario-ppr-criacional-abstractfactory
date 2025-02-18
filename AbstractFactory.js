

class Entity {
    constructor(type, health, speed, damage) {
        this.type = type;
        this.health = health;
        this.speed = speed;
        this.damage = damage;
    }
}

class Player extends Entity {
    constructor(health, speed, damage, controller) {
        super("player", health, speed, damage);
        this.controller = controller;
    }
}

class Enemy extends Entity {
    constructor(health, speed, damage, ai) {
        super("enemy", health, speed, damage);
        this.ai = ai;
    }
}

class EntityFactory {
    createEntity(type, attributes) {
        throw new Error("Método deve ser implementado pelas subclasses");
    }
}

class PlayerFactory extends EntityFactory {
    createEntity({ health = 3, speed = 1, damage = 1, controller = 1 }) {
        return new Player(health, speed, damage, controller);
    }
}

class EnemyFactory extends EntityFactory {
    createEntity({ health = 5, speed = 1, damage = 3, ai = "basic" }) {
        return new Enemy(health, speed, damage, ai);
    }
}

const playerFactory = new PlayerFactory();
const enemyFactory = new EnemyFactory();

const player1 = playerFactory.createEntity({ health: 10, speed: 2, damage: 5, controller: "keyboard" });
const enemy1 = enemyFactory.createEntity({ health: 8, speed: 1, damage: 4, ai: "aggressive" });

console.log(player1);
console.log(enemy1);

