import styles from "./style.module.scss";

export default function Wrapper(props: any) {
  return <div className={styles.root}>{props.children}</div>;
}
