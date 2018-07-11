import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

// 使用高德地图查询接口
const weatherAPI = 'https://restapi.amap.com/v3/weather/weatherInfo';
const weatherKey = '923d9762b87a6c7317a741b0bfe6e2d8';

class PipelineWeatherDemo extends React.Component {
  constructor(props) {
    super(props);

   this.state = {
     weatherInfo: {},
     weather: {},
   };
  }

  async componentDidMount() {
    const weatherInfo = await this.queryWeatherInfo();
    this.setState({
      weatherInfo,
    });
    const weather = this.weather();
    this.setState({
      weather,
    });
  }

 async queryWeatherInfo() {
    return fetch(`${weatherAPI}?key=${weatherKey}&city=${this.props.config.city}`)
      .then(res => res.json())
      .catch(e => console.log('查询天气接口报错:', e)); // eslint-disable-line no-console
  }

  weather() {
    if (this.state.weatherInfo && this.state.weatherInfo.lives && this.state.weatherInfo.lives.length > 0) {
      return this.state.weatherInfo.lives[0];
    }
    return {};
  }

  render() {
    const customAttributes = {
      'data-component-id': this.props['data-component-id'],
      'data-component-name': this.props['data-component-name'],
    };

    return (
      <div className="weather-container"
        { ...customAttributes }>
        <div className="weather-container__title">查询天气(动态接口示例)</div>
        <div className="weather__title">
          {this.props.config.city}
        </div>
        <ul className="weather__info">
          <li>
            <label className="weather-info__label">温度</label>
            <span className="weather-info__value">{this.state.weather.temperature}℃ / {this.state.weather.humidity}℉</span>
          </li>
          <li>
            <label className="weather-info__label">气象</label>
            <span className="weather-info__value">{this.state.weather.weather}</span>
          </li>
          <li>
            <label className="weather-info__label">风向</label>
            <span className="weather-info__value">{this.state.weather.winddirection}</span>
          </li>
        </ul>
      </div>);
  }
}

PipelineWeatherDemo.propTypes = {
  config: PropTypes.object.isRequired
};

export {
  PipelineWeatherDemo
};
export default PipelineWeatherDemo;
