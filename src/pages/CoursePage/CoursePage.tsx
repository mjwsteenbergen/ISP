import * as React from 'react';
// import './App.css';
// import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import CourseList from '../../components/CourseList/CourseList';
import './CoursePage.css';
import { Selection } from 'office-ui-fabric-react/lib/components/DetailsList';
import {
  CourseFilter,
  CourseFilterState
} from '../../components/CourseFilter/CourseFilter';
import { CommandBar } from 'office-ui-fabric-react/lib/components/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/components/ContextualMenu';
import { CourseApi, Course } from '../../components/CourseApi/CourseApi';

interface CoursePageState {
  filter: CourseFilterState | null;
  selection: Selection;
}

class CoursePage extends React.Component<{}, CoursePageState> {
  constructor(props: {}) {
    super(props);
    this._onFilterChanged = this._onFilterChanged.bind(this);
    this._onAdd = this._onAdd.bind(this);
    this.state = { filter: null, selection: new Selection() };
  }

  _onAdd(): void {
    this.state.selection
      .getSelection()
      .forEach(i => new CourseApi().addCourse(i as Course));
  }

  _getCommands(): IContextualMenuItem[] {
    return [
      {
        key: 'addCourse',
        name: 'Add course to IEP',
        icon: 'Add',
        onClick: this._onAdd
      }
    ];
  }

  _onFilterChanged(newArgs: CourseFilterState) {
    this.setState({
      filter: newArgs
    });
  }

  render() {
    let state: CourseFilterState | null;
    if (this.state) {
      state = this.state.filter;
    } else {
      state = null;
    }
    return (
      <div>
        <CommandBar className="commandBar" items={this._getCommands()} />

        <div className="page">
          <CourseFilter filterChanged={this._onFilterChanged} />
          <CourseList filter={state} selection={this.state.selection} />
        </div>
      </div>
    );
  }
}

export default CoursePage;
