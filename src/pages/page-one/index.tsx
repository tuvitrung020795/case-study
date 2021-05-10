import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

export default function PageOne() {
  const [count, setCount] = useState(0);

  const increase = (): void => {
    setCount(count + 1);
  };

  const reset = (): void => {
    setCount(0);
  };

  return (
    <div className={styles.root}>
      <input className={styles.input} value={count} disabled={true} />
      <button className={styles.btn} onClick={increase}>
        +
      </button>
      <button className={styles.btn} onClick={reset}>
        Reset
      </button>
      <Link to="/2">Page Two</Link>
    </div>
  );
}
