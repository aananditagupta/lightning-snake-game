import { Lightning, Colors, Router } from "@lightningjs/sdk";
import fontStyles from "../lib/fontStyles";
import GameEngine, { Directions } from "../lib/game";
import styles from "../lib/styles";

class Game extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      h: 1080,
      color: Colors("black").get(),
      rect: true,
      
      GameItems: {
        shader: {
          type: Lightning.shaders.Vignette,
          magnitude: 10, 
          intensity: 0.8
        },
        w: 1920,
        h: 1080,
      },

      Score: {
        x: (w) => w - styles.spacing.large,
        y: styles.spacing.medium,

        mountX: 1,
        text: {
          ...fontStyles.title,
          text: "Score: 0",
          textAlign: "right",
        },
      },
    };
  }

  _construct() {
    this.renderGame = this.renderGame.bind(this);
    this.gameEndHandler = this.gameEndHandler.bind(this);
  }

  cellSize = 100;
  tailItemPadding = 10;
  itemSize = 80;

  renderGame() {
    const { snake, food, score } = this.game.gameObjects;
    const children = [];

    snake.tail.forEach((tail) => {
      children.push({
        x: tail.x * this.cellSize + this.tailItemPadding,
        y: tail.y * this.cellSize + this.tailItemPadding,
        w: this.itemSize,
        h: this.itemSize,

        rect: true,
        color: Colors(snake.color).get(),
      });
    });

    children.push({
      x: food.x * this.cellSize + this.tailItemPadding,
      y: food.y * this.cellSize + this.tailItemPadding,
      w: this.itemSize,
      h: this.itemSize,

      rect: true,
      color: Colors(food.color).get(),
    });

    this.tag("GameItems").children = children;

    this.tag("Score").text = `Score: ${score}`;
  }

  gameEndHandler() {
    this.game = null;
    Router.navigate("highscore");
  }

  startGame() {
    this.game = new GameEngine();
    this.game.setup();
    this.game.onUpdate(this.renderGame);
    this.game.onGameEnd(this.gameEndHandler);
    this.game.enableGameLoop();
  }

  endGame() {
    if (this.game) {
      this.game.disableGameLoop();
      this.game = null;
    }
  }

  _active() {
    this.startGame();
  }

  _disable() {
    this.endGame();
  }

  _handleUp() {
    this.game.handle(Directions.UP);
  }

  _handleDown() {
    this.game.handle(Directions.DOWN);
  }

  _handleLeft() {
    this.game.handle(Directions.LEFT);
  }

  _handleRight() {
    this.game.handle(Directions.RIGHT);
  }
}

export default Game;