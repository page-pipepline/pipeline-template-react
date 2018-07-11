import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

class PipelineInfoDemo extends React.Component {
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
      <div className="info-container"
        { ...customAttributes }>
        <div className="title">{this.props.config.title}</div>
        {this.props.config.infoList.map((info, index) => {
          return (
            <div className="info"
              key={index}>
              <div className="one-info">
                {info.info}
              </div>
            </div>
          );
        })}
      </div>);
  }
}

PipelineInfoDemo.propTypes = {
  config: PropTypes.object.isRequired
};

export {
  PipelineInfoDemo
};
export default PipelineInfoDemo;
