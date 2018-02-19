import * as React from 'react';
import './QuarterPlanning.css';

interface QuarterPlanningProps {
  quarter: number;
}

class QuarterPlanning extends React.Component<QuarterPlanningProps, {}> {
  constructor(props: QuarterPlanningProps) {
    super(props);
  }

  render() {
    return (
      <div className={'QuarterPlanning q' + this.props.quarter}>
        <h2 className="QuarterPlanning-title">Quarter {this.props.quarter}</h2>
        <div className="QuarterPlanning-line" />
      </div>
    );
  }
}

export default QuarterPlanning;
