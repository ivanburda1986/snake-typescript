type TileType = "EMPTY" | "FOOD" | "SNAKE";

const TILE_TYPE = {
  EMPTY: "EMPTY" as "EMPTY",
  FOOD: "FOOD" as "FOOD",
  SNAKE: "SNAKE" as "SNAKE",
};

export class Tile {
  #x: number;
  #y: number;
  #type: TileType;
  #element: HTMLDivElement;

  constructor(x: number, y: number) {
    this.#x = x;
    this.#y = y;
    this.#type = TILE_TYPE.EMPTY;
    this.#element = document.createElement("div");
    this.element.classList.add("tile");
  }

  get x() {
    return this.#x;
  }

  set x(_value) {
    throw new Error('Cannot set private class property: "x"');
  }

  get y() {
    return this.#y;
  }

  set y(_value) {
    throw new Error('Cannot set private class property: "y"');
  }

  get type() {
    return this.#type;
  }

  set type(_value) {
    throw new Error('Cannot set private class property: "type"');
  }

  get element() {
    return this.#element;
  }

  set element(_value) {
    throw new Error('Cannot set private class property: "element"');
  }

  isEmpty() {
    return this.type === TILE_TYPE.EMPTY;
  }

  isFood() {
    return this.type === TILE_TYPE.FOOD;
  }

  isSnake() {
    return this.type === TILE_TYPE.SNAKE;
  }

  setToEmpty() {
    this.#type = TILE_TYPE.EMPTY;
  }

  setToFood() {
    this.#type = TILE_TYPE.FOOD;
  }

  setToSnake() {
    this.#type = TILE_TYPE.SNAKE;
  }

  repaint() {
    switch (this.type) {
      case TILE_TYPE.EMPTY:
        this.element.classList.remove(...this.element.classList);
        this.element.classList.add("tile");
        break;
      case TILE_TYPE.FOOD:
        this.element.classList.add("food-tile");
        break;
      case TILE_TYPE.SNAKE:
        this.element.classList.add("snake-tile");
        break;
      default:
        break;
    }
  }
}
