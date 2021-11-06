import { Grid } from "./Grid";
import { Tile } from "./Tile";
export class FoodSpawner {
  #grid: Grid;
  #foodLimit: number;
  #foodTiles: Tile[];

  constructor(grid: Grid, foodLimit: number) {
    this.#grid = grid;
    this.#foodLimit = foodLimit;
    this.#foodTiles = [];
  }

  get grid() {
    return this.#grid;
  }

  set grid(_value) {
    throw new Error('Cannot set private class property: "grid"');
  }

  get foodTiles() {
    return this.#foodTiles;
  }

  set foodTiles(_value) {
    throw new Error('Cannot set private class property: "foodTiles"');
  }

  get foodLimit() {
    return this.#foodLimit;
  }

  set foodLimit(_value) {
    throw new Error('Cannot set private class property: "foodLimit"');
  }

  findEmptyTile(): Tile {
    let tile: Tile | null = null;

    do {
      const row = Math.floor(Math.random() * this.grid.height);
      const column = Math.floor(Math.random() * this.grid.width);
      tile = this.grid.tiles[row][column];
    } while (!tile.isEmpty());

    return tile;
  }

  spawnFood(): void {
    const foodTile: Tile = this.findEmptyTile();
    foodTile.setToFood();
    this.foodTiles.push(foodTile);
  }

  refill(): void {
    this.#foodTiles = this.foodTiles.filter((tile) => tile.isFood());

    while (this.foodTiles.length < this.foodLimit) {
      this.spawnFood();
    }
  }
}
