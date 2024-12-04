import React from "react";
import CourseListRow from "./CourseListRow";
import "@testing-library/jest-dom";
import { render, screen} from "@testing-library/react";

describe("Course List Row component test", () => {
  test('renders one cell with colspan=2 when isHeader is true and textSecondCell is not present', () => {
    render(<CourseListRow isHeader={true} textFirstCell="Header Only" />);
    
    const headerCell = screen.getByText('Header Only');
    expect(headerCell).toBeInTheDocument();
    expect(headerCell).toHaveAttribute('colspan', '2');
  });

  test('renders two header cells when isHeader is true and textSecondCell is present', () => {
    render(<CourseListRow isHeader={true} textFirstCell="Header 1" textSecondCell="Header 2" />);
    
    const headerCell1 = screen.getByText('Header 1');
    const headerCell2 = screen.getByText('Header 2');
    
    expect(headerCell1).toBeInTheDocument();
    expect(headerCell2).toBeInTheDocument();
    expect(headerCell1.tagName).toBe('TH');
    expect(headerCell2.tagName).toBe('TH');
  });

  test('renders two td elements within a tr element when isHeader is false', () => {
    render(<CourseListRow isHeader={false} textFirstCell="Cell 1" textSecondCell="Cell 2" />);
    
    const row = screen.getByRole('row');
    const cell1 = screen.getByText('Cell 1');
    const cell2 = screen.getByText('Cell 2');
    
    expect(row).toContainElement(cell1);
    expect(row).toContainElement(cell2);
    expect(cell1.tagName).toBe('TD');
    expect(cell2.tagName).toBe('TD');
  });
});
