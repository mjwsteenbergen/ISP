import * as React from 'react';
import './QuarterPlanning.css';
import { Course } from '../CourseApi/CourseApi';
import CoursePlaque from '../CoursePlaque/CoursePlaque';

interface QuarterPlanningProps {
  year: string;
  quarter: number;
  courses: Course[];
  onMove: Function;
}

class QuarterPlanning extends React.Component<QuarterPlanningProps, {}> {
  constructor(props: QuarterPlanningProps) {
    super(props);
    this._onMove = this._onMove.bind(this);
  }

  _onMove(course: Course, direction: Number) {
    this.props.onMove(course, direction);
  }

  render() {
    let myCourses = this.props.courses
      .filter(
        i =>
          i.quarterStart === this.props.quarter &&
          i.courseYear === this.props.year
      )
      .map((i, index) => (
        <CoursePlaque key={index} course={i} onMove={this._onMove} />
      ));
    return (
      <div className="QuarterPlanning">
        <h2 className="QuarterPlanning-title">Quarter {this.props.quarter}</h2>
        <div className="QuarterPlanning-line" />
        <div className="QuarterPlanning-courses">{myCourses}</div>
      </div>
    );
  }
}

export default QuarterPlanning;
