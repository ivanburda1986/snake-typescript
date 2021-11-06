import { Tile } from "./Tile";
import { Grid } from "./Grid";
export type DirectionName = "LEFT" | "RIGHT" | "UP" | "DOWN";

export const DIRECTION = {
  LEFT: "LEFT" as "LEFT",
  RIGHT: "RIGHT" as "RIGHT",
  UP: "UP" as "UP",
  DOWN: "DOWN" as "DOWN",
};

export class Snake {
  #grid: Grid;
  #body: Tile[];
  #currentDirection: DirectionName;
  #futureDirection: DirectionName | null | undefined;

  constructor(grid: Grid) {
    this.#grid = grid;
    this.#body = [];
    this.#currentDirection = DIRECTION.RIGHT;
    this.#futureDirection = null;
  }

  get grid() {
    return this.#grid;
  }

  set grid(_value) {
    throw new Error('Cannot set private class property: "grid"');
  }

  get body() {
    return this.#body;
  }

  set body(_value) {
    throw new Error('Cannot set private class property: "body"');
  }

  get currentDirection() {
    return this.#currentDirection;
  }

  set currentDirection(_value) {
    throw new Error('Cannot set private class property: "currentDirection"');
  }

  get futureDirection() {
    return this.#futureDirection;
  }

  set futureDirection(_value) {
    throw new Error('Cannot set private class property: "futureDirection"');
  }

  get head() {
    return this.body[this.body.length - 1];
  }

  get tail() {
    return this.body[0];
  }

  spawn(length: number): void {
    const bodyTiles = this.grid.tiles[0].slice(0, length);
    bodyTiles.forEach((bodyTile) => {
      bodyTile.setToSnake();
      this.#body.push(bodyTile);
    });
  }

  isDirectionChangeAllowed(direction: DirectionName): boolean {
    const disallowedDirectionMap = {
      [DIRECTION.LEFT]: DIRECTION.RIGHT,
      [DIRECTION.RIGHT]: DIRECTION.LEFT,
      [DIRECTION.UP]: DIRECTION.DOWN,
      [DIRECTION.DOWN]: DIRECTION.UP,
    };

    return disallowedDirectionMap[this.currentDirection] !== direction;
  }

  changeDirection(direction: DirectionName): void {
    if (this.isDirectionChangeAllowed(direction)) {
      this.#futureDirection = direction;
    }
  }

  getFutureHeadTile(): Tile | null {
    switch (this.currentDirection) {
      case DIRECTION.RIGHT:
        if (this.head.x + 1 >= this.grid.width) {
          return null;
        }
        return this.grid.tiles[this.head.y][this.head.x + 1];
      case DIRECTION.LEFT:
        if (this.head.x - 1 < 0) {
          return null;
        }
        return this.grid.tiles[this.head.y][this.head.x - 1];
      case DIRECTION.UP:
        if (this.head.y - 1 < 0) {
          return null;
        }
        return this.grid.tiles[this.head.y - 1][this.head.x];
      case DIRECTION.DOWN:
        if (this.head.y + 1 >= this.grid.height) {
          return null;
        }
        return this.grid.tiles[this.head.y + 1][this.head.x];
      default:
        return null;
    }
  }

  willCrash(): boolean {
    const futureHeadTile: Tile | null = this.getFutureHeadTile();
    return !futureHeadTile || futureHeadTile.isSnake();
  }

  commitDirection(): void {
    if (!this.futureDirection) {
      return;
    }

    this.#currentDirection = this.futureDirection;
    this.#futureDirection = null;
  }

  shiftTail(): void {
    const futureHeadTile: Tile | null = this.getFutureHeadTile();

    if (!futureHeadTile?.isFood()) {
      this.tail.setToEmpty();
      this.body.shift();
    }
  }

  shiftHead(): void {
    const futureHeadTile: Tile | null = this.getFutureHeadTile();
    if (futureHeadTile === undefined || futureHeadTile === null) {
      return;
    }
    futureHeadTile.setToSnake();
    this.body.push(futureHeadTile);
  }

  move() {
    this.commitDirection();

    if (this.willCrash()) {
      throw Error("Bam!");
    }

    this.shiftTail();
    this.shiftHead();
  }
}
