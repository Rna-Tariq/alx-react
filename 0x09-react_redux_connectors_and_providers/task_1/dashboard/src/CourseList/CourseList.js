import React from "react";
import CourseListRow from "./CourseListRow";
import CourseShape from "./CourseShape";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

function CourseList({ listCourses, ...props }) {
  return (
    <table {...props} className={css(styles.CourseList)}>
      <thead>
        <CourseListRow textFirstCell="Available courses" textSecondCell={null} isHeader={true} />
        <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
      </thead>
      <tbody>
        {listCourses.length > 0 ? (
          listCourses.map(({ id, name, credit }) => (
            <CourseListRow key={id} textFirstCell={name} textSecondCell={credit} />
          ))
        ) : (
          <CourseListRow textFirstCell="No course available yet" />
        )}
      </tbody>
    </table>
  );
}


const styles = StyleSheet.create({
	CourseList: {
		width: '90%',
		margin: '50px auto',
		border: '1px solid lightgray',
	}
});

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(CourseShape)
};

CourseList.defaultProps = {
  listCourses: []
};

export default CourseList;
