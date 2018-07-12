import React from 'react';
import './App.css';

import mycomponents from './config/components';
import PipelineGapDemo from 'comp/pipeline-gap-demo';
import PipelineInfoDemo from 'comp/pipeline-info-demo';
import PipelineHeaderDemo from 'comp/pipeline-header-demo';
import PipelineWeatherDemo from 'comp/pipeline-weather-demo';

class App extends React.Component {
  constructor(props) {
    super(props);

    const pipelineComponents = (typeof window !== 'undefined') ?
      window.INIT_DATA || mycomponents : mycomponents;
    this.state = {
      pipelineComponents,
      components: {
        'pipeline-gap-demo': PipelineGapDemo,
        'pipeline-info-demo': PipelineInfoDemo,
        'pipeline-header-demo': PipelineHeaderDemo,
        'pipeline-weather-demo': PipelineWeatherDemo,
      },
    };

    // this.state.pipelineComponents.map(async oneComponent => await this.addComponent(oneComponent.name));
  }

  addComponent = async type => {
    console.log(`Loading ${type} component...`);
  
    import(`comp/${type}`)
      .then(component => {
        if (this.state.components[type]) return;
        this.setState({
          components: {
            ...this.state.components,
            [type]: component.default
          }
        });
      })
      .catch(error => {
        console.log(error);
        console.error(`"${type}" not yet supported`);
      });
  };

  render() {
    const Components = this.state.pipelineComponents.map(oneComponent => {
      const OneComponent = this.state.components[oneComponent.name];
      return OneComponent && (
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
