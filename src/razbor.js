import React from "react";
import { Statistic, Row, Col } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

export class Razbor extends React.Component {
  timer;
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      second: new Date().getSeconds(),
      percent: 0,
      showIcon: false,
      colorRed: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { percent: Math.round((state.second / 60) * 100) };
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.setState({ second: new Date().getSeconds(), time: new Date() }),
      1000
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.time.getMinutes() !== this.state.time.getMinutes()){
      this.setState((state) => ({
        showIcon:
          prevState.time.getMinutes() !== this.state.time.getMinutes()
            ? !state.showIcon
            : state.showIcon,
      }));
    }

  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  render() {
    return (
      <div className="App">
        <div>
          {this.state.time.toLocaleTimeString()}
          {this.state.showIcon && <PlusCircleOutlined />}
        </div>
        <Row>
          <Col flex={this.state.percent}>
            <Statistic
              title={"Загрузка " + Math.round(this.state.percent)}
              value={100}
              loading
            />
          </Col>
          <Col flex={100 - this.state.percent}></Col>
        </Row>
      </div>
    );
  }
}

export default Razbor;
