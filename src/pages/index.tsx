import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const initialmaze = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const [maze, setMaze] = useState(initialmaze);
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const onClick = () => {
    const newMaze = JSON.parse(JSON.stringify(maze));
    newMaze.map((row: number[], y: number) => {
      row.map((color: number, x: number) => {
        if (newMaze[y][x] === 1) {
          const randomDirectionIndex = Math.floor(Math.random() * directions.length);
          const [dy, dx] = directions[randomDirectionIndex];
          const newX = x + dx;
          const newY = y + dy;
          newMaze[newY][newX] = 2;
        }
      });
    });
    setMaze(newMaze);
    const updatedMaze = JSON.parse(JSON.stringify(newMaze));
    updatedMaze.map((row: number[], y: number) => {
      row.map((color: number, x: number) => {
        if (color === 2) {
          updatedMaze[y][x] = 1;
        }
      });
    });
    setMaze(updatedMaze);
  };

  return (
    <div className={styles.board}>
      <button className={styles.generate} onClick={() => onClick()}>
        生成
      </button>
    </div>
  );
};

export default Home;
