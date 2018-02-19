import * as React from 'react';
import './YearPlanning.css';
import { Course } from '../CourseApi/CourseApi';
import CoursePlaque from '../CoursePlaque/CoursePlaque';
import QuarterPlanning from '../QuarterPlanning/QuarterPlanning';

interface YearPlanningProps {
  year: string;
  courses: Course[];
  onMove: Function;
}

class YearPlanning extends React.Component<YearPlanningProps> {
  constructor(props: YearPlanningProps) {
    super(props);
    this._onMove = this._onMove.bind(this);
  }

  _onMove(course: Course, direction: Number) {
    this.props.onMove(course, direction);
  }

  render() {
    return (
      <div className="YearPlanning">
        <h1 className="YearPlanning-title"> {this.props.year} </h1>
        <div className="YearPlanningQuarterHolder">
          <QuarterPlanning quarter={1} />
          <QuarterPlanning quarter={2} />
          <QuarterPlanning quarter={3} />
          <QuarterPlanning quarter={4} />
          {this.props.courses
            .filter(i => i.courseYear === this.props.year)
            .map((i, index) => (
              <CoursePlaque key={index} course={i} onMove={this._onMove} />
            ))}
        </div>
      </div>
    );
  }
}

export default YearPlanning;
