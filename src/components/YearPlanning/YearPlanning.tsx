import * as React from 'react';
import QuarterPlanning from '../QuarterPlanning/QuarterPlanning';
import './YearPlanning.css';
import { Course } from '../CourseApi/CourseApi';

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
        <div className="YearPlanning-QuarterHolder">
          <QuarterPlanning
            year={this.props.year}
            quarter={1}
            courses={this.props.courses}
            onMove={this._onMove}
          />
          <QuarterPlanning
            year={this.props.year}
            quarter={2}
            courses={this.props.courses}
            onMove={this._onMove}
          />
          <QuarterPlanning
            year={this.props.year}
            quarter={3}
            courses={this.props.courses}
            onMove={this._onMove}
          />
          <QuarterPlanning
            year={this.props.year}
            quarter={4}
            courses={this.props.courses}
            onMove={this._onMove}
          />
        </div>
      </div>
    );
  }
}

export default YearPlanning;
