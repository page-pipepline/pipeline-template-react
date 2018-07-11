import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class PipelineGapDemo extends React.Component {
  constructor(props) {
    super(props);

   this.styleObject = {
      height: props.config.height,
      color: props.config.textColor,
      backgroundColor: props.config.backgroundColor,
   };
  }

  render() {
    const customAttributes = {
      'data-component-id': this.props['data-component-id'],
      'data-component-name': this.props['data-component-name'],
    };

    return (
      <div className="gap-container"
        style={this.styleObject}
        { ... customAttributes }>
        <p>{this.props.config.text}</p>
      </div>);
  }
}

PipelineGapDemo.propTypes = {
  config: PropTypes.object.isRequired
};

export {
  PipelineGapDemo
};
export default PipelineGapDemo;
