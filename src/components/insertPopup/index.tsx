import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../constants";
import styles from "./style.module.scss";

export default function InsertPopup(props: {
  visible: boolean;
  setVisible: any;
  getData: any;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  const insertEmployee = () => {
    if (!name) {
      alert("Name is required.");
    } else {
      axios
        .post(`${API_URL}/employee`, {
          name: name,
          email: email,
          position: position,
        })
        .then(() => {
          props.setVisible(false);
          props.getData();
        });
    }
  };

  return (
    <div className={styles.root} onClick={() => props.setVisible(false)}>
      <div
        className={styles.popup}
        onClick={(event) => event.stopPropagation()}
      >
        <p className={styles.title}>Add employee</p>
        <div className={styles.field}>
          <span className={styles.fieldName}>Name:</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoFocus
          />
        </div>
        <div className={styles.field}>
          <span className={styles.fieldName}>Email:</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className={styles.field}>
          <span className={styles.fieldName}>Position:</span>
          <input
            value={position}
            onChange={(event) => setPosition(event.target.value)}
          />
        </div>
        <div className={styles.action}>
          <button className={styles.btn} onClick={() => insertEmployee()}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
