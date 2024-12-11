import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

describe('CourseList Component', () => {
  test('renders CourseList component without crashing', () => {
    render(<CourseList />);
  });

  test('renders 3 rows CourseList is empty', () => {
    const listCourses = [];
    render(<CourseList listCourses={listCourses} />);

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3);
  });

  test('renders five rows with CourseList containing elements', () => {
    const listCourses = [
      {id: 1, name: "ES6", credit: 60},
      {id: 2, name: "Webpack", credit: 20},
      {id: 3, name: "React", credit: 40}
    ];
    render(<CourseList listCourses={listCourses} />);

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(5);
  });
});
