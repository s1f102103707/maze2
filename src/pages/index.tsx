import { useState } from 'react';
import styles from './index.module.css';
const Home = () => {
  const blankMaze = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const initialMaze = [
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
  const [maze, setMaze] = useState(blankMaze);
  const directions = [
    [-1, 0], // 上
    [0, 1], // 右
    [1, 0], // 下
    [0, -1], // 左
  ];

  const [human, setHuman] = useState({
    x: 0,
    y: 0,
    forward: [1, 0],
  });

  const onClick = () => {
    const newMaze = JSON.parse(JSON.stringify(initialMaze));
    const initialHuman = {
      x: 0,
      y: 0,
      forward: [1, 0],
    };
    setHuman(initialHuman);
    console.log('initialmap');
    console.table(newMaze);
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
    console.log('secoundmap');
    console.table(newMaze);
    const updatedMaze = JSON.parse(JSON.stringify(newMaze));
    updatedMaze.map((row: number[], y: number) => {
      row.map((color: number, x: number) => {
        if (color === 2) {
          updatedMaze[y][x] = 1;
        }
      });
    });
    setMaze(updatedMaze);
    console.log('map');
    console.table(updatedMaze);
  };

  const Leftmove = () => {
    const { x, y, forward } = human;
    const [dx, dy] = forward;
    let newX = x;
    let newY = y;
    let Forward: number[] = forward;
    if (dx === 1) {
      Forward = [dy, dx];
    } else if (dy === 1) {
      Forward = [-dy, dx];
    } else if (dx === -1) {
      Forward = [dy, dx];
    } else if (dy === -1) {
      Forward = [-dy, dx];
    }
    setHuman({ x: newX, y: newY, forward: Forward });

    newX = x + Forward[0];
    newY = y + Forward[1];
    setHuman({ x: newX, y: newY, forward: Forward });
    console.log(human);
  };
  const onClickSearch = () => {
    MoveHuman();
    console.log(human);
  };
  const gomove = () => {
    const { x, y, forward } = human;
    const [dx, dy] = forward;
    const newX = x + dx;
    const newY = y + dy;
    setHuman({ ...human, x: newX, y: newY });
  };
  const Rightmove = () => {
    const { forward } = human;
    const [dx, dy] = forward;

    let Forward: number[] = forward;
    if (dx === 1) {
      Forward = [dy, -dx];
    } else if (dy === -1) {
      Forward = [dy, dx];
    } else if (dx === -1) {
      Forward = [dy, -dx];
    } else if (dy === 1) {
      Forward = [dy, dx];
    }
    setHuman({ ...human, forward: Forward });
  };
  const MoveHuman = () => {
    const { x, y, forward } = human;
    if (x === maze.length - 1 && y === maze[0].length - 1) {
      alert('goal');
      onClick();
      return;
    }
    const [dx, dy] = forward;
    let newX = x;
    let newY = y;
    let Forward: number[] = forward;
    const goX = x + forward[0];
    const goY = y + forward[1];
    if (dx === 1) {
      Forward = [dy, dx];
    } else if (dy === 1) {
      Forward = [-dy, dx];
    } else if (dx === -1) {
      Forward = [dy, dx];
    } else if (dy === -1) {
      Forward = [-dy, dx];
    }
    newX = x + Forward[0];
    newY = y + Forward[1];
    if (
      newX >= 0 &&
      newX < maze.length &&
      newY >= 0 &&
      newY < maze[0].length &&
      maze[newX][newY] === 0 &&
      maze[newX][newY] !== undefined
    ) {
      Leftmove();
      console.log('leftside');
      console.log(newY, newX);
    } else if (
      goX >= 0 &&
      // goX !== undefined &&
      // goY !== undefined &&
      goX < maze.length &&
      goY >= 0 &&
      goY < maze[0].length &&
      maze[goX][goY] === 0 &&
      maze[goX][goY] !== undefined
    ) {
      gomove();
      console.log('goside');
    } else {
      Rightmove();
      console.log('rightside');
    }
  };
  return (
    <div className={styles.container}>
      <button className={styles.generate} onClick={() => onClick()}>
        生成
      </button>
      <button className={styles.search} onClick={() => onClickSearch()}>
        探索
      </button>
      <div className={styles.board} style={{ backgroundColor: '#000' }}>
        {maze.map((row, x) =>
          row.map((color, y) => (
            <div
              key={`${x}-${y}`}
              className={styles.cell}
              style={{ backgroundColor: color === 0 ? '#fff' : '#000' }}
            >
              {human.x === x && human.y === y && (
                <div className={styles.position} key={`${human.x}- ${human.y}`} />
              )}{' '}
              {`${y}-${x}`}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Home;
