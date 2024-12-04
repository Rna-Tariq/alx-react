import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
  const [checked, setChecked] = useState(false);
  const rowStyle = { backgroundColor: "#f5f5f5ab" };
  const headerStyle = { backgroundColor: "#deb5b545" };
  const selectedStyle = isHeader ? headerStyle : rowStyle;

  const handleCheckChange = (e) => {
    setChecked(!checked);
  };

  return (
    <tr style={selectedStyle} className={checked ? css(rowsStyles.rowChecked) : ""} >
      {isHeader ? (
        textSecondCell === null ? (
          <th colSpan={2} className={css(rowsStyles.thcenter)}>
            {textFirstCell}
            </th>
        ) : (
          <>
            <th className={css(rowsStyles.th)}>{textFirstCell}</th>
            <th className={css(rowsStyles.th)}>{textSecondCell}</th>
          </>
        )
      ) : (
        <>
          <td className={css(rowsStyles.td)}>
            <input type="checkbox" onChange={handleCheckChange} />
            {textFirstCell}
            </td>
          <td className={css(rowsStyles.td)}>
            {textSecondCell}
            </td>
        </>
      )}
    </tr>
  );
}

const rowsStyles = StyleSheet.create({
  thcenter: {
    borderBottom: "1px solid gray",
    margin: 0,
    padding: 0,
    textAlign: "center",
  },
  th: {
    borderBottom: "1px solid gray",
    margin: 0,
    padding: 0,
    textAlign: "left",
  },
  td: {
    paddingLeft: 3,
  },
  rowChecked: {
    backgroundColor: "#e6e4e4",
  },
});

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

export default CourseListRow;
