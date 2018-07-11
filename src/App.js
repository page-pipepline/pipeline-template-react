import React, { Component } from 'react';
import './App.css';
import mycomponents from './config/components';
import PipelineGapDemo from 'comp/pipeline-gap-demo';

const components = {
  'pipeline-gap-demo': PipelineGapDemo,
};

class App extends Component {
  constructor(props) {
    super(props);

    const pipelineComponents = (typeof window !== 'undefined') ?
      window.INIT_DATA || mycomponents : mycomponents;
    this.state = {
      pipelineComponents,
    };
  }

  render() {
    const Components = this.state.pipelineComponents.map(oneComponent => {
      const OneComponent = components[oneComponent.name];
      return (
        <OneComponent
          key={oneComponent.id}
          data-component-id={oneComponent.id}
          data-component-name={oneComponent.name}
          config={oneComponent.data}/>);
    });

    return (
      <div className="App">
        {Components}
      </div>
    );
  }
}

export default App;
