import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

class PipelineHeaderDemo extends React.Component {
  imgClick = () => {
      window.location.href = this.props.config.link;
  }

  render() {
    const customAttributes = {
      'data-component-id': this.props['data-component-id'],
      'data-component-name': this.props['data-component-name'],
    };

    return (
      <div className="header-container"
        { ...customAttributes }>
        <div className="title">{this.props.config.title}</div>
        <div className="header">
          <img className="header__img"
            alt=""
            src={this.props.config.src}
            onClick={this.imgClick}/>
        </div>
      </div>);
  }
}

PipelineHeaderDemo.propTypes = {
  config: PropTypes.object.isRequired
};

export {
  PipelineHeaderDemo
};
export default PipelineHeaderDemo;
