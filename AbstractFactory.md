

### Motivação
Imagine que estamos desenvolvendo um jogo de ação onde diferentes entidades (como jogadores e inimigos) precisam ser criadas com atributos específicos. Sem uma abordagem estruturada, o código do jogo ficaria fortemente acoplado às classes concretas dos personagens, dificultando a manutenção e a expansão (por exemplo, se no futuro quisermos adicionar novas entidades como “Aliados” ou “Chefes”).

Como nosso código resolve o problema:

- Desacoplamento e Flexibilidade:
O uso da classe abstrata EntityFactory define uma interface comum para a criação de entidades. Assim, o Client (a parte do sistema que solicita a criação dos objetos) não precisa conhecer os detalhes de implementação dos objetos (Player ou Enemy). Basta interagir com a fábrica correspondente.

- Facilidade de Extensão:
Ao criar novas fábricas (por exemplo, uma BossFactory), podemos estender a hierarquia sem alterar o código existente, garantindo que as novas entidades possam ser integradas de forma transparente.

- Manutenção Simplificada:
Alterações na criação de um objeto específico (por exemplo, modificar atributos padrão ou lógica de inicialização) são centralizadas na fábrica concreta correspondente, evitando a dispersão dessas alterações pelo código do jogo.

@startuml
title Abstract Factory Pattern - Criação de Entidades

' Abstract Product
abstract class Entity {
  - type: String
  - health: Number
  - speed: Number
  - damage: Number
  + constructor(type: String, health: Number, speed: Number, damage: Number)
}

' Concrete Products
class Player {
  - controller: Any
  + constructor(health: Number, speed: Number, damage: Number, controller: Any)
}

class Enemy {
  - ai: String
  + constructor(health: Number, speed: Number, damage: Number, ai: String)
}

Entity <|-- Player
Entity <|-- Enemy

' Abstract Factory
abstract class EntityFactory {
  + createEntity(attributes: Object): Entity
}

' Concrete Factories
class PlayerFactory {
  + createEntity(attributes: Object): Player
}
class EnemyFactory {
  + createEntity(attributes: Object): Enemy
}

EntityFactory <|-- PlayerFactory
EntityFactory <|-- EnemyFactory

' Client (Exemplo de uso)
class Client {
  + main(): void
}

Client --> PlayerFactory : usa
Client --> EnemyFactory : usa
@enduml

## Participantes: 

- AbstractFactory (EntityFactory):
Define a interface para a criação dos objetos-produto abstratos (neste caso, a criação de uma entidade).

- Concrete Factories (PlayerFactory, EnemyFactory):
Implementam os métodos de criação para os produtos concretos. Cada fábrica sabe como instanciar a entidade correta (Player ou Enemy) com os atributos apropriados.

- AbstractProduct (Entity):
Declara a interface ou classe base para os tipos de objeto-produto (nossa entidade genérica que possui atributos como saúde, velocidade e dano).

- ConcreteProducts (Player, Enemy):
Implementam a interface definida pelo AbstractProduct e adicionam características específicas (como o controlador para o Player ou o tipo de inteligência artificial para o Enemy).

- Client:
Utiliza a fábrica abstrata para criar objetos sem acoplamento direto com as classes concretas. Isso torna o sistema flexível e aberto para extensão.




## Exemplo:
```js

// Abstract Product (Entity)
class Entity {
    constructor(type, health, speed, damage) {
        this.type = type;
        this.health = health;
        this.speed = speed;
        this.damage = damage;
    }
}

// Concrete Product (Player)
class Player extends Entity {
    constructor(health, speed, damage, controller) {
        super("player", health, speed, damage);
        this.controller = controller;
    }
}

// Concrete Product (Enemy)
class Enemy extends Entity {
    constructor(health, speed, damage, ai) {
        super("enemy", health, speed, damage);
        this.ai = ai;
    }
}

// Abstract Factory (EntityFactory)
class EntityFactory {
    createEntity(type, attributes) {
        throw new Error("Método deve ser implementado pelas subclasses");
    }
}

// Concrete Factory (PlayerFactory)
class PlayerFactory extends EntityFactory {
    createEntity({ health = 3, speed = 1, damage = 1, controller = 1 }) {
        return new Player(health, speed, damage, controller);
    }
}

// Concrete Factory (EnemyFactory)
class EnemyFactory extends EntityFactory {
    createEntity({ health = 5, speed = 1, damage = 3, ai = "basic" }) {
        return new Enemy(health, speed, damage, ai);
    }
}

// Client
const playerFactory = new PlayerFactory();
const enemyFactory = new EnemyFactory();

const player1 = playerFactory.createEntity({ health: 10, speed: 2, damage: 5, controller: "keyboard" });
const enemy1 = enemyFactory.createEntity({ health: 8, speed: 1, damage: 4, ai: "aggressive" });

console.log(player1);
console.log(enemy1);


```

& Implementado por: Adriano Victor e Pedro Victor Hipolito