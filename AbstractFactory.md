## Padrão Abstract Factory
### Motivação
Em muitos sistemas, há a necessidade de criar diferentes tipos de objetos que compartilham um conjunto de características, mas possuem variações na implementação. Por exemplo, um jogo pode ter diferentes personagens (jogadores e inimigos), cada um com atributos específicos.

O Abstract Factory permite a criação desses objetos sem expor diretamente suas classes concretas. Assim, é possível criar diferentes entidades de maneira flexível e organizada, facilitando a manutenção e expansão do código.

@startuml
' Interface para a Abstract Factory
interface EntityFactory {
    + createEntity(type: String, health: int, speed: int, damage: int) : Entity
}

' Implementação concreta da fábrica
class ConcreteEntityFactory implements EntityFactory

' Classe base Entity
class Entity {
    + type : String
    + health : int
    + speed : int
    + damage : int
}

' Subclasses específicas
class Enemy extends Entity {
    + ai : String
}

class Player extends Entity {
    + controller : int
}

ConcreteEntityFactory ..|> EntityFactory
ConcreteEntityFactory --> Entity : "cria"
Entity <|-- Enemy
Entity <|-- Player
@enduml


## Exemplo:
```js
// Objeto que contém as funções para criar cada tipo de entidade

const buildEntity = {
    player: (entity) => {
        return new Player(entity.health, entity.speed, entity.damage, entity.controller);
    },
    enemy: (entity) => {
        return new Enemy(entity.health, entity.speed, entity.damage, entity.ai);
    },
};

// Abstract Factory que instancia entidades dinamicamente
class EntityFactory {
    static createEntity({ type, health = 3, speed = 1, damage = 1, ai = "basic", controller = 1 }) {
        const entity = { type, health, speed, damage, ai, controller };
        return buildEntity[entity.type](entity);
    }
}

// Criando entidades usando a fábrica abstrata
const player1 = EntityFactory.createEntity({ type: "player" });
const enemy1 = EntityFactory.createEntity({ type: "enemy", health: 5, speed: 1, damage: 3, ai: "melee" });
```

& Implementado por: Adriano Victor e Pedro Victor Hipolito