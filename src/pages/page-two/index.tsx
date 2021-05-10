import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import InsertPopup from "../../components/insertPopup";
import { Employee } from "../../models/employee";
import { API_URL, ROWS_PER_PAGE } from "../../constants";

export default function PageTwo() {
  const headerColumns = ["Name", "Email", "Position"];
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isReachEnd, setIsReachEnd] = useState(false);
  const [showInsertSection, setShowInsertSection] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = (type?: string) => {
    let goToPage = currentPage;
    if (type === "previous") goToPage--;
    if (type === "next") goToPage++;
    axios
      .get(`${API_URL}/employee?page=${goToPage}&limit=${ROWS_PER_PAGE}`)
      .then((res) => {
        if (res.data.length > 0) {
          setData(res.data);
          if (res.data.length < 5) {
            setIsReachEnd(true);
          } else {
            setIsReachEnd(false);
          }
          setCurrentPage(goToPage);
        } else {
          alert("No data.");
        }
      });
  };

  const handlePreviousPage = () => {
    getData("previous");
  };

  const handleNextPage = () => {
    getData("next");
  };

  const renderHeader = (): ReactNode => {
    return (
      <tr>
        {headerColumns.map((column: string) => (
          <th className={styles.th} key={column}>
            {column}
          </th>
        ))}
      </tr>
    );
  };

  const renderData = (): ReactNode => {
    const emptyRows = ROWS_PER_PAGE - data.length;
    let temp = [];
    temp = data.map((record: Employee) => (
      <tr className={styles.tr} key={record.id}>
        <td className={styles.td}>{record.name}</td>
        <td className={styles.td}>{record.email}</td>
        <td className={styles.td}>{record.position}</td>
      </tr>
    ));
    if (emptyRows > 0) {
      for (let i = 0; i < emptyRows; i++) {
        temp.push(
          <tr className={styles.tr} key={i}>
            <td className={styles.td}></td>
            <td className={styles.td}></td>
            <td className={styles.td}></td>
          </tr>
        );
      }
    }
    return temp;
  };

  return (
    <div className={styles.root}>
      <table className={styles.table}>
        <thead>{renderHeader()}</thead>
        <tbody>{renderData()}</tbody>
      </table>
      <div className={styles.addBtnContainer}>
        <button
          className={styles.btn}
          onClick={() => setShowInsertSection(true)}
        >
          +
        </button>
      </div>
      <div className={styles.paginator}>
        {currentPage > 1 && (
          <button
            className={`${styles.btn} ${styles.btnLeft}`}
            onClick={() => handlePreviousPage()}
          >{`<`}</button>
        )}
        <span>{currentPage}</span>
        {!isReachEnd && (
          <button
            className={`${styles.btn} ${styles.btnRight}`}
            onClick={() => handleNextPage()}
          >{`>`}</button>
        )}
      </div>
      <div className={styles.linkContainer}>
        <Link to="/">Page One</Link>
      </div>
      {showInsertSection && (
        <InsertPopup
          visible={showInsertSection}
          setVisible={setShowInsertSection}
          getData={getData}
        />
      )}
    </div>
  );
}
