import { FoodSpawner } from "./FoodSpawner";
import { Grid } from "./Grid";
import { DIRECTION, Snake, DirectionName } from "./Snake";
import "./index.css";

const gridElement = document.getElementById("grid") as HTMLDivElement;
const TICK_INTERVAL = 600;

function bindDirectionListener(callback: (direction: DirectionName) => void): void {
  document.addEventListener("keyup", (event: KeyboardEvent) => {
    const directionMap = {
      ArrowRight: DIRECTION.RIGHT,
      ArrowLeft: DIRECTION.LEFT,
      ArrowUp: DIRECTION.UP,
      ArrowDown: DIRECTION.DOWN,
    };

    callback(directionMap[event.key]);
  });
}

function processTick(grid: Grid, snake: Snake, foodSpawner: FoodSpawner) {
  const timeoutId = setTimeout(() => {
    try {
      snake.move();
    } catch {
      clearTimeout(timeoutId);
      gridElement.classList.add("game-over");
      return;
    }

    foodSpawner.refill();
    grid.repaint();

    processTick(grid, snake, foodSpawner);
  }, TICK_INTERVAL);
}

function startGame(): void {
  const grid = new Grid(10, 10);
  const snake = new Snake(grid);
  const foodSpawner = new FoodSpawner(grid, 1);

  snake.spawn(3);
  foodSpawner.refill();
  grid.draw(gridElement);
  grid.repaint();

  bindDirectionListener((direction) => {
    snake.changeDirection(direction);
  });

  processTick(grid, snake, foodSpawner);
}

startGame();
