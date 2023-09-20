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
  };

  return <div className={styles.board}></div>;
};

export default Home;
