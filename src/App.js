import './App.css';
import React from "react";
import {PlusCircleOutlined} from '@ant-design/icons'
import {Col, Row, Statistic} from "antd";

export default class App extends React.PureComponent {
    state = {
        time: new Date(),
        showIcon: true,
        progress: 0,
        colorRed: 0
    }
    timer

    static getDerivedStateFromProps(props, state) {
        const newProgress = state.time.getSeconds() / 60 * 100;
        return {progress: newProgress}
    }

    componentDidMount() {
        this.timer = setInterval(() => this.setState({time: new Date()}), 1000)
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        return {newColor: 255 - this.state.progress / 100 * 255}
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setState((state) => ({
            showIcon: prevState.time.getMinutes() !== this.state.time.getMinutes() ? !state.showIcon : state.showIcon,
            colorRed: snapshot?.newColor
        }))
    }


    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        if (this.state.progress < 10) {
            throw new Error("Ха ха ха!!!")
        }
        return (
            <div className="App">
                {this.state.time.toLocaleTimeString()}
                {this.state.showIcon && <PlusCircleOutlined/>}
                <Row>
                    <Col flex={this.state.progress} style={{backgroundColor: `rgb(${this.state.colorRed},0,0)`}}>
                      <Statistic title={Math.round(this.state.progress)} value={Math.round(this.state.progress)} loading/>
                    </Col>
                    <Col flex={100 - this.state.progress} style={{backgroundColor: 'blue'}}>{Math.round(100 - this.state.progress)}</Col>
                </Row>
            </div>
        );
    }
}