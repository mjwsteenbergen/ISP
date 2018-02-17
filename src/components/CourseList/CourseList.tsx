/* tslint:disable */

import * as React from 'react';
import { DetailsList } from 'office-ui-fabric-react/lib/components/DetailsList';
import { CourseApi, Course } from '../CourseApi/CourseApi';
import { CourseFilterState } from '../CourseFilter/CourseFilter';

interface CoursePageProps {
  filter: CourseFilterState | null;
}

interface CoursePageState {
  items: any[];
}

class CoursePage extends React.Component<CoursePageProps, CoursePageState> {

  constructor(props: CoursePageProps) {
    super(props);
    
  }

  async componentDidMount() {
    let api: CourseApi = new CourseApi();
    this.setState({
      items: await api.getCourses()
    });
  }

  _filter(items: Course[]) : Course[] {

    let newi = items;

    let quarters: number[] = []; 

    if (this.props && this.props.filter) {
      let filter = this.props.filter;
      if(filter.quarter1) {
        quarters.push(1);
      }
      if(filter.quarter2) {
        quarters.push(2);
      }
      if(filter.quarter3) {
        quarters.push(3);
      }
      if(filter.quarter4) {
        quarters.push(4);
      }

      newi = items.filter(i => quarters.findIndex(j => j == i.quarterStart) != -1);

      if(filter.tags.length > 0) {
        newi = newi.filter(i => filter.tags.every(j => i.tags.map(k => k.tagName).findIndex(l => l == j) > -1));
      }

      if(filter.name !== ""){
        newi = newi.filter(i => new RegExp(filter.name.toLowerCase(), '\g').test(i.courseName.toLowerCase()))
      }

      if(filter.code !== "")
      {
        newi = newi.filter(i => new RegExp(filter.code.toLowerCase(), '\g').test(i.courseCode.toLowerCase()))
      }
    }

    

    return newi;
  }

  render() {
    let items: Course[];
    if (this.state) {
      items = this.state.items; 
    } else {
      items = [];
    }

    return (
      <div className="courseList">
        <div>
          <div></div>
          <DetailsList items={this._filter(items)}/>        
        </div>
      </div>
    );
  }
}

export default CoursePage;
