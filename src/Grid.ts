import { Tile } from "./Tile";

export class Grid {
  #width: number;
  #height: number;
  #tiles;

  constructor(width: number, height: number) {
    this.#width = width;
    this.#height = height;

    this.#tiles = new Array(height).fill(null).map((_, rowIndex) => {
      return new Array(width).fill(null).map((_, columnIndex) => {
        return new Tile(columnIndex, rowIndex);
      });
    });
  }

  get width() {
    return this.#width;
  }

  set width(_value) {
    throw new Error('Cannot set private class property: "width"');
  }

  get height() {
    return this.#height;
  }

  set height(_value) {
    throw new Error('Cannot set private class property: "height"');
  }

  get tiles() {
    return this.#tiles;
  }

  set tiles(_value) {
    throw new Error('Cannot set private class property: "tiles"');
  }

  draw(gridContainer: HTMLDivElement) {
    this.tiles.forEach((row) => {
      const rowElement = document.createElement("div");
      rowElement.classList.add("row");
      row.forEach((tile) => {
        rowElement.appendChild(tile.element);
      });
      gridContainer.appendChild(rowElement);
    });
  }

  repaint() {
    this.tiles.forEach((row) => {
      row.forEach((tile) => {
        tile.repaint();
      });
    });
  }
}
