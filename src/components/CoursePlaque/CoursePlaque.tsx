import * as React from 'react';
import { CourseApi, Person, Course } from '../CourseApi/CourseApi';
import {
  Facepile,
  IFacepilePersona
} from 'office-ui-fabric-react/lib/Facepile';
import {
  HoverCard,
  IExpandingCardProps,
  ExpandingCardMode
} from 'office-ui-fabric-react/lib/HoverCard';
import './CoursePlaque.css';
import {
  Persona,
  PersonaSize
} from 'office-ui-fabric-react/lib/components/Persona';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { Link } from 'office-ui-fabric-react/lib/components/Link';

interface CoursePlaqueProps {
  course: Course;
  onMove: Function | null;
}

interface CoursePlaqueState {
  rpersonas: Person[];
  opersonas: Person[];
}

class CoursePlaque extends React.Component<
  CoursePlaqueProps,
  CoursePlaqueState
> {
  constructor(props: CoursePlaqueProps) {
    super(props);
    this.state = { rpersonas: [], opersonas: [] };
  }

  async componentWillMount() {
    let course = this.props.course;
    if (course.responsibleInstructor) {
      let people = await Promise.all(
        course.responsibleInstructor.map(
          async i => await new CourseApi().getPerson(i.email)
        )
      );

      this.setState({
        rpersonas: people
      });
    }
    if (course.otherInstructors) {
      let people = await Promise.all(
        course.otherInstructors.map(
          async i => await new CourseApi().getPerson(i.email)
        )
      );
      this.setState({ opersonas: people });
    }
  }

  getHoverCardProps(person: Person): IExpandingCardProps {
    const expandingCardProps: IExpandingCardProps = {
      onRenderCompactCard: this._onRenderCompactCard,
      onRenderExpandedCard: this._onRenderExpandedCard,
      renderData: person,
      mode: ExpandingCardMode.compact
    };
    return expandingCardProps;
  }

  getFacepileProps(i: Person): IFacepilePersona {
    // TODO convert to persona
    return {
      personaName: i.fullName,
      imageUrl: i.imageUrl,
      data: i
    } as IFacepilePersona;
  }

  render() {
    return (
      <div className="CoursePlaque">
        <p className="CoursePlaque-title">{this.props.course.courseName}</p>
        <div className="CoursePlaque-content">
          <div className="CoursePlaque-people">
            {this.state.rpersonas.map((person, index) => (
              <HoverCard
                key={index}
                instantOpenOnClick={true}
                expandingCardProps={this.getHoverCardProps(person)}
              >
                <Facepile personas={[this.getFacepileProps(person)]} />
              </HoverCard>
            ))}
            <div className="CoursePlaque-vertical-line" />
            {this.state.opersonas.map((person, index) => (
              <HoverCard
                key={index}
                expandingCardProps={this.getHoverCardProps(person)}
              >
                <Facepile personas={[this.getFacepileProps(person)]} />
              </HoverCard>
            ))}
          </div>
          <div className="CoursePlaque-arrows">
            <Icon iconName="up" onClick={this._onClick.bind(this, -1)} />
            <Icon iconName="down" onClick={this._onClick.bind(this, 1)} />
          </div>
          {/* <p>ECTS: {this.state.ects}</p> */}
        </div>
      </div>
    );
  }

  private _onClick(direction: Number) {
    if (this.props.onMove) {
      this.props.onMove(this.props.course, direction);
    }
  }

  /* tslint:disable */
  private _onRenderCompactCard(personObj: any): JSX.Element {
    let person = personObj as Person;
    let sec = 'Teacher at the TU Delft';

    if (person.faculty) {
      sec = 'Researcher at the ' + person.faculty + ' faculty at the TU Delft';
    }

    const personaProps = {
      primaryText: person.fullName,
      secondaryText: sec,
      tertiaryText: person.room || '',
      imageUrl: person.imageUrl || ''
    };
    let phone = person.telephone || '';

    return (
      <div className="hoverCard-compactCard">
        <Persona {...personaProps} size={PersonaSize.size72} />
        <div className="hoverCard-compactCard-buttons">
          <Link href={'mailto:' + person.email}>
            <Icon iconName="Mail" />
            <span>Send email</span>
          </Link>
          <Link href={phone.replace(' ', '')}>Call</Link>
        </div>
      </div>
    );
  }

  private _onRenderExpandedCard(personObj: any): JSX.Element {
    return <div className="hoverCardExample-expandedCard" />;
  }
}

export default CoursePlaque;
