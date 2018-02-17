import * as React from 'react';
import './CourseFilter.css';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ICheckboxStyles } from 'office-ui-fabric-react/lib/components/Checkbox';
import { Tag, CourseApi } from '../CourseApi/CourseApi';

interface CourseFilterProps {
  filterChanged: Function;
}

interface CourseFilterState {
  name: string;
  code: string;
  quarter1: boolean;
  quarter2: boolean;
  quarter3: boolean;
  quarter4: boolean;
  tags: string[];
}

class CourseFilter extends React.Component<CourseFilterProps, {}> {

  myState: CourseFilterState;
  possibleTags: Tag[];

  constructor(props: CourseFilterProps) {
    super(props);
    this._onCheckbox = this._onCheckbox.bind(this);
    this.myState = {
      name: '',
      code: '',
      quarter1: true,
      quarter2: true,
      quarter3: true,
      quarter4: true,
      tags: []
    };
  }

  async componentWillMount() {
    this.possibleTags = await new CourseApi().getTags();
    this.forceUpdate();
  }

  _onCheckbox(id: number, element: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) {
    if (checked == null) {
      checked = true;
    }
    this.myState['quarter' + id] = checked;
    this._filterChanged();
  }

  _filterChanged() {
    if (this.props.filterChanged) {
      this.props.filterChanged(this.myState);
    }
  }

  _tagsChanged(int: number, option: IDropdownOption) {
    console.log(this.myState.tags);    
    if (option.selected) {
      this.myState.tags.push(option.text);
    } else {
      var index = this.myState.tags.indexOf(option.text);
      if (index > -1) {
        this.myState.tags.splice(index, 1);
      }
    }
    this._filterChanged();
  }

  _textFieldChanged(name: string, newvalue: string) {
    if (name === 'code') {
      this.myState.code = newvalue;
    } else {
      this.myState.name = newvalue;
    }
    this._filterChanged();
  }

  render() {

    let styles: ICheckboxStyles = {
      root: {
        paddingTop: '10px'
      }
    };

    let ptags: IDropdownOption[] = [];

    if (this.possibleTags) {
      ptags = this.possibleTags.map(i => {
        var m: IDropdownOption = {
          key: i.tagName,
          text: i.tagName
        };
        return m;
      });

    }

    return (
      <div className="sidebar">

        <h1>Search </h1>
        <p className="subTitle">for a course</p>

        <TextField 
          onChanged={this._textFieldChanged.bind(this, 'name')} 
          placeholder="Ad-hoc Networks" 
          label="with name" 
        />
        <TextField 
          onChanged={this._textFieldChanged.bind(this, 'code')} 
          placeholder="IN4170" 
          label="with coursecode" 
        />

        <h2> Period </h2>

        <Checkbox
          styles={styles}
          defaultChecked={true}
          onChange={this._onCheckbox.bind(this, 1)}
          label="In Quarter 1"
        />
        <Checkbox
          styles={styles}
          defaultChecked={true}
          onChange={this._onCheckbox.bind(this, 2)}
          label="In Quarter 2"
        />
        <Checkbox
          styles={styles}
          defaultChecked={true}
          onChange={this._onCheckbox.bind(this, 3)}
          label="In Quarter 3"
        />
        <Checkbox
          styles={styles}
          defaultChecked={true}
          onChange={this._onCheckbox.bind(this, 4)}
          label="In Quarter 4"
        />

        <h2> Tag </h2>

        <Dropdown multiSelect={true} onChanged={this._tagsChanged.bind(this, 1)} options={ptags} />

      </div>
    );
  }
}

export { CourseFilter, CourseFilterState };
