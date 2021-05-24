import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Razbor from './razbor';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css'

class Catcher extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error){
        console.log('Вывод ошибки', error)
        return {hasError: true, errorMessage: error.message}
    }

    componentDidCatch(error, errorInfo) {
        console.log(error)
        console.log(errorInfo)
    }

    render() {
        return (
            <div>
                {!this.state.hasError ? this.props.children : <h1>Всё плохо, убегай!</h1>}
            </div>
        )
    }
}

ReactDOM.render(
  <React.StrictMode>
      <Catcher>
          <Razbor />
      </Catcher>
  </React.StrictMode>,
  document.getElementById('root')
);
