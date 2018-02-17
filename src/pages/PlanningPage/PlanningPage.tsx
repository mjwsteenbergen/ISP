import * as React from 'react';
import YearPlanning from '../../components/YearPlanning/YearPlanning';
import './PlanningPage.css';
import { CourseApi, Course } from '../../components/CourseApi/CourseApi';

interface PlanningPageState {
  courses: Course[];
}

class PlanningPage extends React.Component<null, PlanningPageState> {
  constructor(props: null) {
    super(props);
    this.state = {
      courses: []
    };
    this._onMove = this._onMove.bind(this);
  }

  async getMyCourses() {
    let api = new CourseApi();
    var res = Promise.all(
      (await api.getMyCourses()).map(
        async i => await api.getCourse(i.code, i.year)
      )
    );
    return res;
  }

  async _onMove(course: Course, direction: number) {
    var res = new RegExp('(\\d+)/(\\d+)', 'g').exec(course.courseYear);
    console.log(res);
    if (res != null) {
      console.log(direction);
      this.state.courses.splice(this.state.courses.indexOf(course), 1);
      let year1 = direction + Number(res[1]);
      console.log(year1);
      let year2 = Number(res[2]) + direction;
      this.forceUpdate();
      this.setState({
        courses: this.state.courses.concat(
          await new CourseApi().getCourse(
            course.courseCode,
            year1 + '/' + year2
          )
        )
      });
      console.log(course);
    }
  }

  async componentWillMount() {
    this.setState({
      courses: await this.getMyCourses()
    });
  }

  render() {
    return (
      <div>
        <h1 className="PlanningPage-header">Your planning</h1>
        <YearPlanning
          year="2016/2017"
          courses={this.state.courses}
          onMove={this._onMove}
        />
        <YearPlanning
          year="2017/2018"
          courses={this.state.courses}
          onMove={this._onMove}
        />
      </div>
    );
  }
}

export default PlanningPage;
